import { Op } from "sequelize";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME_MINUTES = 5;
const BASE_DELAY_SECONDS = 1;

async function createUser(req, res) {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: password,
      permsId: req.body.permsId || 2,
    });
    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        permsId: user.permsId,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Email ou nome de usuário já existe." });
    }
    return res.status(500).json({ message: "Erro interno ao criar usuário." });
  }
}

async function login(req, res) {
  try {
    const username = req.body.username_or_email;
    const password = req.body.password;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Usuário e senha são obrigatórios" });
    }

    const user = await User.findOne({
      where: { [Op.or]: [{ email: username }, { username: username }] },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const remainingTime = Math.ceil((user.lockoutUntil - new Date()) / 60000);
      return res.status(403).json({
        message: `Conta bloqueada. Tente novamente em ${remainingTime} minuto(s).`,
      });
    }

    if (user.nextLoginAttemptAt && user.nextLoginAttemptAt > new Date()) {
      const waitTime = Math.ceil((user.nextLoginAttemptAt - new Date()) / 1000);
      return res.status(429).json({
        message: `Muitas tentativas. Por favor, aguarde ${waitTime} segundo(s) antes de tentar novamente.`,
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (passwordCheck) {
      user.failedLoginAttempts = 0;
      user.lockoutUntil = null;
      user.nextLoginAttemptAt = null;
      await user.save();

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        "chave-secreta",
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "Login realizado com sucesso", token: token });
    }

    user.failedLoginAttempts += 1;

    if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      user.lockoutUntil = new Date(
        Date.now() + LOCKOUT_TIME_MINUTES * 60 * 1000
      );
      user.nextLoginAttemptAt = null;
    } else {
      const delaySeconds =
        BASE_DELAY_SECONDS * Math.pow(2, user.failedLoginAttempts - 1);
      user.nextLoginAttemptAt = new Date(Date.now() + delaySeconds * 1000);
    }

    await user.save();

    if (user.lockoutUntil) {
      return res.status(403).json({
        message: `Conta bloqueada por ${LOCKOUT_TIME_MINUTES} minutos devido a muitas tentativas de login falhas.`,
      });
    } else {
      const attemptsLeft = MAX_FAILED_ATTEMPTS - user.failedLoginAttempts;
      const nextTrySeconds = Math.ceil(
        (user.nextLoginAttemptAt - new Date()) / 1000
      );
      return res.status(401).json({
        message: `Credenciais inválidas. Aguarde ${nextTrySeconds}s. Você tem mais ${attemptsLeft} tentativa(s) antes do bloqueio.`,
      });
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: "Erro ao realizar login" });
  }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar dados do usuário." });
  }
};

export { createUser, login, getUserProfile };

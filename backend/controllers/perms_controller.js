import Perms from "../models/perms.js";

async function createPerm(req, res) {
  const perm = await Perms.create({
    name: req.body.name,
    description: req.body.description,
  });
  res.json(perm);
}

async function getPerms(req, res) {
  const perms = await Perms.findAll();
  res.json(perms);
}

async function editPerm(req, res) {
  const perm = await Perms.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (perm) {
    perm.name = req.body.name;
    perm.description = req.body.description;
    await perm.save();
    res.json(perm);
  } else {
    res.status(404).send("Permissão não encontrada.");
  }
}

async function deletePerm(req, res) {
  const perm = await Perms.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (perm) {
    await perm.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Permissão não encontrada.");
  }
}

export { createPerm, getPerms, editPerm, deletePerm };

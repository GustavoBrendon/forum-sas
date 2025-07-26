import Perms from "../models/perms.js";

const permData = [
  {
    name: "admin",
    description: "Acesso total ao sistema",
  },
  {
    name: "user",
    description: "Acesso limitado ao sistema",
  },
];

const seedPerms = async () => {
  const cont = await Perms.count();
  try {
    if (cont === 0) {
      await Perms.bulkCreate(permData);
      console.log("Permissões criadas com sucesso!");
    } else {
      console.log("Permissões já existem, não foi necessário criar.");
    }
  } catch (error) {
    console.error("Erro ao criar permissões:", error);
  }
};

export { seedPerms };

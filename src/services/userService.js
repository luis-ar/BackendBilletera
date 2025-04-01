const prisma = require("../prismaClient");

exports.createUser = async (data) => {
  return await prisma.usuario.create({ data });
};

exports.findUserByName = async (nombre) => {
  return await prisma.usuario.findUnique({ where: { nombre } });
};

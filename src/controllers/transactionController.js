// src/controllers/transactionController.js
const prisma = require("../prismaClient");

exports.withdraw = async (req, res) => {
  const { monto } = req.body;
  const userId = req.user.id;

  const usuario = await prisma.usuario.findUnique({ where: { id: userId } });

  if (usuario.saldo < monto) return res.status(400).send("Saldo insuficiente");

  await prisma.usuario.update({
    where: { id: userId },
    data: { saldo: usuario.saldo - monto },
  });

  await prisma.transaccion.create({
    data: { usuarioId: userId, tipo: "retiro", monto },
  });

  res.send({ mensaje: "Retiro exitoso" });
};

exports.topUp = async (req, res) => {
  const { monto, receptorId } = req.body;
  const usuarioId = req.user.id;

  // Verificar que el usuario que hace la recarga tenga saldo suficiente
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { saldo: true },
  });
  if (usuario.saldo < monto) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  // Actualizar el saldo del usuario que hace la recarga (retiro)
  await prisma.usuario.update({
    where: { id: usuarioId },
    data: { saldo: { decrement: monto } },
  });

  // Actualizar el saldo del usuario receptor (recarga)
  await prisma.usuario.update({
    where: { id: receptorId },
    data: { saldo: { increment: monto } },
  });

  // Crear dos transacciones
  // 1. Transacción de retiro para el usuario que hace la recarga
  await prisma.transaccion.create({
    data: {
      usuarioId,
      receptorId: receptorId, // El receptor es el mismo usuario que hace la recarga
      userSend: usuarioId, // El usuario que hace la recarga es el receptor
      tipo: "retiro",
      monto,
    },
  });

  // 2. Transacción de recarga para el usuario receptor
  await prisma.transaccion.create({
    data: {
      usuarioId: receptorId, // El usuario que hace la recarga
      receptorId: receptorId,
      userSend: usuarioId,
      tipo: "recarga",
      monto,
    },
  });

  res.send({ mensaje: "transaccion exitosa" });
};

exports.getRecharge = async (req, res) => {
  const { monto, receptorId } = req.body;
  const usuarioId = req.user.id;
  await prisma.usuario.update({
    where: { id: receptorId },
    data: { saldo: { increment: monto } },
  });

  await prisma.transaccion.create({
    data: {
      usuarioId,
      receptorId: receptorId, // El receptor es el mismo usuario que hace la recarga
      userSend: usuarioId, // El usuario que hace la recarga es el receptor
      tipo: "deposito",
      monto,
    },
  });

  // 2. Transacción de recarga para el usuario receptor
  await prisma.transaccion.create({
    data: {
      usuarioId: receptorId, // El usuario que hace la recarga
      receptorId: receptorId,
      userSend: usuarioId,
      tipo: "recarga",
      monto,
    },
  });

  res.send({ mensaje: "transaccion exitosa" });
};

const prisma = require("../prismaClient");

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nombre: true,
        email: true,
        phoneNumber: true,
        saldo: true,
        type: true,
        transacciones: {
          select: {
            id: true,
            usuarioId: true,
            tipo: true,
            monto: true,
            fecha: true,
            receptorId: true,
            userSend: true,
          },
          orderBy: {
            fecha: "desc",
          },
        },
      },
    });

    const transaccionesConEmisor = await Promise.all(
      usuario.transacciones.map(async (transaccion) => {
        const remitente = await prisma.usuario.findUnique({
          where: { id: transaccion.userSend },
          select: {
            id: true,
            nombre: true,
            phoneNumber: true,
            email: true,
          },
        });
        const receptor = await prisma.usuario.findUnique({
          where: { id: transaccion.receptorId },
          select: {
            id: true,
            nombre: true,
            phoneNumber: true,
            email: true,
          },
        });

        return {
          ...transaccion,
          receptorId: receptor,
          userSend: remitente,
        };
      })
    );

    res.send({
      ...usuario,
      transacciones: transaccionesConEmisor,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).send({ error: "Error al obtener los datos del perfil" });
  }
};

exports.getAllUsersBasicInfo = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        phoneNumber: true,
      },
      orderBy: {
        nombre: "asc", // Opcional: ordenar alfabéticamente
      },
    });

    res.send(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send({ error: "Error al obtener la lista de usuarios" });
  }
};

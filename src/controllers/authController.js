const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");
exports.register = async (req, res) => {
  const { name, password, email, phone, type } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nombre: name,
        password: hashedPassword,
        email,
        phoneNumber: phone,
        type,
      },
    });

    res.status(201).send({ id: usuario.id });
  } catch (error) {
    if (
      error.code === "P2002" &&
      error.meta.target.includes("Usuario_email_key")
    ) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    } else {
      throw error;
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

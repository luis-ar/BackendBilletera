const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/crear-usuario", authController.register);
router.post("/iniciar-sesion", authController.login);
router.get("/perfil", authMiddleware.verifyToken, userController.getProfile);
router.get(
  "/dataUsuarios",
  authMiddleware.verifyToken,
  userController.getAllUsersBasicInfo
);

router.post(
  "/transacciones",
  authMiddleware.verifyToken,
  transactionController.topUp
);
router.post(
  "/recargar",
  authMiddleware.verifyToken,
  transactionController.getRecharge
);
router.post(
  "/retirar",
  authMiddleware.verifyToken,
  transactionController.withdraw
);

module.exports = router;

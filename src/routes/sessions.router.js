import { Router } from "express";
import uploader from "../services/upload.js";
import sessionsController from "../controller/sessions.controller.js";
import cartController from "../controller/cart.controller.js";
import passport from "passport";

const router = Router()

router.post("/register",uploader.single("image"), passport.authenticate("register",{failureRedirect:"/failedregister"}),sessionsController.register)

router.post("/login",passport.authenticate("login",{failureRedirect:"/failedlogin"}),sessionsController.login)

router.post("/products/:id", cartController.addToCart)

router.post("/deleteProducts/:id", cartController.deleteProductFromCart)
router.post("/clearCart",cartController.deleteCart)
router.post("/buyCart",cartController.buyCart)
export default router

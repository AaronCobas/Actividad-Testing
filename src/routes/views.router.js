import {Router} from "express"
import viewsController from "../controller/views.controller.js"
import { productService, userService, receiptService } from "../services/services.js"

const router = Router()

router.get("/api/users",viewsController.apiUsers)
router.get("/api/products",viewsController.apiProducts)
router.get("/api/receipts",viewsController.apiReceipts)
router.get("/login",viewsController.login)
router.get("/register",viewsController.register)
router.get("/failedregister",viewsController.failedRegister)
router.get("/failedlogin",viewsController.failedLogin)
router.get("/",viewsController.index)
router.get("/products",viewsController.products)
router.get("/products/:pid",viewsController.productDetails)
router.get("/logout",viewsController.logout)
router.get("/cart",viewsController.cart)
router.get("/*",viewsController.notExists)

export default router
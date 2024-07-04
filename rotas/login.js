import { Router } from "express"
import { loginUsuario } from "../controladores/loginController.js"

const router = new Router()

router.post('/', loginUsuario)

export default router
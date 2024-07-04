import { Router } from "express"
import { atualizaComentario, deleteComentario, getComentarios, getTodosComentarios, postComentario } from "../controladores/compentariosController.js"




const router = Router()


router.post('/:id', postComentario)
router.get('/', getTodosComentarios)
router.get('/:id', getComentarios)
router.put('/:id/:idComentario', atualizaComentario)
router.delete('/:id/:idComentario', deleteComentario)

export default router
import { Router } from "express";
import { deletaUsuario, getUsuarios, getUsuariosUnico, postUsuario, putUsuario } from "../controladores/usuarioController.js";

const router = Router()

router.post('/', postUsuario)
router.get('/', getUsuarios)
router.get('/:usuario', getUsuariosUnico)
router.put('/:usuario', putUsuario)
router.delete('/:usuario', deletaUsuario)

// router.get('/:id', getComentariosId)

// router.post('/', postComentario)

// router.patch('/:id', patchComentario)

// router.delete('/:id', deleteComentario)

export default router
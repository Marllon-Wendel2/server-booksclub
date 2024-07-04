import { Router } from "express";
import { getLivros, getLivro, postLivro, deleteLivro, putLivro } from "../controladores/livro.js";
// import authRouter from "../utils/middleware/autenticandoRouter.js";
// import { storage } from "./utils/multer.js";

const router = Router()
// const upload = multer({ storage: storage})

// router.use(authRouter)

router.post('/', postLivro)

router.get('/', getLivros)

router.get('/:id', getLivro)

router.put('/:id', putLivro)

router.delete('/:id', deleteLivro)

export default router
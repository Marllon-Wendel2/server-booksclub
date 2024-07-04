import express from "express";
import rotaLivro from "./rotas/livro.js"
import rotaFavorito from"./rotas/favorito.js"
import rotaComentarios from "./rotas/comentarios.js"
import rotaUsuario from "./rotas/usuario.js"
import rotaLogin from "./rotas/login.js"
import 'dotenv/config.js'
import './db/dbConnect.js'

import cors from "cors";

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json())
app.use('/livros', rotaLivro)
app.use('/favoritos', rotaFavorito)
app.use('/comentarios', rotaComentarios)
app.use('/usuario', rotaUsuario)
app.use('/login', rotaLogin)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
})
import { criaNovoLivro, deletaLivroPorId, encontraTodosLivros, getLivroPorId, modificaLivro } from "../db/livros.js"
import { removeComentarios } from "../utils/livrosUtils.js"


async function postLivro(req, res) {
    try {
        const livroNovo = req.body
        const titulo = req.body.titulo
        console.log(livroNovo)
        if(titulo){
            const result = await criaNovoLivro(livroNovo)
            res.status(201).json({message: "Livro criado com sucesso", result})
        } else {
            res.status(422)
            res.send("O campo nome é titulo")
        }
        
    } catch(error) {
        res.status(500)
        res.send(error.message)
    }
}

async function getLivros(req, res) {
    try {
        const livros = await encontraTodosLivros()
        const livrosFiltrados = await removeComentarios(livros)
        res.json(livros)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    } 
}

async function getLivro(req, res) {
    const id  = req.params.id

    try {
        const livro = await getLivroPorId(id)
        res.send(livro)
        } catch (error) {
        res.status(500).send(error.message)
    } 
}

async function putLivro(req, res) {
    try {

        const id = req.params.id

        if(id) {
            const body = req.body
           const livroModificado = await modificaLivro(body, id)
            res.status(200).json({message: 'Atualizado com sucesso', 
                livroAtualizado :livroModificado})
        } else {
            res.status(422)
            res.send("Id inválido")
        }
       
    } catch(error) {
        res.status(500)
        res.send(error.message) 
    }
}

function deleteLivro(req, res) {
    try {
        const id = req.params.id

        if(id) {
            deletaLivroPorId(id)
            res.send("livro deletado com sucesso")
        } else {
            res.status(422)
            res.send("ID inválido")
        }
    } catch (error) {
        res.status(500)
        res.send(error.message)
    } 
}

export {
    getLivros,
    getLivro,
    postLivro,
    putLivro,
    deleteLivro
}
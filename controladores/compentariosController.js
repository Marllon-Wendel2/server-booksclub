import { atualizarConteudo, criaNovoComentario, deletandoComentario, getTodosComentariosLivro, pegaTodosOsComentarios } from "../db/comentarios.js"


async function postComentario(req, res) {
    const id = req.params.id
    const autor = req.body.autor
    const conteudo = req.body.conteudo

    try {
        const novoComentario = await criaNovoComentario(id, autor, conteudo)
        res.status(201).json({message: 'Comentario postado com sucesso', comentario: novoComentario})
    } catch (erro) {
        res.status(500).json({message: "Não foi possivel comentar", erro: erro.message})
    }
}

async function getTodosComentarios(req, res) {
    try {
        const result = await pegaTodosOsComentarios()
        res.status(200).json(result)
    } catch (erro) {
        res.status(500).json({ messagem: "Erro ao tentar localicar todos os comentários", erro})
    }
}

async function getComentarios(req, res) {
    const id = req.params.id
    try {
        const comentarios = await getTodosComentariosLivro(id)
        res.send(comentarios)
    } catch (error) {
        res.status(500).send(error.message)
    } 
}

async function atualizaComentario(req, res) {
    const id = req.params.id
    const idComentario = req.params.idComentario
    const conteudo = req.body.conteudo
    
    try {
        const comentarioAtualizado = await atualizarConteudo(id, idComentario, conteudo)
        res.status(200).json({message: comentarioAtualizado})
    } catch (erro) {
        res.status(401).json(erro)
    }
}

async function deleteComentario(req, res) {
    const idLivro = req.params.id
    const idComentario = req.params.idComentario
    try {
        await deletandoComentario(idLivro, idComentario)
        res.status(200).json({message: "Comentario deletado com sucesso"})
    } catch (erro) {
        res.status(500).json({message: "Não foi possivel excluir o comentario"})
    }
}

export  {
    getComentarios,
    postComentario,
    atualizaComentario,
    deleteComentario,
    getTodosComentarios
}
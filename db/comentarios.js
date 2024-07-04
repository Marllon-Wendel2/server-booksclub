import { ObjectId } from "mongodb";
import { livrosColecao } from "./dbConnect.js";
import { nanoid } from "nanoid";

async function criaNovoComentario (id, autor, conteudo) {
    try {
        const result = await livrosColecao.updateOne(
            {_id: new ObjectId(id),},
            {
                $push: {
                    comentarios: {
                        id: nanoid(),
                        autor,
                        conteudo
                    }
                }
            }
        )
    } catch (erro) {

    }
}

async function pegaTodosOsComentarios() {
    try {
        const result = livrosColecao.find({}).toArray()
        console.log(result)
        if(!result) {
            throw new Error("Não localizamos nenhum livro")
        }
        return result
    } catch (erro) {
        return erro
    }
}

async function getTodosComentariosLivro(id) {
    try {
        const livros = await livrosColecao.find(
            {_id: new ObjectId(id)}
        ).toArray()
        const result = await livros.flatMap( livro => livro.comentarios || [])

        if(result){
            return result
        } else {
            throw new Error("Erro na requisição")
        }
    } catch (erro) {
        return erro
    }
}

async function atualizarConteudo(id, idComentario, conteudo) {
    try {
        const result = await livrosColecao.updateOne(
            {_id: new ObjectId(id), "comentarios.id" :  idComentario},
            {
                $set: {
                    "comentarios.$.conteudo" : conteudo
                }
            }
        )

        return result
    } catch {
        throw new Error('Não foi possivel atualizar o comentarios')
    }
}

async function deletandoComentario(id, idComentario) {
    try {
        const livro = await livrosColecao.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { comentarios: { id: idComentario } } }
        );

        if (livro.modifiedCount === 1) {
            console.log('Comentário deletado com sucesso.');
        } else {
            console.log('Comentário não encontrado ou já deletado.');
        }

        return livro;
    } catch (error) {
        console.error("Erro ao deletar o comentário:", error);
        throw error;
    }
}

export {
    criaNovoComentario,
    getTodosComentariosLivro,
    pegaTodosOsComentarios,
    atualizarConteudo,
    deletandoComentario
}
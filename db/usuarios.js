import { autorizaUsuario } from "../servicos/usuario.js";
import { createHashAndSal } from "../utils/hashAndSal.js";
import { usuariosColecao } from "./dbConnect.js";


//criando novo usuario
async function cadastrarUsuario({ usuario, email, senha }) {
    try {
        const { hashPassword, salPassword } = await createHashAndSal(senha)
        const result = await usuariosColecao.insertOne({usuario, email, hashPassword, salPassword })
        return result
    } catch (erro) {
        throw new Error('Não foi possivel cadastrar')
    }
}


//encontra todos os usuarios cadastrados
async function encontraTodosUsuarios(){
    const todosUsuarios = await usuariosColecao.find({}).toArray()
    const usuarioFiltrados = await removeHashAndSal(todosUsuarios) 
    return usuarioFiltrados
}


//remove o hash e sal da senha antes de devolver para o fronte end
async function removeHashAndSal(arrays) {
    return arrays.map( array => {
        const {hashPassword, salPassword, ...usuariosSemHashAndSAl} = array
        return usuariosSemHashAndSAl
    })
}

//encontrar UM usuario pelo usuario
async function encontraUsuario(usuario) {
   return await usuariosColecao.findOne({usuario})
}

//salva atualizacao
async function salvaUsuario(usuario) {
    await usuariosColecao.updateOne({_id: usuario._id}, {$set: usuario})
}

//deleta o usuario
async function deletarUsuario(usuario) {
    const result = await usuariosColecao.deleteOne({usuario})
    // if( result.deledCount === 0) {
    //     throw new Error('Erro ao deletar usuário: nenhum ')
    // }
    return {message: 'Usuário deletado com sucesso'}
}

// atualiza senha
async function atualizaSenha (novaSenha, senhaAtual, usuario) {
    const usuarioEncontrado = await encontraUsuario(usuario)
    const autorizado = await autorizaUsuario(usuarioEncontrado.usuario, senhaAtual)

    if(autorizado) {
       const { hashPassword, salPassword } = await createHashAndSal(novaSenha)
        usuarioEncontrado.hashPassword = hashPassword
        usuarioEncontrado.salPassword = salPassword

        salvaUsuario(usuarioEncontrado)
    } else {
        throw new Error('Não foi possivel atualizar a senha')
    }
}

async function atualizaEmail (novoEmail, senhaAtual, usuario) {
    const usuarioEncontrado = await encontraUsuario(usuario)
    const autorizado = await autorizaUsuario(usuarioEncontrado.usuario, senhaAtual)

    if(autorizado) {
       usuarioEncontrado.email = novoEmail
       salvaUsuario(usuarioEncontrado)
    } else {
        throw new Error('Não foi possivel atualizar o email')
    }
}

export { 
    cadastrarUsuario,
    encontraUsuario,
    encontraTodosUsuarios,
    atualizaSenha,
    atualizaEmail,
    deletarUsuario
    }
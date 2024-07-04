import { atualizaEmail, atualizaSenha, cadastrarUsuario, deletarUsuario, encontraTodosUsuarios, encontraUsuario} from "../db/usuarios.js"
import { autorizaUsuario } from "../servicos/usuario.js"

async function postUsuario(req, res) {
    try {
        const usuarioNovo = req.body
        const resultado = await encontraUsuario(usuarioNovo.usuario)
        console.log(resultado)

        if(resultado) {
           return res.status(500).json({message: 'Usuario já cadastrado'})
        }
        if(req.body.usuario && req.body.senha) {
           const usuarioCadastrado =  await cadastrarUsuario(usuarioNovo)
            res.status(201).json(usuarioCadastrado)
        } else {
            res.status(422).res.send("O campo usuario e senha são obrigatórios")
        }
        
    } catch(error) {
        res.status(500)
        res.send(error.message)
    }
}

async function getUsuarios(req, res) {
    try{
        const todosUsuario = await encontraTodosUsuarios()
        res.status(200).send(todosUsuario)
    } catch (erro) {
        res.status(500).json({message: erro.menssage, erro})
    }
}

async function getUsuariosUnico(req, res) {
    const usuario = req.params.usuario
    try {
        const usuarioEncontrado = await encontraUsuario(usuario)
        console.log(usuarioEncontrado)       
        if(!usuarioEncontrado) {
            return res.status(404).json({message: 'Usuario não encontrado.'})
        }
        res.status(200).json(usuarioEncontrado)
    }catch (erro) {
        res.status(500).json({ message: erro})
    }
}

async function putUsuario(req, res) {
    const usuario = req.params.usuario
    const senhaNova = req.body.senhaNova
    const senhaAtual = req.body.senhaAtual
    const email = req.body.email

    if(senhaNova) {
      await atualizaSenha(senhaNova, senhaAtual, usuario);
      res.status(201).send('Senha atualizada com sucesso.')
    } if(email) {
        await atualizaEmail(email, senhaAtual, usuario)
        res.status(201).send('E-mail atualizado com suceso.')
    } else {
        res.status(401).send('Não foi possivel atualizar')
    }
}

async function deletaUsuario(req, res) {
    const usuarioDeletado = req.params.usuario
    const result = await deletarUsuario(usuarioDeletado)
    
    if(!result) {
        res.status(401).send('Não possivel deletar usuario')
    } else {
        res.status(200).send('Deletado com sucesso')
    }

}

export {
    postUsuario,
    getUsuarios,
    getUsuariosUnico,
    putUsuario,
    deletaUsuario
}
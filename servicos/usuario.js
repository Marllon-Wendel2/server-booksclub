import { encontraUsuario } from "../db/usuarios.js";
import { scryptSync, timingSafeEqual} from "crypto"
import gerarJwt from '../utils/jwt.js'

//autoriza usuario
async function autorizaUsuario (usuario, senha) {
    try {
        const usuarioEncontrado = await encontraUsuario(usuario)

        if(!usuarioEncontrado) { 
        throw new Error('Usuario não encontrado');
        }
        const autenticado = authUsuario(senha, usuarioEncontrado)

        if(autenticado) {
            const tokenJWT = gerarJwt({ usuario : usuario })
            return { token: tokenJWT.token, usuario, message: 'Usuario autenticado com sucesso'}
        
        } else {
            throw new Error('usuario não autorizado')
        }
    } catch (erro) {
        throw erro
    }
}
//autenticando usuario
function authUsuario(senha, usuarioEncontrado) {
    const hashTeste = scryptSync(senha, usuarioEncontrado.salPassword, 64);
    const hashReal = Buffer.from(usuarioEncontrado.hashPassword, "hex")

    const autenticando = timingSafeEqual(hashTeste, hashReal)
    return autenticando
}

export { 
    autorizaUsuario,
}
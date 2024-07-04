import { autorizaUsuario } from "../servicos/usuario.js";

async function loginUsuario(req, res) {
    const usuarioDigitado = req.body.usuario;
    const senhaDigitada = req.body.senha;
    
    try {
        const resultado = await autorizaUsuario(usuarioDigitado, senhaDigitada);
        console.log(resultado)
        if(resultado) {
            res.status(200).send(resultado)
        } else {
            res.status(401).send("Usuario não autorizado")
        }
    } catch(erro) {
        res.status(500).json({message : erro.message})
    }

}

export {
    loginUsuario
}
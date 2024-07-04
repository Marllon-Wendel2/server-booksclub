import jwt   from 'jsonwebtoken';
import 'dotenv/config.js'

function gerarJwt(payload) {
    const token = jwt.sign(payload, process.env.SEGREDO, {
        expiresIn: 86400
    })

    return { token }
}

export default gerarJwt
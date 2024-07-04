import { randomBytes, scrypt, scryptSync } from "crypto";

async function createHashAndSal(password) {
    const salPassword = await randomBytes(16).toString("hex");
    const hashPassword = await scryptSync(password, salPassword, 64).toString("hex")

    return { hashPassword, salPassword }
}
// try {
//     console.log(createHashAndSal())

// }catch (erro) {
//     console.log(erro)
// }

export {createHashAndSal}
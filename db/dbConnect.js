import { MongoClient } from "mongodb"
import "dotenv/config.js"
const uri = process.env.DB_CONNECT_STRING;
const cliente = new MongoClient(uri)
let usuariosColecao;
let livrosColecao;

try {
    await cliente.connect()
    const db = cliente.db('club-livros');
    usuariosColecao = db.collection('usuarios');
    livrosColecao =  db.collection('livros');
        
    
    console.log('Banco de tados conectado com sucesso')
    } catch (error) {
        console.log(error);
    }





export { usuariosColecao, livrosColecao }
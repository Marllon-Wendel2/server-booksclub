import { ObjectId } from "mongodb"
import { livrosColecao } from "./dbConnect.js"

//Novo livro
async function criaNovoLivro({titulo, src, autor, conteudo}) {
    const result = await livrosColecao.insertOne({
        titulo,
        src,
        comentarios: [{            
            autor,
            conteudo }
        ]
    })
    return result
}

//Encontra todos os livros
async function encontraTodosLivros(){
    const todosLivros = await livrosColecao.find({}).toArray()
    return todosLivros
}

async function getLivroPorId (id) {
    const livroEncontrado = await livrosColecao.findOne({ _id: new ObjectId(id) });
    console.log(livroEncontrado)

   if(livroEncontrado) {
    return livroEncontrado
   } else {
    throw new Error('Livro não encontrado')
   }
}

async function modificaLivro({...dto}, id) {
    await livrosColecao.updateOne(
        {_id: new ObjectId(id)},
        {$set: dto}
    )
const result = await livrosColecao.findOne({_id: new ObjectId(id)})
  return result
}

async function  deletaLivroPorId(id) {
    livrosColecao.deleteOne({_id: new ObjectId(id)})
    return true
}

export { 
    encontraTodosLivros,
    criaNovoLivro,
    getLivroPorId,
    modificaLivro,
    deletaLivroPorId
}
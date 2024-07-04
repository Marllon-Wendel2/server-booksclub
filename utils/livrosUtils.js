async function removeComentarios(livros) {
    return await livros.map ( livro => {
        const {comentarios, ...livrosFiltrados} = livro
        return livrosFiltrados
    })
}

export {
    removeComentarios
}
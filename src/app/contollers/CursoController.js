// index(): listar tudo
// show(): listar por id
// store(): criar dados
// update(): atualizar dados
// delete(): remover dados

class CursoController{
    index(req, res){
        const sql = "SELECT * FROM cursos.curso;"
            conexao.query(sql, (error, result) => {
                if (error){
                    console.log(error)
                    res.status(404).json({'error': error})
                } else {
                    res.status(200).json(result)
                }
            })
    }
    show(){}
    store(){}
    update(){}
    delete(){}
}

export default new CursoController()
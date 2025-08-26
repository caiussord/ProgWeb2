import express from 'express'

import conexao from '../infra/conexao.js'

const app = express()

// Indicar para o express ler o body como json

app.use(express.json())

//const cursos = [
//    {id: 1, disciplina: 'ADS'},
//    {id: 2, disciplina: 'ADS'},
//    {id: 3, disciplina: 'ADS'},
//    {id: 4, disciplina: 'ADS'},
//]

function buscarCursosPorId(id){
    return cursos.filter(curso => curso.id == id)
}

function buscarIndexCurso(id){
    return cursos.findIndex(curso => curso.id == id)
}

// Criando uma rota default (endpoint) / req = request / res = response
//app.get('/', (req, res)=> {
//    res.send('Hello Thiago')
//})

// Rotas

app.get('/cursos', (req, res)=> {
//    res.status(200).send(cursos)
    const sql = "SELECT * FROM cursos.curso;"
    conexao.query(sql, (error, result) => {
        if (error){
            console.log(error)
        } else {
            res.status(200).json(result)
        }
    })
})

app.get('/cursos/:id', (req, res)=> {
//    let index = req.params.id
//    console.log(index)
    res.json(buscarCursosPorId(req.params.id))
})

//app.post('/cursos', (req, res)=> {
//    cursos.push(req.body)
//    res.status(200).send('Seleção cadastrada com sucesso!')
//})

app.post('/cursos', (req, res)=> {
    const sql = "INSERT INTO cursos.curso (id, disciplina) VALUES (1, 'Prog. Web 2');"
        conexao.query(sql, (error, result) => {
            if (error){
                console.log(error)
            } else {
                res.status(200).json(result)
            }
        })
})

//app.delete('/cursos/:id', (req, res)=> {
//    let index = buscarIndexCurso(req.params.id)
//    console.log(index)
//    cursos.splice(index, 1)
//    res.send(`O curso com id ${req.params.id} excluído com sucesso!`)
//})

app.delete('/cursos', (req, res)=> {
    const sql = "DELETE FROM cursos.curso;"
            conexao.query(sql, (error, result) => {
                if (error){
                    console.log(error)
                } else {
                    res.status(200).json(result)
                }
            })
})

//app.put('/cursos/:id', (req, res)=> {
//    let index = buscarIndexCurso(req.params.id)
//    cursos[index].disciplina = req.body.disciplina
//    res.json(cursos)
//})

app.put('/cursos/:id', (req, res)=> {
    let index = buscarIndexCurso(req.params.id)
    cursos[index].disciplina = req.body.disciplina
    res.json(cursos)
})

export default app

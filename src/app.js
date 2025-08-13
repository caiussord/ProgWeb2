import express from 'express'
const app = express()
app.use(express.json())
const cursos = [
    {id: 1, curso: 'ADS'},
    {id: 2, curso: 'ADS'},
    {id: 3, curso: 'ADS'},
    {id: 4, curso: 'ADS'}
]


function buscarCursoById(id) {
    return cursos.filter(curso => curso.id ==id)
}

function buscarIndexCurso(id) {
        return cursos.findIndex(curso => curso.id == id)
    }
// Criando uma rota default (endpoint)
app.get('/', (req, res) => {
    res.send('Hello Caius')
})

app.get('/cursos', (req, res) => {
    res.json(cursos)
})

app.post('/cursos', (req, res) => {
    cursos.push(req.body)
    res.status(200).send(cursos)
})

app.get('/cursos/:id', (req, res) => {
// let index = req.params.id
// console.log(index)
res.json(buscarCursoById(req.params.id))
})

app.delete('/cursos/:id', (req, res) => {
   let index = buscarIndexCurso(req.params.id)
       cursos.splice(index, 1)
       res.send(`O curso com id ${req.params.id} foi removido com sucesso!`)
})

app.put('/cursos/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id)
    cursos[index].disciplina = req.body.curso
    res.json(cursos)
})

export default app

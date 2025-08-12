import express from 'express'
const app = express()

const cursos = [
    {id: 1, curso: 'ADS'},
    {id: 2, curso: 'ADS'},
    {id: 3, curso: 'ADS'},
    {id: 4, curso: 'ADS'}
]

// Criando uma rota default (endpoint)
app.get('/', (req, res) => {
    res.send('Hello Caius')
})

app.get('/cursos', (req, res) => {
    res.send(cursos)
})

export default app

import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()

// Indicar para o express ler o body como json
app.use(express.json())

app.post('/cursos', (req, res) => {
    const { disciplina } = req.body
    
    if (!disciplina) {
        return res.status(400).json({ error: 'Campo disciplina é obrigatório' })
    }
    
    const sql = "INSERT INTO cursos.curso (disciplina) VALUES (?)"
    conexao.query(sql, [disciplina], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        } else {
            res.status(201).json({ 
                message: 'Curso criado', 
                id: result.insertId,
                disciplina: disciplina
            })
        }
    })
})

app.get('/cursos', (req, res) => {
    const sql = "SELECT * FROM cursos.curso"
    conexao.query(sql, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        } else {
            res.status(200).json(result)
        }
    })
})

app.get('/cursos/:id', (req, res) => {
    const { id } = req.params
    const sql = "SELECT * FROM cursos.curso WHERE id = ?"
    
    conexao.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Curso não encontrado' })
        } else {
            res.status(200).json(result[0])
        }
    })
})


app.put('/cursos/:id', (req, res) => {
    const { id } = req.params
    const { disciplina } = req.body
    
    if (!disciplina) {
        return res.status(400).json({ error: 'Campo disciplina é obrigatório' })
    }
    
    const sql = "UPDATE cursos.curso SET disciplina = ? WHERE id = ?"
    conexao.query(sql, [disciplina, id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Curso não encontrado' })
        } else {
            res.status(200).json({ 
                message: 'Curso atualizado',
                id: id,
                disciplina: disciplina
            })
        }
    })
})

app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM cursos.curso WHERE id = ?"
    
    conexao.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Curso não encontrado' })
        } else {
            res.status(200).json({ message: `Curso com id ${id} excluído` })
        }
    })
})


app.delete('/cursos', (req, res) => {
    const sql = "DELETE FROM cursos.curso"
    conexao.query(sql, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        } else {
            res.status(200).json({ 
                message: 'Todos os cursos foram excluídos',
                deletedCount: result.affectedRows
            })
        }
    })
})

export default app

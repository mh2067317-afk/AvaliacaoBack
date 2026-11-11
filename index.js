import express from 'express';

import db from './repository/index.js';

const app = express()  

app.use(express.json()) 


app.post("/api/v1/tarefa", (req, res) => {

    const { Id, descricao, data, concluido } = req.body

    if (!Id|| !descricao || !data || !concluido) {
        res.send({ message: "Falta informação" })
        
        return
    }

    const tarefa = { Id, descricao, data, concluido}
    db.push({ tarefa })
    res.send({ message: "Tarefa criada com sucesso!" })

})  
 
app.get("/api/v1/tarefa", (req, res) => {

    res.send({message: " Tarefa encontrada com sucesso", db})

})
 
app.get("/api/v1/tarefa/:id", (req, res) => {

    const id = Number(req.params.id)
 
    const tarefa = db.find(p => p.id === id)
 
    if(!tarefa) {

        res.status(404).send({message: "Tarefa não encontrada!"})

        return
    }
    res.send({message: "Tarefa encontrada com sucesso", pessoa})

})


app.put("/api/v1/tarefa/:id", (req, res) => { 

    const id = Number(req.params.id)

    const {Id, data,descricao, concluido} = req.body

    const tarefa = db.find(it => it.id === id)
 
    if(!tarefa) {

        res.status(404).send({message: "Tarefa não encontrada!"})

        return

    }

    tarefa.concluido = !tarefa.concluido

    res.status(200).send({message: "Status alterado com sucesso", tarefa})

})


app.delete("/api/v1/tarefa/:id", (req, res) => {

    const id = Number(req.params.id)
 
    const index = db.findIndex(it => it.id === id)
 
    if(index === -1) {

        res.status(404).send({message: "Tarefa não encontrada"})

        return

    }
 
    db.splice(index, 1)
 
    res.send({message: "Tarefa deletada com sucesso!"})
 
})

app.listen(3000, () => {

    console.log(`Servidor rodando em http://localhost:3000`);

});
 

import express from "express";
import cors from 'cors'
import postUser from "./Controllers/postUser.controller.js";

const server = express()
server.use(express.json())
server.use(cors())

const users = []
const tweets = []

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body
    if (users.find((e) => e.username === username)) {
        res.status(409).send({ message: "Usuário não disponível" })
    }
    const user = {
        username: username,
        avatar: avatar
    }
    users.push(user)
    res.send(users)
})

server.get('/sign-up', (req, res) => {
    res.send(users)
})



const PORT = 5000

server.listen(PORT, console.log(`O server está funcionando na porta ${PORT}`))
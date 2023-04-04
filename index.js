import express from "express";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

const users = [];
const tweets = [];

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    if (users.find((e) => e.username === username)) {
        return res.status(409).send({ message: "Nome de usuário já cadastrado, escolh outro." })
    }
    const user = {
        username, avatar
    }
    users.push(user)
    res.send(users)
})
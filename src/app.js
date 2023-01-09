import express from "express";
import cors from 'cors'

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

server.post('/tweets', (req, res) => {
    let result = "OK"

    const { username, tweet } = req.body
    const user = users.find((e) => e.username === username)

    if (!user) {
        result = "UNAUTHORIZED"
        res.status(400).send({ message: result })

    } else {
        const twits = []

        const tuite = {
            username: username,
            avatar: user.avatar,
            tweet: tweet
        }

        tweets.push(tuite)
        res.status(200).send({ message: result })

        for (let i = tweets.length - 10; i < tweets.length; i++) {

            twits.push(tweets[i])
        }
        //  Últimos 10 tweets

        if (tweets.length >= 10) {
            res.send(twits)
        } else {
            res.send(tweets)
        }
    }
})

server.get('/tweets', (req, res) => {
    const twits = []


    for (let i = tweets.length - 10; i < tweets.length; i++) {
        twits.push(tweets[i])
    }

    //  Últimos 10 tweets

    if (tweets.length >= 10) {
        res.send(twits)
    } else {
        res.send(tweets)
    }
})



const PORT = 5000

server.listen(PORT, console.log(`O server está rodando na porta ${PORT}`))
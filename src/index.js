import express from "express";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
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

app.get('/sign-up', (req, res) => {
    res.send(users)
})

app.post('/tweets', (req, res) => {
    let result = "OK"
    const { username, tweet } = req.body;
    const user = users.find((e) => e.username === username)

    if (!user) {
        let result = "UNAUTHORIZED"
        return res.status(400).send({ message: result })
    } else {
        const twits = []

        const tuite = {
            username: username,
            avatar: user.avatar,
            tweet
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

app.get('/tweets', (req, res) => {
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

app.listen(PORT, console.log(`O server está rodando na porta ${PORT}`))
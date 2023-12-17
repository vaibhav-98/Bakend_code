const express = require ("express")
const cors = require ("cors")
const cookieParse = require ('cookie-parser')
const { config } = require ('dotenv')
config()

const app = express()

app.use(express.json())

app.use(cors ({
    origin: [process.env.FRONTRND_URL],
    credentials: true,
}));

app.use(cookieParse());

app.use('/ping', function(req,res){
     res.send('/pong')
})

// routes of 3 modules

app.use('*', (req,res) => {
    res.status(404).send('OPPS!! 404 page not found ')
})

module.exports = app
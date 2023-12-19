import  express from "express"
import  cors from "cors"
import  cookieParse from 'cookie-parser'
import { config }from  'dotenv'
import morgan from "morgan"
config()

const app = express()

app.use(express.json())

app.use(cors ({
    origin: [process.env.FRONTRND_URL],
    credentials: true,
}));

app.use(cookieParse());

app.use(morgan(('dev')))

app.use('/ping', function(req,res){
     res.send('/pong')
})

// routes of 3 module

app.use('*', (req,res) => {
    res.status(404).send('OPPS!! 404 page not found ')
})

export default  app
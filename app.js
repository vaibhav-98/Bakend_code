import  express from "express"
import  cors from "cors"
import  cookieParse from 'cookie-parser'
import { config }from  'dotenv'
import morgan from "morgan"
import userRoutes from './routes/user.Routes.js'
import errorMiddleware from "./middlewares/error.middleware.js"
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
app.use('/api/v1/user', userRoutes)

app.use('*', (req,res) => {
    res.status(404).send('OPPS!! 404 page not found ')
})

app.use(errorMiddleware);

export default  app;
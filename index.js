import express from 'express'
import dotenv from 'dotenv'
import routes from './src/controller/index.js'
import cors from 'cors'


dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))
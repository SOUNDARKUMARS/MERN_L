import express from 'express' 
import mongoose from 'mongoose'
import {PORT,MongoUrl} from './config.js'
import bookRouter from './routes/bookRoutes.js'
import cors from 'cors'

const app=express()
app.use(express.json()) //middleware for parsing the request body
app.use(cors())  //  OPTION:1 middleWare for handling the CORS policy
// app.use(cors({      //  OPTION:1   recomended
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))
app.get('/',(req,res)=>{
    console.log(req)
   return res.status(200).send('hi there')
})
app.use('/books',bookRouter)
mongoose.connect(MongoUrl)
        .then(()=>{
            console.log('app connected to database')
            app.listen(PORT,()=>{
                console.log(`listening to ${PORT}`)
            })
        })
        .catch((err)=>{
            console.log('error in connection to MongoDb',err)
        })
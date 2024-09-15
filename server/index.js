const express=require('express')
const cors=require('cors')
const testRoutes =require('./routes/testRoutes')
const authRoutes =require('./routes/authRoutes')

const app=express()

const PORT=process.env.PORT||8000

app.use(express.json())
app.use(cors({
    origin:[],
    credentials:true
}))

app.use('/test',testRoutes)
app.use('/auth',authRoutes)

require('./config/dbConfig')

app.listen(PORT,()=>{console.log(`App listening on port ${PORT}`)})
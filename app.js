const express=require('express')
const graphqlHTTP=require('express-graphql')
const schema=require('./libs/schema/schema')
const mongoose=require('mongoose')
const cors=require('cors')
const auth=require('./libs/controllers/auth')
const isAuth=require('./libs/middlewares/isAuth')

const app=express()

const PORT=process.env.PORT||4000

mongoose.connect("mongodb://sanjay:nayak123@ds047742.mlab.com:47742/alagchat")
mongoose.connection.once('open',()=>{
    console.log('Connected to database')
})

app.use(cors())

app.post('/login', auth.login_handler)

app.post('/signup', auth.signup_handler)

//use isAuth middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`)
})
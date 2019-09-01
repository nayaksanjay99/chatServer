const express=require('express')
const graphqlHTTP=require('express-graphql')
const schema=require('./schema/schema')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

mongoose.connect("mongodb://sanjay:nayak123@ds253857.mlab.com:53857/alagchat")
mongoose.connection.once('open',()=>{
    console.log('Connected to database')
})

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("Listening at 4000")
})
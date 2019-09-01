const graphql=require('graphql') 
const User=require('../models/user')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} =graphql

const UsersListType=new GraphQLObjectType({
    name:"Users",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString}
    })
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        UsersList:{
            type:UsersListType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return {} //User.find({})
            }  
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
})
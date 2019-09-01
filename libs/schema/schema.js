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

const UserType=new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        phoneNo:{type:GraphQLInt}
    })
})

const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{type:GraphQLString}
            },
            resolve(parent,args){
                // const user=new User({
                //     name:args.name
                // })
                // return user.save()
            }
        }
    }
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        AllUsers:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return User.find({})
            }  
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
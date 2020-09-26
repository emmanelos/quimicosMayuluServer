const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } =require('./config/database')
const checkAuth = require('./util/checkAuth')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: checkAuth
})

mongoose.connect(MONGODB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() =>{
            console.log('MongoDb connected')
        return server.listen({ port: process.env.PORT || 5000 })
    })
    .then(res => {
        console.log(`Server is running at ${res.url}`)
    })
    .catch(err => {
        console.log(err)
    })

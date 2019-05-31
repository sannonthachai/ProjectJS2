dbPassword = 'mongodb+srv://sannonthachai:chai41742@cluster0-o0djs.mongodb.net/test?retryWrites=true'
setMongoose = { useCreateIndex: true , useNewUrlParser: true , useFindAndModify: false }

module.exports = {
    mongoURI: dbPassword,
    set: setMongoose
}
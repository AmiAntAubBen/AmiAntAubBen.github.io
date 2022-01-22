const mongoose = require('mongoose')
const url = "mongodb+srv://amina:amina@cluster0.rwu81.mongodb.net/wasabi?retryWrites=true&w=majority";

//Connection à la BDD WASABI
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

module.exports = mongoose;


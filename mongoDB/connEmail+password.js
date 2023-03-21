const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Harsh_Dobariya:Harry%401511@cluster0.0frss15.mongodb.net/Login?retryWrites=true&w=majority")
    .then(() => console.log("done..."))
    .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    email: {
        type: String,
    },
    rNum : {
        type: String,
    },
    password: {
        type: String,
    }
})

const Email = mongoose.model('Email', userSchema);

module.exports = Email
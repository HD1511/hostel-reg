const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Harsh_Dobariya:Harry%401511@cluster0.0frss15.mongodb.net/Login?retryWrites=true&w=majority")
    .then(() => console.log("done..."))
    .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    pNum: {
        type: Number,
    },
    clgName: {
        type: String,
    },
    Cast: {
        type: Number,
    },
    BloodGroup: {
        type: String,
    },
    State: {
        type: String,
    },
    City: {
        type: String,
    },
    gridRadio: {
        type: String,
    },
    Date: {
        type: Date,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User
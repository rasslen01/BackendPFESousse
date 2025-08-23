const mongoose = require('mongoose');

const bcrypt = require('bcrypt')


const usersSchema = new mongoose.Schema ({
    firstName:String,
    lastName:String,
    Email:{type:String,required:true,unique:true,lowercase:true,match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please fill a valid email address']},
    password:{type:String,required:true,minlength:6},
    //password:{type:String,required:true,minlength:6,match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long']},
    roleType:{type:String,enum:['admin','player','gestionnaire de terrain','organisateur']},
    ProfilePicture:{type:String,default:'client.png'}

},{timestamps:true});
usersSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt();
        const User = this
        user.password = await bcrypt.hash(User.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
const User = mongoose.model('User',usersSchema);
module.exports = User;
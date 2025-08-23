const { Mongoose } = require('mongoose');
const userModel = require('../Models/UserModel')


module.exports.getAllUsers = async (req, res) => {
    try {
        //logique
        const userList = await userModel.find();
        res.status(200).json({userList});    
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }

    }
    module.exports.getUsersById = async (req, res) => {
    try {
        //logique
        const id = req.params.id;
        const user = await userModel.findById(id);
        res.status(200).json({ user });    
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }

    }
    module.exports.addPlayer = async (req, res) => {
    try {
        //logique
        const { firstName, lastName, Email, password, ProfilePicture } = req.body;
        console.log(req.body);
        console.log(firstName, lastName, Email, password, ProfilePicture);
        const roleType = 'player';
        const user = new userModel({
            firstName, lastName, Email, password, ProfilePicture, roleType
        });
        const addedUser = await user.save(addedUser);


        res.status(200).json({ message: 'player added successfully', user: { firstName, lastName, Email, password, roleType, ProfilePicture } });    
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }

    }
    
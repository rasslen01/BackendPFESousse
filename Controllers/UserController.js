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
    const { firstName, lastName, Email, password, roleType } = req.body;
    let profilePictureUrl = '';

    if (req.file) {
      profilePictureUrl = '/uploads/' + req.file.filename;
    }

    const user = new userModel({
      firstName,
      lastName,
      Email,           // correspond au frontend
      password,
      roleType,
      profilePicture: profilePictureUrl
    });

    const addedUser = await user.save();

    res.status(201).json({
      message: 'Player added successfully',
      user: {
        id: addedUser._id,
        firstName: addedUser.firstName,
        lastName: addedUser.lastName,
        email: addedUser.Email,
        roleType: addedUser.roleType,
        profilePicture: addedUser.profilePicture
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};


module.exports.getUserByImage = async (req, res) => {
    try {
        const { image } = req.params;
        const user = await userModel.findOne({ ProfilePicture: image });

        if (!user) {
            return res.status(404).json({ message: "User not found with this image" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}
module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } // new:true => retourne le user après update
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};




    
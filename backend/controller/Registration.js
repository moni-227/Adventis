const UserModel = require('../models/Registration');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const userprojectsModel = require('../models/userprojects');
const storageService = require('../models/storageService'); 
const fs = require('fs').promises;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage: storage });
module.exports = {

RegisterDetails : async (req, res) => {
  try {
    // Handle file upload
    upload.single('profilePicture')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const { EmployeeId, Name, Salary, Emailaddress, Password } = req.body;
      const profilePicture = req.file; // Access the file information
            console.log(req.file)
            console.log(req.body)
      // Check if a user with the same EmployeeId already exists
      const existingUser = await UserModel.findOne({ EmployeeId });

      if (existingUser) {
        // Handle duplicate EmployeeId
        return res.status(400).json({ error: 'EmployeeId is already in use' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      const result = new UserModel({
        EmployeeId: EmployeeId,
        Name: Name,
        Salary: Salary,
        Emailaddress: Emailaddress,
        Password: hashedPassword,
        // Add the file path to the profilePicture field
        profilePicture: profilePicture ? profilePicture.path : null,
      });

      await result.save();
      
  //     res.status(201).json(result);
  // res.json({ message: 'Successfully Registered' });
  res.status(201).json({ result, message: 'Successfully Registered' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: err.message });
  }
},

    LoginDetails: async (req, res) => {
        try {
          const { Emailaddress, Password } = req.body;
          const user = await UserModel.findOne({ Emailaddress });
      
          if (!user) {
            return res.json({ message: 'Invalid credentials' });
          }
      
          const comparePassword = await bcrypt.compare(Password, user.Password);
      
          if (comparePassword) {
            // return res.status(200).json({ message: 'Successfully logged in', user });
            // return res.status(200).json({ message: 'Successfully logged in', user: { ...user._doc, profilePicture: user.profilePicture } });
            return res.status(200).json({ message: 'Successfully logged in', user: { ...user.toObject(), profilePicture: user.profilePicture } });
            
          } else {
            return res.json({ message: 'Invalid credentials' });
          }
        } catch (err) {
          console.log(err)
          res.status(400).json({
            err: err
          });
        }
      },
      
  LoginDetailsget: async (req, res) => {
            try{
         
             const result = await UserModel.find();
     
             res.status(200).json(result);
             return res
         
            }catch(err){
             res.status(400).json({
                 err:err
              })
            }
         
  },
forgotPassword : async (req, res) => {
  try {
    const { Emailaddress } = req.body;

    // Find the user in the database
    const user = await UserModel.findOne({ Emailaddress });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    // Generate a unique OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    // Save the OTP and its expiration time to the user in the database
    user.resetToken = otp;
    user.resetTokenExpiration = Date.now() + 600000; // 10 minutes

    // Save the updated user to the database
    await user.save();
          console.log(otp)
    // Send an email to the user with the OTP
    // Send the OTP via email using your email sending mechanism

    return res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
},
resetPassword : async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Find the user with the provided reset token
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res.json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password and save it to the user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.Password = hashedPassword;

    // Clear the reset token and its expiration time
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    // Save the updated user to the database
    await user.save();

    return res.json({ message: 'Password successfully reset' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
},

userDetailsdelete: async (req, res) => {

    try{
  
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Workorder details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
  },

  userDetailsupdate: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const fileData = req.file ? req.file.buffer : null;
  
    try {
      // Handle file update logic here (e.g., save to storage system and update path in the database)
      if (fileData) {
        // Implement your logic to save the file and update the database accordingly
        const filePath = await storageService.saveFile(fileData, 'uploads/');
  
        // Check if the user has an existing profile picture path
        const existingUser = await UserModel.findById(id);
        if (existingUser && existingUser.profilePicture) {
          // If the user has an existing profile picture, delete the old file
          try {
            await fs.unlink(existingUser.profilePicture);
            // console.log('Old profile picture deleted successfully');
          } catch (unlinkError) {
            // console.error(Error deleting old profile picture: ${unlinkError.message});
          }
        }
  
        // Update the updates object with the new file path or relevant information
        updates.profilePicture = filePath;
      }
  
      // Check if the "Salary" field is present and not null before updating
      if ('Salary' in updates && updates.Salary !== null && updates.Salary !== undefined) {
        // Validate if "Salary" is a valid number before casting
        if (!isNaN(updates.Salary)) {
          updates.Salary = Number(updates.Salary); // Ensure "Salary" is a number
        } else {
          // Handle the case where "Salary" is not a valid number
          throw new Error('Invalid value for Salary. Must be a number.');
        }
      }
      if ('Password' in updates && updates.Password !== null && updates.Password !== undefined) {
        // Hash the updated password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        updates.Password = await bcrypt.hash(updates.Password, salt);
      }
  
      // Fetch the existing user from the UserModel
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Log the existing and updated data for debugging
      // console.log('Existing User:', existingUser);
      // console.log('Updates:', updates);
  
      // Update the user in the UserModel
      const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
  
      // Log the updated data for debugging
      // console.log('Updated User:', updatedUser);
  
      // Check if the user exists in userprojectsModel
      const userProject = await userprojectsModel.findOne({ Name: existingUser.Name });
  
      if (userProject) {
        // Update the user in the userprojectsModel based on Name
        // const updateResult = await userprojectsModel.findOneAndUpdate(
        //   { Name: existingUser.Name },
        //   { $set: { Name: updates.Name } },
        //   { new: true }
        // );
  
        const updateResult = await userprojectsModel.updateMany(
          { Name: existingUser.Name },
          { $set: { Name: updates.Name } },
          { new: true }
        );
        
        // Log the update result for debugging
        // console.log('Update Result:', updateResult);
        
  
  
        // Log the update result for debugging
        // console.log('Update Result:', updateResult);
      } else {
        // console.log('User not found in userprojectsModel. No update performed.');
      }
  
      // Continue with your existing update logic for other fields
      // ...
  
      return res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

}

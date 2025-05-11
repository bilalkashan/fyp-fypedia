const UserModel = require("../Models/user");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const StudentDetail = require("../Models/studentDetail");
const TeacherDetail = require("../Models/teacherDetail");

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        console.log(name, email, password, role);

        let studentDepartment, regNumber, year, batch;

        if (role === 'student') {
            const emailRegex = /^([a-z]{4,6})(\d{7})@szabist\.pk$/i;
            const match = email.match(emailRegex);

            if (!match || match.length < 3) {
                return res.status(400).json({
                    message: "Only valid SZABIST student emails are allowed (e.g., bscs2112277@szabist.pk)",
                    success: false
                });
            }

            studentDepartment = match[1];
            regNumber = match[2];
            year = `20${regNumber.slice(0, 2)}`;
            batch = `Batch ${regNumber.slice(0, 2)}`;
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser && existingUser.is_verified === false) {
            if (existingUser.role === "student") {
                await StudentDetail.deleteOne({ userId: existingUser._id });
            } else if (existingUser.role === "teacher") {
                await TeacherDetail.deleteOne({ userId: existingUser._id });
            }

            await existingUser.deleteOne();
        } else if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const newUser = new UserModel({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: role || "student",
            is_active: true,
            is_verified: false,
            admin_verified: "false",
            otp: Math.floor(Math.random() * 1000000) + 1
        });

        await newUser.save();

        if (newUser.role === "student" && studentDepartment && regNumber && year && batch) {
            await StudentDetail.deleteOne({ registrationNumber: regNumber });

            const studentDetail = new StudentDetail({
                userId: newUser._id,
                registrationNumber: regNumber,
                department: studentDepartment,
                year,
                batch
            });

            await studentDetail.save();
        }

        if (newUser.role === "teacher") {
            const teacherDetail = new TeacherDetail({
                userId: newUser._id,
                experience: 0
            });

            await teacherDetail.save();
        }

        return res.status(201).json({ message: "Signup successful", success: true });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "Auth failed: email or password wrong", success: false });
        }

        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
            return res.status(403).json({ message: "Auth failed: email or password wrong", success: false });
        }

        if (!user.is_verified) {
            return res.status(403).json({ message: "Account not veriied", success: false });
        }

        if (user.admin_verified==="false" || user.admin_verified==="rejected") {
            return res.status(403).json({ message: "Admin not veriied", success: false });
        }


        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "5h" } 
        );

        res.status(200).json({
            message: user.role+ " Login successful",
            name: user.name,
            email: user.email,
            role: user.role, 
            jwtToken: jwtToken,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }

   
}

const verify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "Auth failed: email or password wrong", success: false });
        }

        if (user.otp !=otp) {
            return res.status(403).json({ message: "otp is wrong", success: false });
        }

      
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "24h" } 
        );

        if (user) {
            user.is_verified = true;
            await user.save();
        }
          

        res.status(200).json({
            message: "Otp has been verified",
            name: user.name,
            email: user.email,
            role: user.role, 
            jwtToken: jwtToken,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await UserModel.findOne({ email });

        if (user) {
            user.otp =Math.floor((Math.random()*1000000)+1);
            
            await user.save();
        }
        if (!user) {
            return res.status(409).json({ message: "Auth failed: email is wrong", success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "24h" } 
        );
       
          

        res.status(200).json({
            message: "Otp has sent to your email",
            name: user.name,
            email: user.email,
            role: user.role, 
            jwtToken: jwtToken,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}
const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password || password.length < 4) {
            return res.status(400).json({ message: "Password must be at least 4 characters long", success: false });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(409).json({ message: "Auth failed: email is wrong", success: false });
        }

        if (user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword; 
            await user.save(); 
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "24h" } 
        );

        res.status(200).json({
            message: "Password Reset Successfully",
            name: user.name,
            email: user.email,
            role: user.role, 
            jwtToken: jwtToken,
            success: true
        });
    } catch (error) {
        console.error('Error occurred:', error); 
        res.status(500).json({ message: "Server error", success: false });
    }
}

const getAdminPendingUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ admin_verified: "false", is_verified: true });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};
const acceptUser = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const user = await UserModel.findOne({ _id: userId });
      if (user) {
        user.admin_verified = "true";
        await user.save();
  
        res.status(200).json({ message: "User accepted successfully", success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", success: false });
    }
  };
const deleteUserRequest = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const user = await UserModel.findOne({ _id: userId });
      if (user) {
        user.admin_verified = "rejected";
        await user.save();
  
        res.status(200).json({ message: "User deleted successfully", success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", success: false });
    }
  };
  



module.exports={
    signup, login,verify,forgetPassword,resetPassword,getAdminPendingUsers,acceptUser,deleteUserRequest
}
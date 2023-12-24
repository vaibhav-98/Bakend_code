import User from "../models/user.model"
import AppError from "../utils/error.util"

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
}

const register = async (req, res) => {
    const {fullName , email , password} = req.body;

    if(!fullName || !email || !password){
        return next(new AppError('All field are required ',400))
    }

    const userExists = await User.findone({ email})

    if(userExists){
        return  next(new AppError('Email already Exists',400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url:" "
        }
    })

    if(!user){
        return next(new AppError('User registration faild ,  please try again'))
    }
    
    // TODO: File upload

    await user.save()
     
    user.password = undefined;

    const token = await user.generateJWTToken()

    res.cookie('token', token , cookieOptions)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
    });

};


//======================================================================================================
const login = async (req,res) => {
    try {
        const { email, password} = req.body;

    if(!email || !password){
        return next(new AppError('All fields are required',400))
    }

    const user = await User.findone({
        email
    }).select('+password')

    if(!user || !user.comparePassword(password)){
        return next (new AppError('Email or password does not match',400))
    }
     
    const token = await user.generateJWTToken();
    user.password = undefined ;

    res.cookie('token',token, cookieOptions)

    res.status(200).json({
        success: true,
        message: 'User loggedin successfully',
        user,
    })
    } catch (error) {
        return next (new AppError(error.message,500))
    }
    

}

const logout = (req,res) => {
     res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
     });

     res.status(200).json({
        success: true,
        messsage: 'User logged out  successfully'
     })

}


const getProfile = async (req, res ) => {
     try {
        const userId = req.body.id;
        const user = await User.findById(userId)
        
     } catch (error) {
        
     }
     
}


export {
    register,
    login,
    logout,
    getProfile
}

const UserServices = require("../services/UserServices");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/authUtils");





exports.registr =  async (req, res) => {
 

  try {
    const { name, email, password} = req.body;

    // console.log(name, email, password, );

    
    if(name.trim() !== '' && email.trim() !== '' && password.trim() !== ''){
        const hashPassword = await bcrypt.hash(password, 10);
        const data  = { 
            name,
            email,
            password: hashPassword,
          }
    
            
            
        
      
        const user = await UserServices.createUser(data);
    
        if (user) {
    
           res.locals.user = user
          delete user.dataValues.password;
    
          
    
          const { accessToken, refreshToken } = generateTokens({user});
          res
            .status(201)
            .cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 12,
            })
            .json({ message: "success", accessToken, user });
        }
    }
   
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(email.trim() !== '' && password.trim() !== '' ) {
        const user = await UserServices.getUser(email);
        if (user) {
          const compare = await bcrypt.compare(password, user.password);
    
          if (compare) {
            res.locals.user = user
            console.log(res.locals.user.get({plain: true}));
            
            delete user.dataValues.password;
            const { accessToken, refreshToken } = generateTokens({user});
    
    
            console.log(1234567890);
            
            res
              .status(200)
              .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 12,
              })
              .json({ message: "success", accessToken, user });
              console.log('yes');
              return
              
          }
        }
    
        res.status(400).json({ message: "email или пароль неверные" });
        return
    }

  
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

exports.logout = async (req, res) => {
  try {
    res.locals.user = undefined;
    res.clearCookie("refreshToken").status(200).json({ message: "success" });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}



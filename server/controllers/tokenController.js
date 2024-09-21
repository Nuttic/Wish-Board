const generateTokens = require('../utils/authUtils')


exports.refresh =  async(req, res) => {

    try{
    const { user } = res.locals
    const { accessToken, refreshToken } = generateTokens({user})

    res
    .status(200)
    .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      })
      .json({ message: 'success', user, accessToken });
    } catch ({ message }) {
      res.status(500).json({ message });
    }
    
}
const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        let token ;
        let secret ;
    if (req.header("Authorization")) {
        token = req.header("Authorization")
        secret = process.env.ACCESS_TOKEN_SECRET
    } else if(req.cookies.refreshtoken) {
        token =req.cookies.refreshtoken
        secret = process.env.REFRESH_TOKEN_SECRET
    }

        if(!token) return res.status(400).json({msg: "Invalid Authentication before verify"})

        jwt.verify(token, secret, (err, user) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication after verify"})
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth
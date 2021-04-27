const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
//     try {
//         const token = res.cookies.token;
//         if (!token)
//             return res.status(401).json({ message: "UnAuthorised access" });

//         //verify the JWT token received from cookie
//         const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verifiedUser;
//         next();
//     }
//     catch (err) {
//         return res.status(401).json({ message: "UnAuthorised access" });
//     }
// }

const header = req.headers['authorization'];
console.log(header);
if(typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_SECRET , function(err, decoded) {
        if(err){
            console.log(err)
            res.sendStatus(403)
        }
        else{
            console.log(decoded)
            // res.json({
            //     message: 'Token verified!'
            // });
            req.user = decoded ;
            next() ;
        }
    }) //end of jwt.verify
}
else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403)
//missing token in the header
}
}

module.exports = {auth}
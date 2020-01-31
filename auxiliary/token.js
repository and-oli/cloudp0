const jwt = require("jsonwebtoken");
const superSecret = "ilovescotchscotchyscotchscotch";

function token(con) {
    let aux = {}

    aux.checkToken = function (req, res) {
        var token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (token) {
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err)
                    return res.status(403).send({ success: false, message: "Error de autenticación, por favor refresque la aplicación." });
                else{
                    req.decoded = decoded;
                    return res.json({success:true});
                }

            });
        } else {
            return res.status(403).send({
                success: false,
                message: "No token provided."
            });
        }
    }

    aux.getToken = function (req, res) {
        const { mail, password } = req.body;

        con.query(`SELECT * FROM USERS WHERE mail='${ mail}'`, function (err, result, fields) {
            if (err) throw err;

            const user = result[0]
            if (result.length < 1) {
                res.json({
                    success: false,
                    message: "Email not registered!"
                });
            } else {
                if (user.password !== password) {
                    res.json({
                        success: false,
                        message: "Wrong password"
                    });
                } else {
                    var token = jwt.sign({
                        email: user.mail,
                        id: user.id,
                    }, superSecret, {
                        expiresIn: '24h' 
                    });
                    res.json({
                        success: true,
                        message: "Enjoy your token!",
                        token
                    });
                }
            }
        });

    }
    return aux;
}

module.exports = token;

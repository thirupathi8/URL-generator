import jwt from "jsonwebtoken";


const validateToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).send("No token provided.")
    }

    try{
        const decoded = jwt.verify(token, "VerySecureKey")
        return res.status(200).send("Token is valid")
    }
    catch(error){
        return res.status(401).send("Token invalid")
    }
}

export default validateToken
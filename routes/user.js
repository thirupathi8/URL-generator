import express from "express"
import { handleUserSignup, handleUserLogin} from "../controller/user.js"
import validateToken from "../controller/auth.js"

const router = express.Router()

router.post("/signup", handleUserSignup)

router.post("/login", handleUserLogin)

router.post("/validate-token", validateToken)

export default router
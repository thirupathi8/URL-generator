import express from "express"
import {handleGenShortURL, handleRedirectToURL, handleAnalytics} from "../controller/url.js"

const router = express.Router()

router.post("/", handleGenShortURL)

router.get("/:shortId", handleRedirectToURL)

router.get("/analytics/:shortId", handleAnalytics)

export default router

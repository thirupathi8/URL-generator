import { nanoid } from 'nanoid'
import URL from '../models/url.js'

const handleGenShortURL = async (req, res) => {
    // console.log("Request Body:", req.body);
    const body = req.body
    if(!body.url) 
        return res.status(400).json({error: "Url is required"})
    const shortId = nanoid(8)
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    })
    return res.json({id: shortId})
}

const handleRedirectToURL = async (req, res) => {
    const { shortId } = req.params

    try {
        const urlRecord = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        )

        if (urlRecord) {
            res.redirect(urlRecord.redirectUrl)
        } else {
            res.status(404).send("Short URL not found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
}

const handleAnalytics = async (req, res) => {
    const { shortId } = req.params

    const result =  await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

export {handleRedirectToURL, handleGenShortURL, handleAnalytics}
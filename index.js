import express from "express"
import urlRoute from "./routes/url.js"
import connectToMongoDB from "./connection.js"

const app = express()
const PORT = 3000

connectToMongoDB("mongodb://localhost:27017/short_url")
.then(console.log("Mongodb connected"))

app.use(express.json())

app.use("/url", urlRoute)

app.use("/", urlRoute)

app.listen(PORT, () => {
    console.log(`Server has started at PORT: ${PORT}`)
})
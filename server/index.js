import express from "express"
import dotenv from "dotenv"
import { dataBase } from "./src/config/db.js";

dotenv.config();


const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World")
})
dataBase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Connected On Port ${PORT}`);
    })
}).catch((error) => {
    console.log("Error", error.message);
});
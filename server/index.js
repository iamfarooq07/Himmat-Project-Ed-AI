import express from "express"
import dotenv from "dotenv"
import { dataBase } from "./src/config/db.js";
import { route } from "./src/routes/user.route.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/user", route)

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
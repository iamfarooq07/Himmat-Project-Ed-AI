import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { dataBase } from "./src/config/db.js";
import { route } from "./src/routes/user.route.js";
import { courseRoute } from "./src/routes/course.route.js";
import { authMiddleware } from "./src/middlewares/auth.middleware.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/user", route)
app.use("/api/courses", authMiddleware, courseRoute)

app.get("/", (req, res) => {
    res.send("Hello World")
})

// Error Handling Middleware
app.use(errorMiddleware)

dataBase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Connected On Port ${PORT}`);
    })
}).catch((error) => {
    console.log("Error", error.message);
});
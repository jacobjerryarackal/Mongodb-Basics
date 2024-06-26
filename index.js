import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected sucessfully !");
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}.....`);
    });
}).catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    name: String,
    age : Number,
});

const UserModel = mongoose.model("users", userSchema);

app.get("/", (req,res) => {
    res.send("Hello World !!");
})

app.get("/getUsers", async(req, res) => {
    const userData = await UserModel.find();
    res.json(userData);
})
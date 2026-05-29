const express =require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
res.send("hello express");

});

const userRouter = require("./userRoute");

app.use("/", userRouter);


const port = 3000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
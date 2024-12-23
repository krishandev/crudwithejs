const express=require('express')
const app=express();
const path=require('path')
const userModel=require('./models/users')

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.render("index")
})

app.get('/read', async(req, res)=>{
    let users=await userModel.find()
    res.render("read", {users})
})

app.post('/create', async(req, res)=>{
    let {image, name, email}=req.body;
    let createdUser= await userModel.create({image, name, email})
    res.redirect("/read")

})

app.get("/delete/:id", async(req, res)=>{
    let deletedUser=await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read")
})

app.listen(3000, (req, res)=>{
    console.log("It's working")
})
const router = require("express").Router()

const usercontroller =require("../app/controller/user.controller")
// router.get("/", usercontroller.all)
router.post("/register",usercontroller.register)
const auth=require("../app/middleware/auth.middleware")

router.get("/",auth,usercontroller.all)
router.get("/single/:id",usercontroller.single)
router.delete("/delsingle/:id",usercontroller.deluser)
router.delete("/dellall",usercontroller.deletall)
router.post("/login",usercontroller.login)
router.post("/editsingle/:id",usercontroller.editsingle)
router.get("/me",auth,usercontroller.profile)
router.post("/logout",auth,usercontroller.logout)
router.post("/logoutall",auth,usercontroller.logout_lldevices)
module.exports=router
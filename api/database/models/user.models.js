const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const schema = mongoose.Schema({
        fname: {
                type: String
                , tirm: true
                , required: true
                , lowercase: true
                , minLenght: 5
                , maxLenght: 20
        }
        , lname: {
                type: String
                , tirm: true
                , required: true
                , lowercase: true
                , minLenght: 5
                , maxLenght: 20
        }
        , age: {
                type: Number
                , min: 21
                , max: 60
                , required: true
        }
        , email: {
                type: String
                , tirm: true
                , required: true
                , lowercase: true
                , unique: true
                , validate(value) {
                        if (!validator.isEmail(value)) throw new Error("invalid email format")

                }
        }
        , password: {
                type: String
                , tirm: true
                , required: true
                // , lowercase: true
              


        }
        , statue: {
                type: Boolean
                , default: false
        }
        , image: { 
                type: String 
        }
        , gender: {
                type: String
                , trim: true
                , lowercase: true
                , enum: ["male", "female"]

        }
        
        , phone: {
                type: String
                , tirm: true
                , validate(value) {
                        if (!validator.isMobilePhone(value, "ar-EG")) throw new Error("invalid phone num")

                }
        }
        ,tokens:[{ token:{type:String,required:true}}]
        , address: [{
                adname: {
                        type: String
                        , tirm: true
                        , required: true
                        , lowercase: true
                }
        }
                , {
                        addetail: {
                                type: String
                                , tirm: true
                                , required: true
                                , lowercase: true
                        }
        }]
}
        ,{ timestamps: true
})
schema.pre("save", async function () {
        if (this.isModified("password"))
                this.password = await bcrypt.hash(this.password, 12)
})

schema.statics.loginme=async(email,password)=>{
        // console
        const userData=await usermodel.findOne({email})
        if(!userData) throw new Error("invalid email")
        console.log(userData.password)
        const match =await bcrypt.compare(password,userData.password)
        console.log(match)
        if(!match)throw new Error("invalid password")
        return userData
}
schema.methods.generateToken=async function(){
        const token =jwt.sign({_id:this._id},process.env.JWTKEY)
        //this.tokens.push({token})
        this.tokens=this.tokens.concat({token})
        await this.save()
        return token
}

const usermodel = mongoose.model("user", schema)

module.exports = usermodel
const userModel = require("../../database/models/user.models")
const { resHandler } = require("../helper")
const { verify } = require("jsonwebtoken")
const auth = async (req, res, next) => {
  try {
    //bearer ey.... ....دا داتا تايب لل توكن...عاوزين نشيلو علشان ناحد التوكن بس
    //علشان نشوف ان التوكن دى معمول ليها لوجن ولا لا
    const token = req.header("Authorization").replace("bearer ", "")
    const decodededToken = verify(token, process.env.JWTKEY)
    const userData = await userModel.findOne({
      _id: decodededToken._id,
      "tokens.token": token
    })
    console.log(userData)
    if (!userData) throw new Error("unauthorization")
    req.user = userData
    req.token = token
    next()
  } catch (e) {
    resHandler(res, 500, false, e.message, "unauthorized")
  }
}
module.exports = auth
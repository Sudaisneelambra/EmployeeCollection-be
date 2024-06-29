const users = require("../../models/user");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET_KEY;
const EXP = process.env.EXP
const jwt = require("jsonwebtoken");

/**login*/
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userWithEmail = await users.findOne({ email: email });
    const userWithId = await users.findOne({ userId: email });
    if (!userWithEmail && !userWithId) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    } else {
      if (userWithEmail) {
        const password1 = await bcrypt.compare(
          password,
          userWithEmail.password
        );
        if (password1) {
          const token = jwt.sign(
            {
              userId: userWithEmail.userId,
              email: userWithEmail.email,
              isAdmin: userWithEmail.isAdmin,
              id:userWithEmail._id
            },
            secretKey,
            { expiresIn: EXP }
          );
          return res.status(200).json({
            success: true,
            isAdmin: userWithEmail.isAdmin,
            message: "Login Successfull",
            data: userWithEmail,
            token,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Password is incorrect",
          });
        }
      } else if (userWithId) {
        const password2 = await bcrypt.compare(password, userWithId?.password);
        if (password2) {
          const token = jwt.sign(
            {
              userId: userWithId.userId,
              email: userWithId.email,
              isAdmin: userWithId.isAdmin,
              id:userWithId._id
            },
            secretKey,
            { expiresIn: EXP}
          );
          return res.status(200).json({
            success: true,
            isAdmin: userWithId.isAdmin,
            message: "Login Successfull",
            data: userWithId,
            token,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Password is incorrect",
          });
        }
      } else {
        return res.status(200).json({
          success: false,
          message: "Password is incorrect",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { Login };

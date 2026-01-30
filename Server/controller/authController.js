const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // ✅ Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    // 🔍 Check user
    let user = await User.findOne({ email });

    // 🔥 Auto-register
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
        role: "customer"
      });
    }

    // 🔐 Auto-login (JWT)
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // res.json({
    //   token: jwtToken,
    //   role: user.role
    // });
    res.json({
  token: jwtToken,
  user: {
    _id: user._id,
    role: user.role,
    email: user.email,
    name: user.name
  }
});


  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};

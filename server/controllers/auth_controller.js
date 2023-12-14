const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const isDevelopment = process.env.NODE_ENV === "development";
baseURL = isDevelopment
  ? "http://localhost:3000/reset-password"
  : `${process.env.REACT_APP_URL}/reset-password` ||
    "http://localhost:3000/reset-password";

getLoggedIn = async (req, res) => {
  try {
    let userId = auth.verifyUser(req);
    if (!userId) {
      return res.status(200).json({
        loggedIn: false,
        user: null,
        errorMessage: "Not logged in",
      });
    }

    const loggedInUser = await User.findOne({ _id: userId });
    console.log("loggedInUser: " + loggedInUser);

    return res.status(200).json({
      loggedIn: true,
      user: {
        id: loggedInUser._id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        userName: loggedInUser.userName,
      },
    });
  } catch (err) {
    console.log("err: " + err);
    res.json(false);
  }
};

resetPassword = async (req, res) => {
  console.log("Here");
  const { id, token, expires } = req.params;
  console.log("user_id: " + id + "   token: " + token);
  const expirationTime = new Date(expires);
  console.log("expiration time: " + expirationTime);
  const { password, passwordVerify } = req.body;
  if (expirationTime <= new Date()) {
    // Display a message to the user indicating that the link has expired
    return res.status(400).json({ errorMessage: "Expired Link." });
  }
  if (!password || !passwordVerify) {
    return res.status(400).json({
      errorMessage: "All provided field need to be filled in.",
    });
  }
  if (password !== passwordVerify) {
    return res.status(400).json({
      errorMessage: "Please enter the same password twice.",
    });
  }
  try {
    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMessage: "Invalid or expired token." });
      } else {
        // Generate a salt and hash the new password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        // Update the user's password in the database
        await User.findByIdAndUpdate(
          { _id: id },
          { passwordHash: passwordHash }
        );

        return res.status(200).json({
          message: "Password reset successfully.",
        });
      }
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      errorMessage: "Internal server error. Please try again later.",
    });
  }
};

forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const existingUser = await User.findOne({ email: email });
    console.log("existingUser: " + existingUser);
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Wrong email provided.",
      });
    }

    const token = auth.signToken(existingUser._id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mapartisannavy@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });
    console.log(baseURL);
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
    const mailOptions = {
      from: "mapartisannavy@gmail.com",
      to: email,
      subject: "Reset Your Password",
      text:
        "Here is your LINK for RESET " +
        `${baseURL}/${
          existingUser._id
        }/${token}/${expirationTime.toISOString()}` +
        " PLEASE NOTE: THE LINK IS ONLY AVAILABLE FOR 5 MINS",
    };

    const sendMailAsync = async () => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Email send error:", error);
            reject(error);
          } else {
            console.log("Email sent: %s", info.messageId);
            resolve(info);
          }
        });
      });
    };
    await sendMailAsync();
    return res.status(200).json({
      loggedIn: false,
      user: null,
      errorMessage: "?",
    });
  } catch (err) {
    return res
      .status(400)
      .json({ errorMessage: "We cannot reset your password." });
  }
};

loginUser = async (req, res) => {
  console.log("loginUser");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const existingUser = await User.findOne({ email: email });
    console.log("existingUser: " + existingUser);
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Wrong email or password provided.",
      });
    }

    console.log("provided password: " + password);
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      console.log("Incorrect password");
      return res.status(401).json({
        errorMessage: "Wrong email or password provided.",
      });
    }

    // LOGIN THE USER
    const token = auth.signToken(existingUser._id);
    console.log(token);

    res
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          userName: existingUser.userName,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

updateUser = async (req, res) => {
  console.log("UPDATE USER IN BACKEND");
  try {
    const {
      userEmail,
      firstName,
      lastName,
      userName,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;
    if (!userEmail || !userName || !firstName || !lastName) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const existingUser = await User.findOne({ email: userEmail });
    console.log("existingUser: " + existingUser);
    console.log("update user");
    if (newPassword && confirmNewPassword) {
      if (newPassword.length < 8) {
        return res.status(400).json({
          errorMessage: "Please enter a new password of at least 8 characters.",
        });
      }
      console.log("password long enough");
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          errorMessage: "Please enter the same password twice.",
        });
      }
      console.log("Password and password verify match");

      if (!currentPassword) {
        return res.status(400).json({
          errorMessage: "Please filled in all required fields.",
        });
      }
      const passwordCorrect = await bcrypt.compare(
        currentPassword,
        existingUser.passwordHash
      );
      if (!passwordCorrect) {
        console.log("Incorrect password");
        return res.status(401).json({
          errorMessage: "Wrong password provided.",
        });
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(newPassword, salt);
      console.log("passwordHash: " + passwordHash);
      existingUser.passwordHash = passwordHash;
    } else {
      if (newPassword || confirmNewPassword) {
        return res.status(400).json({
          errorMessage:
            "Please enter all the password text field if you want to update the password.",
        });
      }
    }

    // const existingNewEmail = await User.findOne({ email: email });
    // if (existingNewEmail) {
    //   console.log("The given email is already used");
    //   return res.status(400).json({
    //     success: false,
    //     errorMessage: "An account with this email address already exists.",
    //   });
    // }

    // Update user information
    existingUser.userName = userName;
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.email = userEmail;
    // Save the updated user
    await existingUser.save();
    console.log("User updated successfully");
    console.log(existingUser);
    return res.status(200).json({
      loggedIn: true,
      user: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        userName: existingUser.userName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

logoutUser = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: false,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
};

registerUser = async (req, res) => {
  console.log("REGISTERING USER IN BACKEND");
  try {
    const { userName, firstName, lastName, email, password, passwordVerify } =
      req.body;
    console.log(
      "create user: " +
        firstName +
        " " +
        lastName +
        " " +
        email +
        " " +
        password +
        " " +
        passwordVerify
    );
    if (
      !userName ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordVerify
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    console.log("all fields provided");
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    }
    console.log("password long enough");
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }
    console.log("password and password verify match");
    const existingUser = await User.findOne({ email: email });
    console.log("existingUser: " + existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this email address already exists.",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("passwordHash: " + passwordHash);

    const newUser = new User({
      userName,
      firstName,
      lastName,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();
    console.log("new user saved: " + savedUser._id);

    // LOGIN THE USER
    const token = auth.signToken(savedUser._id);
    console.log("token:" + token);

    await res
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
        },
      });

    console.log("token sent");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  forgetPassword,
  resetPassword,
};

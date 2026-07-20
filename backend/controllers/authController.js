import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const workspaceId = `ws_${Date.now()}`;

    const user = await User.create({
      username,
      email,
      password,
      workspaceId,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      workspaceId: user.workspaceId,
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.stack });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      workspaceId: user.workspaceId,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const workspaceId = `ws_${Date.now()}`;
      const randomPassword = await bcrypt.hash(googleId, 10);

      user = await User.create({
        username: name,
        email,
        password: randomPassword,
        workspaceId,
      });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      workspaceId: user.workspaceId,
    });
  } catch (error) {
    console.error("Erreur google login:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    workspaceId: req.user.workspaceId,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 0,
  });
  res.json({ message: "Déconnecté" });
};

// mise a jour du profile ( AvatarIcon )

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (req.body.avatar !== undefined) {
      user.avatar = req.body.avatar;
    }

    await user.save();
    res.json({ _id: user._id, username: user.username, email: user.email, workspaceId: user.workspaceId, avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// Suprimer un compte 

const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.clearCookie("token");
    res.json({ message: "Compte supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};



export { register, login, googleLogin, getMe, logout , updateProfile , deleteAccount };
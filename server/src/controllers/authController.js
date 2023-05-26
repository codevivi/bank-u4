import { usersModel } from "../models/allModels.js";
import { SESSION_COOKIE_NAME } from "../utils/config.js";
import { comparePassword } from "../utils/crypt.js";

export const login = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(403).json({ type: "failure", message: "already logged in" });
    return;
  }
  try {
    const { email, password } = req.body;
    const user = await usersModel.getByEmail(email);
    if (!user) {
      res.status(401).json({ type: "failure", message: "Vartotojas su šiuo elektroninio pašto adresu nerastas." });
      return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ type: "failure", message: "Netinkami prisijungimo duomenys." });
      return;
    } else {
      const userWithoutPassword = { name: user.username, email: user.email, id: user.id };
      req.session.isLoggedIn = true;
      req.session.user = userWithoutPassword;
      res.status(200).json({ type: "success", message: "OK", user: userWithoutPassword });
    }
  } catch (e) {
    res.status(500).json({ type: "error", message: "Internal server error" });
  }
};

export const whoAmI = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json({
      type: "success",
      message: "OK",
      user: req.session.user,
    });
    return;
  } else {
    res.status(200).json({
      type: "success",
      message: "OK",
      user: null,
    });
  }
};

export const logout = (req, res, next) => {
  req.session.destroy();
  if (req.session) {
    req.session = null;
  }
  res.status(200).clearCookie(SESSION_COOKIE_NAME, { path: "/" }).json({
    type: "success",
    message: "You are logged out",
  });
};

import express from "express";
import { supabase } from "../services/supabase.js";

const router = express.Router();
const SCHOOL_DOMAIN = "e-mirim.hs.kr";

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "emailId/password required" });
    }

    const email = `${emailId}@${SCHOOL_DOMAIN}`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.session) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { access_token, refresh_token, user } = data.session;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Login server error" });
  }
});

export default router;

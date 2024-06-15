// pages/api/setCookie.js
import { setCookie } from "cookies-next";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { uid, email } = req.body;

    setCookie("currentUser", JSON.stringify({ uid, email }), {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    });

    res.status(200).json({ message: "Cookie set successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

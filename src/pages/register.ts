import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export type UserInterface = {
  password: string;
  name: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { password, name, email }: UserInterface = req.body;

      // Checking if password was provided
      if (!password) {
        return res.status(400).json({ error: "Password is required." });
      }

      if (!name) {
        return res.status(400).json({ error: "Name is required." });
      }

      if (!email) {
        return res.status(400).json({ error: "Email is required." });
      }

      // Encrypting password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Return encrypted password
      return res.status(200).json({ hashedPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    // If not a POST request
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

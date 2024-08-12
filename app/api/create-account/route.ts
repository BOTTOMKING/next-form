import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/middleware";
import { prisma } from '@/prisma/prisma';
import bcrypt from "bcrypt";

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    req.session.user = { id: user.id, username: user.username };
    await req.session.save();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
});

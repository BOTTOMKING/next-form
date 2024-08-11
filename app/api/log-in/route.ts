import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/middleware";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.user = { id: user.id, username: user.username };
  await req.session.save();

  res.status(200).json({ user });
});

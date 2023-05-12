import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload = req.body;
    const sendPrisma = await prisma.product.create({
      data: {
        name: payload.name,
        image: payload.image,
        price: payload.price,
      },
    });
    res.status(200).json(sendPrisma);
  }
  if (req.method === "GET") {
    const getData = await prisma.product.findMany({});

    res.status(200).json(getData);
  }
}

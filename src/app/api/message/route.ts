import db from "@/core/db";
import { ResponseCode } from "@/core/type";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const bucketMessages = await db.bucketMessage.findMany();

  const buckets = await db.bucket.findMany({
    where: {
      id: {
        in: bucketMessages.map((bucketMessage) => bucketMessage.bucketId),
      },
    },
  });

  const messages = await db.message.findMany({
    where: {
      id: {
        in: bucketMessages.map((bucketMessage) => bucketMessage.messageId),
      },
    },
  });

  return Response.json({
    status: ResponseCode.SUCCESS,
    message: null,
    data: {
      buckets,
      messages,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    bucketName: string;
    messages: string[];
  };

  await db.$transaction(async (prisma) => {
    const bucket = await prisma.bucket.create({
      data: {
        name: body.bucketName,
      },
    });

    const messages = await prisma.message.createManyAndReturn({
      data: body.messages.map((message) => ({ content: message })),
    });

    await prisma.bucketMessage.createMany({
      data: messages.map((message) => ({
        bucketId: bucket.id,
        messageId: message.id,
      })),
    });

    return bucket;
  });

  return Response.json({
    status: ResponseCode.SUCCESS,
    data: null,
  });
}

// export async function PUT(request: NextRequest) {
//   return Response.json({
//     message: "Hello World - PUT",
//   });
// }

// export async function DELETE(request: NextRequest) {
//   return Response.json({
//     message: "Hello World - DELETE",
//   });
// }

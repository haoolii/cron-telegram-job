import db from "@/core/db";
import { ResponseCode } from "@/core/type";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const applications = await db.application.findMany();

  const applicationConfigs = await db.applicationConfig.findMany({
    where: {
      applicationId: {
        in: applications.map((application) => application.id),
      },
    },
  });

  const configs = await db.config.findMany({
    where: {
      id: {
        in: applicationConfigs.map(
          (applicationConfig) => applicationConfig.configId
        ),
      },
    },
  });

  return Response.json({
    status: ResponseCode.SUCCESS,
    message: null,
    data: {
      applications,
      configs,
    },
  });
}

export async function POST(request: NextRequest) {
  return Response.json({
    message: "Hello World - POST",
  });
}

export async function PUT(request: NextRequest) {
  return Response.json({
    message: "Hello World - PUT",
  });
}

export async function DELETE(request: NextRequest) {
  return Response.json({
    message: "Hello World - DELETE",
  });
}

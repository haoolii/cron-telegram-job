import db from "@/core/db";
import { ResponseCode } from "@/core/type";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const tasksSettings = await db.tasksSetting.findMany();

  const tasks = await db.task.findMany({
    where: {
      id: {
        in: tasksSettings.map((tasksSetting) => tasksSetting.taskId),
      },
    },
  });

  const settings = await db.setting.findMany({
    where: {
      id: {
        in: tasksSettings.map((tasksSetting) => tasksSetting.settingId),
      },
    },
  });

  return Response.json({
    status: ResponseCode.SUCCESS,
    message: null,
    data: {
      tasks,
      settings,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name: string;
    desc: string;
    setting: Record<string, string>;
  };

  await db.$transaction(async (prisma) => {
    const task = await prisma.task.create({
      data: {
        name: body.name,
        desc: body.desc,
        enabled: true,
      },
    });

    const setting = await prisma.setting.createManyAndReturn({
      data: Object.entries(body.setting).map(([key, value]) => ({
        key,
        value,
      })),
    });

    await prisma.tasksSetting.createMany({
      data: setting.map((setting) => ({
        taskId: task.id,
        settingId: setting.id,
      })),
    });

    return task;
  });

  return Response.json({
    status: ResponseCode.SUCCESS,
    data: null,
  });
}

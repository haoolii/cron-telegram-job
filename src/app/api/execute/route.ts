import db from "@/core/db";
import { ResponseCode } from "@/core/type";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    taskId: string;
  };

  const task = await db.task.findUnique({
    where: {
      id: body.taskId,
    },
  });

  const tasksSettings = await db.tasksSetting.findMany({
    where: {
      taskId: body.taskId,
    },
  });

  const settings = await db.setting.findMany({
    where: {
      id: {
        in: tasksSettings.map((tasksSetting) => tasksSetting.settingId),
      },
    },
  });

  const setting = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as any);

  return Response.json({
    status: ResponseCode.SUCCESS,
    data: {
      task,
      setting,
    },
  });
}

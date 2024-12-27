import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { randomMessage } from "./utils";

type Props = {
  session: string;
  apiId: number;
  apiHash: string;
  chatId: number;
  messages: string[];
};

export const hello = async (props: Props) => {
  try {
    const { session, apiId, apiHash, chatId, messages } = props;

    const client = new TelegramClient(new StringSession(session), apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.connect();

    const message = randomMessage(messages);

    try {
      const response = await client.sendMessage(chatId, { message });
      console.log("MESSAGE SENT SUCCESSFULLY", response);
    } catch (error) {
      console.error("ERROR SENDING MESSAGE");
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

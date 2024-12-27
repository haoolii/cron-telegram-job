export const randomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

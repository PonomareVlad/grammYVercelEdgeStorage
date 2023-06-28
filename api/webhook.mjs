import {setWebhookCallback} from "vercel-grammy";
import {init, secretToken} from "../src/bot.mjs";

export const config = {runtime: "edge"};

export default async (...args) => {
    const bot = await init();
    return setWebhookCallback(bot, {
        secret_token: secretToken,
        onError: "return"
    })(...args);
}

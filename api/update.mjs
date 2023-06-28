import {webhookCallback} from "grammy";
import {init, secretToken} from "../src/bot.mjs";

export const config = {runtime: "edge"};

export default async (...args) => {
    const bot = await init();
    return webhookCallback(bot, "std/http", {
        timeoutMilliseconds: 29_000,
        secretToken,
    })(...args);
}

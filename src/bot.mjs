import {Bot, session} from "grammy";
import {MongoFetchClient} from "mongo-fetch";
import {MongoDBAdapter} from "@grammyjs/storage-mongodb";

export const {
    DATA_API_URL: url,
    DATA_API_KEY: apiKey,
    TELEGRAM_BOT_TOKEN: token,
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()
} = process.env;

export const bot = new Bot(token);
export const client = new MongoFetchClient("Dev", {url, apiKey});
export const collection = client.db("grammY").collection("users");

bot.use(
    session({
        initial: () => ({counter: 0}),
        storage: new MongoDBAdapter({collection}),
    })
);

bot.command("stats", ctx => ctx.reply(`Already got ${ctx.session.counter} photos!`));
bot.on(":photo", ctx => ctx.session.counter++);
bot.on("message:text", ctx => ctx.reply(ctx.msg.text));

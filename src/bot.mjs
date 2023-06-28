import * as Realm from "realm-web";
import {Bot, session} from "grammy";
import {MongoDBAdapter} from "@grammyjs/storage-mongodb";

export const {
    APP_ID: id,
    DATA_API_KEY: apiKey,
    DATABASE_NAME: dbName,
    TELEGRAM_BOT_TOKEN: token,
    DATA_SOURCE_NAME: sourceName,
    COLLECTION_NAME: collectionName,
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop(),
} = process.env;

export async function init() {

    const bot = new Bot(token);
    const app = new Realm.App({id});
    const credentials = Realm.Credentials.apiKey(apiKey);
    const user = await app.logIn(credentials);
    const client = user.mongoClient(sourceName);
    const collection = client.db(dbName).collection(collectionName);

    bot.use(
        session({
            initial: () => ({counter: 0}),
            storage: new MongoDBAdapter({collection}),
        })
    );

    bot.command("stats", ctx => ctx.reply(`Already got ${ctx.session.counter} photos!`));
    bot.on(":photo", ctx => ctx.session.counter++);
    bot.on("message:text", ctx => ctx.reply(ctx.msg.text));

    return bot;

}

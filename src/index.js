require("dotenv/config");

const {Client, GatewayIntentBits} = require("discord.js");
const eventHandler = require("");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildsMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

eventHandler(client);

client.login(process.env.TOKEN);
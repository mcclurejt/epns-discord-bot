import "dotenv/config";
import { REST, Routes } from "discord.js";

const TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID || "";

const rest = new REST({ version: "10" }).setToken(TOKEN);

// All Commands
rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);

// // Single Commands
// rest.delete(Routes.applicationCommand(CLIENT_ID, 'commandId'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);

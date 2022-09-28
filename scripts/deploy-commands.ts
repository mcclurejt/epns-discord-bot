import "dotenv/config";
import { REST, Routes } from "discord.js";
import { commands } from "../src/commands";

const TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID || "";

// load commands
const rest = new REST({ version: "10" }).setToken(TOKEN);
rest
  .put(Routes.applicationCommands(CLIENT_ID), {
    body: commands.map((c) => c.config.toJSON()),
  })
  .then((data) =>
    console.log(
      `Successfully registered ${
        Array.isArray(data) ? data.length : "unknown"
      } application commands.`
    )
  )
  .catch(console.error);

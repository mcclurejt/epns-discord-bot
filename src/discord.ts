import {
  Client,
  GatewayIntentBits,
  ActivityType,
  Message,
  TextChannel,
  MessagePayload,
  MessageCreateOptions,
  Collection,
  REST,
  Routes,
} from "discord.js";
import { commands, Command } from "./commands";

const TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID || "";

const sweeperOption = { interval: 300, filter: () => null };

export class Bot {
  private static instance: Bot;
  private client: Client = new Client({
    intents: [GatewayIntentBits.Guilds],
    sweepers: {
      messages: sweeperOption,
      reactions: sweeperOption,
      users: sweeperOption,
      applicationCommands: sweeperOption,
      bans: sweeperOption,
      emojis: sweeperOption,
      invites: sweeperOption,
      guildMembers: sweeperOption,
      presences: sweeperOption,
      stageInstances: sweeperOption,
      stickers: sweeperOption,
      threadMembers: sweeperOption,
      threads: sweeperOption,
      voiceStates: sweeperOption,
    },
  });
  private commands: Collection<string, Command> = commands;

  private constructor() {
    this.loadCommands();
    this.setReadyHandler();
    this.setInteractionHandler();
  }

  static getInstance(): Bot {
    if (!Bot.instance) {
      Bot.instance = new Bot();
    }
    return Bot.instance;
  }

  async sendMessage(
    channelId: string,
    message: string | MessagePayload | MessageCreateOptions
  ): Promise<Message<true> | void> {
    const channel =
      this.client.channels.cache.get(channelId) ||
      (await this.client.channels.fetch(channelId));
    if (!channel) return;
    return (channel as TextChannel).send(message);
  }

  async connect() {
    this.client.login(TOKEN);
  }

  disconnect() {
    this.client.destroy();
  }

  async loadCommands() {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    rest
      .put(Routes.applicationCommands(CLIENT_ID), {
        body: this.commands.map((c) => c.config.toJSON()),
      })
      .then((data) =>
        console.log(
          `Successfully registered ${
            Array.isArray(data) ? data.length : "unknown"
          } application commands.`
        )
      )
      .catch(console.error);
  }

  private setReadyHandler(): void {
    this.client.once("ready", async () => {
      console.log(`Discord bot logged as "${this.client.user?.tag}"`);
      try {
        this.client.user?.setStatus("online");
        this.client.user?.setActivity("👀", { type: ActivityType.Watching });
      } catch (e) {
        console.log("Missing activity", e);
      }
    });
  }

  private setInteractionHandler(): void {
    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const { commandName } = interaction;
      console.log(
        `command: ${commandName} - guild: ${interaction.guild} - user: ${interaction.user.username}`
      );
      try {
        await this.commands.get(commandName)?.run(interaction);
      } catch (e) {
        console.error(e);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });
  }
}

const bot = Bot.getInstance();
bot.connect();

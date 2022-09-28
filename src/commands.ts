import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  InteractionResponse,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import { Bot } from "./discord";

export class Command {
  name: string;
  config: SlashCommandBuilder;
  run: (
    interaction: ChatInputCommandInteraction
  ) => Promise<Message<boolean> | InteractionResponse<boolean>>;

  constructor(
    config: SlashCommandBuilder,
    run: (
      interaction: ChatInputCommandInteraction
    ) => Promise<Message<boolean> | InteractionResponse<boolean>>
  ) {
    this.name = config.name;
    this.config = config;
    this.run = run;
  }

  asItem(): [string, Command] {
    return [this.name, this];
  }
}

const ping = new Command(
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Make sure the bot is online."),
  async (interaction) => {
    console.log("ping interaction");
    return interaction.replied
      ? await interaction.editReply({ content: "Pong!" })
      : await interaction.reply({ content: "Pong!", ephemeral: true });
  }
);

const masg = new Command(
  new SlashCommandBuilder()
    .setName("msag")
    .setDescription("Make sure the bot is online."),
  async (interaction) => {
    let components = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Yes")
        .setURL(
          "https://snapshot.org/#/elfi.eth/proposal/0xcbef6d61dd87c0dfe44c026ce2cb9012832fbbca00df50d7875b4911dc252b7f?choice=1"
        )
        .setStyle(ButtonStyle.Link),

      new ButtonBuilder()
        .setLabel("No")
        .setURL(
          "https://snapshot.org/#/elfi.eth/proposal/0xcbef6d61dd87c0dfe44c026ce2cb9012832fbbca00df50d7875b4911dc252b7f?choice=2"
        )
        .setStyle(ButtonStyle.Link),

      new ButtonBuilder()
        .setLabel("Abstain")
        .setURL(
          "https://snapshot.org/#/elfi.eth/proposal/0xcbef6d61dd87c0dfe44c026ce2cb9012832fbbca00df50d7875b4911dc252b7f?choice=3"
        )
        .setStyle(ButtonStyle.Link)
    );
    const embed = new EmbedBuilder()
      .setColor("#21B66F'")
      .setTitle("Working Groups Framework")
      .setURL(
        "https://snapshot.org/#/elfi.eth/proposal/0xcbef6d61dd87c0dfe44c026ce2cb9012832fbbca00df50d7875b4911dc252b7f"
      )
      .addFields(
        { name: "Status", value: "Active", inline: true },
        {
          name: "Start",
          value: `<t:Sep 26, 2022, 9:34 AM:R>`,
          inline: true,
        },
        { name: "End", value: `<t:Oct 1, 2022, 9:34 AM:R>`, inline: true }
      )
      .setDescription(
        "This proposal provides a framework for creating, amending, and removing working groups and outlining their roles and responsibilities."
      );
    const bot = Bot.getInstance();
    await bot.sendMessage("974237816034848871", {
      content: "Hello",
      embeds: [embed],
      components: [components],
    });
    return interaction.reply({ content: "hello", ephemeral: true });
  }
);

export const commands = new Collection<string, Command>([
  ping.asItem(),
  masg.asItem(),
]);

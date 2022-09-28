import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { PayloadHandler } from ".";

export default new PayloadHandler("0xsnapshot", async (p) => {
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
  return {
    content: "Hello",
    embeds: [embed],
    components: [components],
  };
});

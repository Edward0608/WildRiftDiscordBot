const Discord = require("discord.js");

module.exports = {
  name: "pause",
  description: "Pune pauza la muzica!",
  botpermissions: ["ADMINISTRATOR"],
  developersOnly: false,
  toggleOff: false,
  run: async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if (!VoiceChannel)
      return message.reply("⛔ | Trebuie sa fii intr-un canal audio!");

    const queue = await client.distube.getQueue(VoiceChannel);
    if (!queue) return message.channel.send(`⛔ | Nu este nimc in lista!`);

    const pause_embed = new Discord.MessageEmbed()
      .setColor("#FF69B4")
      .setDescription(`⏸️ | Melodia a fost pusa pe pauza!`);

    try {
      await queue.pause(VoiceChannel);

      return message.reply({ embeds: [pause_embed] });
    } catch (e) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`⛔ | ${e}`);
      return message.reply({ embeds: [errorEmbed] });
    }
  },
};

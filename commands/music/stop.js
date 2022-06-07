const Discord = require("discord.js");

module.exports = {
  name: "stop",
  description: "Opreste si deconecteaza muzica!",
  botpermissions: ["ADMINISTRATOR"],
  developersOnly: false,
  toggleOff: false,
  run: async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if (!VoiceChannel)
      return message.reply("⛔ | Trebuie sa fii intr-un canal audio!");

    const queue = await client.distube.getQueue(VoiceChannel);
    if (!queue) return message.channel.send(`⛔ | Nu este nimic in lista!`);

    const stop_embed = new Discord.MessageEmbed()
      .setColor("#FF69B4")
      .setDescription("⏹️ | Muzica a fost oprita!");

    try {
      await queue.stop(VoiceChannel);

      return message.reply({ embeds: [stop_embed] });
    } catch (e) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`⛔ | ${e}`);
      return message.reply({ embeds: [errorEmbed] });
    }
  },
};

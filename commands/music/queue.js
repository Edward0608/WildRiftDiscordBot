const Discord = require("discord.js");

module.exports = {
  name: "queue",
  description: "Vizualizeaza lista de melodii care ruleza acum.",
  botpermissions: ["ADMINISTRATOR"],
  developersOnly: false,
  toggleOff: false,
  run: async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if (!VoiceChannel)
      return message.reply("⛔ | Trebuie sa fii intr-un canal audio!");

    const queue = await client.distube.getQueue(VoiceChannel);
    if (!queue) return message.channel.send(`⛔ | Nu este nimc in lista!`);

    try {
      const queue_embed = new Discord.MessageEmbed()
        .setColor("#FF69B4")
        .setDescription(
          `${queue.songs.map(
            (song, id) =>
              `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
          )}`
        );

      return message.reply({ embeds: [queue_embed] });
    } catch (e) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`⛔ | ${e}`);
      return message.reply({ embeds: [errorEmbed] });
    }
  },
};

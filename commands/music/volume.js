const Discord = require("discord.js");

module.exports = {
  name: "volume",
  description: "Schimba volumul!",
  botpermissions: ["ADMINISTRATOR"],
  usage: "<number>",
  developersOnly: false,
  toggleOff: false,
  run: async (client, message, args) => {
    const Volume = parseInt(args[0]);
    if (isNaN(Volume)) return message.reply("⛔ | Nu ati introdus un numar!");
    const VoiceChannel = message.member.voice.channel;
    if (!VoiceChannel)
      return message.reply("⛔ | Trebuie sa fii intr-un canal audio!");

    const volume1_embed = new Discord.MessageEmbed()
      .setColor("#FF69B4")
      .setDescription("⛔ | Trebuie sa specificati un numar intre 1 si 100!");

    const volume2_embed = new Discord.MessageEmbed()
      .setColor("#FF69B4")
      .setDescription(`🔊 | Volumul a fost setat la: \`${Volume}%\``);

    try {
      if (Volume > 100 || Volume < 1)
        return message.reply({ embeds: [volume1_embed] });

      client.distube.setVolume(VoiceChannel, Volume);
      return message.reply({ embeds: [volume2_embed] });
    } catch (e) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`⛔ | ${e}`);
      return message.reply({ embeds: [errorEmbed] });
    }
  },
};

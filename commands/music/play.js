const Discord = require("discord.js");

module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Asculta muzica de pe YouTube, Spotify sau Soundcloud",
  botpermissions: ["ADMINISTRATOR"],
  usage: "<song_name> | <url>",
  developersOnly: false,
  toggleOff: false,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string) return message.reply("⛔ | Nici un name/url introdus!");
    const VoiceChannel = message.member.voice.channel;
    if (!VoiceChannel)
      return message.reply("⛔ | Trebuie sa fii intr-un canal audio!");

    const queue = await client.distube.getQueue(VoiceChannel);

    const play_embed = new Discord.MessageEmbed()
      .setColor("#FF69B4")
      .setDescription(`🎶 | Melodia a fost adaugata!`);

    try {
      client.distube.playVoiceChannel(VoiceChannel, string, {
        member: message.member,
        textChannel: message.channel,
        message,
      });
      return message.reply({ embeds: [play_embed] });
    } catch (e) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`⛔ | ${e}`);
      return message.reply({ embeds: [errorEmbed] });
    }
  },
};

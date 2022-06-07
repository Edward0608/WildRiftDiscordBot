const Discord = require("discord.js");

module.exports = {
  name: "loop",
  description: "Activeaza repetarea!",
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
      if (!args[0])
        return message.reply(
          `Specifica modul. Exemple \`*loop song\`, \`*loop queue\` or \`*loop off\``
        );
      let mode = null;
      switch (args[0]) {
        case "off":
          mode = 0;
          break;
        case "song":
          mode = 1;
          break;
        case "queue":
          mode = 2;
          break;
      }
      mode = queue.setRepeatMode(mode);
      mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";

      const loop_embed = new Discord.MessageEmbed()
        .setColor("#FF69B4")
        .setDescription(`🔁 | Modul repetarii este setat pe: ${mode}!`);

      return message.reply({ embeds: [loop_embed] });
    } catch (e) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`⛔ | ${e}`);
      return message.reply({ embeds: [errorEmbed] });
    }
  },
};

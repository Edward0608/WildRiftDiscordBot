const client = require("../index");
const Discord = require("discord.js");

const status = (queue) =>
  `Volum: \`${queue.volume}%\` | Filtre: \`${
    queue.filters.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "Intreaga lista"
        : "Aceasta melodie"
      : "Off"
  }\``;

client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#FF69B4")
          .setDescription(
            `▶️ | Playing \`${song.name}\` - \`${
              song.formattedDuration
            }\`\n\n  Adaugata de catre: ${song.user}\n\n${status(queue)}`
          ),
      ],
    })
  )
  .on("addSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#FF69B4")
          .setDescription(
            `🎶 | Adaugat **${song.name} - \`${song.formattedDuration}\`** de catre: ${song.user}`
          ),
      ],
    })
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#FF69B4")
          .setDescription(
            `🎶 | Adaugat \`${playlist.name}\` playlist (${
              playlist.songs.length
            } songs) in queue\n\n${status(queue)}`
          ),
      ],
    })
  )
  .on("error", (channel, e) => {
    channel.send(`⛔ | O eroare neasteptata: ${e.toString().slice(0, 1974)}`);
    console.error(e);
  })
  .on("empty", (queue) =>
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setDescription("🎧 | Canalul audio este gol! Am plecat..."),
      ],
    })
  )
  .on("searchNoResult", (message, query) =>
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`⛔ | Nici un rezultat gasit pentru: \`${query}\`!`),
      ],
    })
  )
  .on("finish", (queue) =>
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#FF69B4")
          .setDescription(`Terminat!`),
      ],
    })
  );

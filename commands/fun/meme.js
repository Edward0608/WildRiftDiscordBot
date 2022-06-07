const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const { clientname, clientavatar } = require("../../botconfig/main.json");

module.exports = {
    name: "meme",
    description: "Random meme image!",
    botpermissions: ["ADMINISTRATOR"],
    usage: "<user>",
    cooldowns: 0,
    developersOnly: false,
    toggleOff: false,
    run: async (client, message, args) => {
        const subReddits = ["dankmemes", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
  
        const img = await randomPuppy(random);
  
        const meme = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Your meme.`)
        .setURL(`https://reddit.com/r/${random}`)
        .setFooter(`${clientname}`, `${clientavatar}`)
        .setTimestamp();
        message.channel.send({ embeds: [meme] })
    },
};
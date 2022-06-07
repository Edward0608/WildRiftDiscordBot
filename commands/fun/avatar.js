const Discord = require("discord.js");
const { clientname, clientavatar } = require("../../botconfig/main.json");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    description: "See your avatar!",
    botpermissions: ["ADMINISTRATOR"],
    usage: "<user>",
    cooldowns: 0,
    developersOnly: false,
    toggleOff: false,
    run: async (client, message, args) => {
        let user;

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        } else {
            user = message.author;
        }

        let avatar = user.displayAvatarURL({ size: 2048, dynamic: true });

        const av = new Discord.MessageEmbed()
            .setTitle(`${user.tag} avatar`)
            .setDescription(`[Avatar URL from ${user.tag}](${avatar})`)
            .setColor("#FF69B4")
            .setImage(avatar)
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();
        message.channel.send({ embeds: [av] })
    },
};
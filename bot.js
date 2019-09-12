const Discord = require('discord.js');
const client = new Discord.Client();
const bot = client;
const fs = require("fs");
module.exports.run = async () => {
	const client = new Discord.Client({ disableEveryone: true, fetchAllMembers: true });
	client.on("ready", async () => {
		client.user.setPresence({ game: { type: 3, name: "Kashi Suggestions" }, status: "online" });
		console.log(`${client.user.tag} has started!`);
 	});
	client.on("message", async (message) => {

		if (message.author.bot) return;

		let prefix = ";";

		if (message.content.indexOf(prefix) !== 0) return;


		let messageArray = message.content.split(" ");
		let cmd = messageArray.shift();
		let args = messageArray;

		let commandfile = client.commands.get(cmd.slice(prefix.length));
		if (commandfile) commandfile.run(client, message, args);
	});
	client.login(process.env.BOT_T0KEN);
};
this.run();


module.exports.run = async (bot, message) => {
	const m = await message.channel.send("Pinging...");
	m.edit(`Pong! Latency is **${m.createdTimestamp - message.createdTimestamp}ms**! API Latency is **${Math.round(bot.ping)}ms**!`);
};

const Discord = require('discord.js');
const client = new Discord.Client();
const bot = client;
const config = require('./config.json');
const fs = require("fs");
let promptopen = false;
let promptid = 0;
let pstage = 0;
let p1 = "";
let p2 = "";

let rpromptopen = false;
let rpromptid = 0;
let rpstage = 0;
let rp1 = "";
let rp2 = "";
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
	
	 if (message.content.startsWith(prefix + "suggest")) {
      if (promptopen === false && promptid !== message.author.id) {
          promptopen = true;
          promptid = message.author.id;
      } else {
	  message.channel.send(config.prompt_active_err)
      }
  }
if (promptopen === true && promptid === message.author.id) {
      pstage = pstage + 1;
      if (message.content === 'cancel' || message.content === 'Cancel') {message.channel.send("Cancelled prompt."); promptopen = false; pstage = 0; promptid = 0;}
      if (promptopen === false) return;
      if (pstage === 1) {
	      message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion",
   				    value: "🗣 Send suggestions with this command! Abuse of this command may lead to consequences. \n\nSay anything to continue. \nSay **cancel** to cancel."
 		 		    },
  				],
				}
			});
      } else if (pstage === 2) {
          message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion",
   				    value: "❔ What should the **title** of your suggestion be? \n\nState your answer to continue. \nSay **cancel** to cancel."
 		 		    },
  				],
				}
			});
      } else if (pstage === 3) {
          p1 = message.content;
          message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion",
   				    value: "❔ What should the **description** be? \n\nState your answer to continue. \nSay **cancel** to cancel."
 		 		    },
  				],
				}
			});
      } else if (pstage === 4) {
	      p2 = message.content;
	      message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion",
   				    value: "Your submission has been sent. \n\nPreview:"
 		 		    },
					 {
						 name: p1,
						 value: p2
						 }
  				],
				}
			});
	      client.guilds.get('597859617862582273').channels.get('498640427646189597').send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Suggestion Sumbitted",
   				    value: "Sent by " + message.author.tag
 		 		    },
					 {
						 name: p1,
						 value: p2
						 }
  				],
				}
			});
          promptopen = false;
          promptid = 0;
          pstage = 0;
	  p1 = "";
	  p2 = "";
      }
  }

	client.login(process.env.BOT_T0KEN);
};
this.run();

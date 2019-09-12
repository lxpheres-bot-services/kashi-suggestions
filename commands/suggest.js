const Discord = require('discord.js');
const client = new Discord.Client();
const bot = client;
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
client.on("message", async message => {
 const cont = message.content;
 if (cont.startsWith(prefix + "suggest")) {
      if (promptopen === false && promptid !== message.author.id) {
          promptopen = true;
          promptid = message.author.id;
      } else {
	  message.channel.send("You are already in an active prompt!")
      }
  }
if (promptopen === true && promptid === message.author.id) {
      pstage = pstage + 1;
      if (cont === 'cancel' || cont === 'Cancel') {message.channel.send("Cancelled prompt."); promptopen = false; pstage = 0; promptid = 0;}
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
          p1 = cont;
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
	      p2 = cont;
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
module.exports.help = {
	name: "suggest",
	usage: "suggest (then follow steps)",
	description: "Suggestion command",
	longdes: "Suggestion command.",
	mentionedperm: "None",
	category: "Utility"
	}
	});

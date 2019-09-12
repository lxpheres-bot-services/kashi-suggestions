module.exports.run = async (client, message, args) => {
const Discord = require('discord.js');
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
let prefix = ";";
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
	      client.guilds.get('597859617862582273').channels.get('621451133592010782').send({embed: {
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
});
}
module.exports.help = {
	name: "suggest",
	usage: "help [command]",
	description: "sends all server commands",
	longdes: "Sends a list of all the command to the user who ran the command. This will show details about a command if said.",
	mentionedperm: "none",
	category: "Utility"
};

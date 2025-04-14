require('dotenv').config();

const express = require("express")
const expressapp = express()
const mongoose = require("mongoose")

expressapp.listen(3000, {})

expressapp.get("/", (req, res) => {
  res.send("Hello world!")


})


const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');


const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMembers, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
] });

client.commands = new Collection();

// const { channel } = require('diagnostics_channel');
// const { Client, IntentsBitField, User, TextInputStyle, userMention} = require("discord.js")


client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


// const client = new Client({
//   intents: [
//     IntentsBitField.Flags.Guilds,
//     IntentsBitField.Flags.GuildMembers,
//     IntentsBitField.Flags.GuildMessages,
//     IntentsBitField.Flags.MessageContent,
//   ],

// })








let ChannelsFetched = false


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));

}

// module.exports = sleep;


const { EmbedBuilder } = require("discord.js")
// const { title } = require('process');
// const { deserialize } = require('v8');

let runtime = {
  hours : 0,
  mins : 0,
  seconds : 0

}

// module.exports = runtime

function RuntimeEmbedFunc(time) {
const RuntimeEmbed = new EmbedBuilder()
      .setColor("#26a639")
      .setTitle("Runtime")
      .addFields(
        { name: "Hours", value: `${time.hours}`, inline: true},
        { name: "Minutes", value: `${time.mins}`, inline: true},
        { name: "Seconds", value: `${time.seconds}`, inline: true},
      );
return RuntimeEmbed
    }
// Maybe lets the codespace stay active
function stayactive() {
  const Embed = RuntimeEmbedFunc(runtime)
  const GithubChannel = client.channels.cache.get("1354492831103844454")
  GithubChannel.send({embeds: [Embed]})
}



let botIsReady = false






// Runs when the client(Bot) is online
client.on('ready', (c) => {
  console.log("Bot is ready for use.");
  botIsReady = true
  ChannelsFetched = true
  
  setInterval(RuntimeFunc, 1000)
  
  

})

function RuntimeFunc() {
if (runtime.seconds === 59) {
  runtime.seconds = 0
  if (runtime.mins === 59 ) {
    runtime.mins = 0
    runtime.hours += 1

  }
  else {
  runtime.mins += 1}
}
else {
runtime.seconds += 1
}
let TimePassed = 0

TimePassed = TimePassed + 1
if (TimePassed === 10) {
  stayactive()
}


}
 
// function EmbedCreator(AuthorText, AuthorAvUrl, Title, Description, Color, Fields) {
//   const fields = [
//     { name: "test", value: "Test2", inline: true}
//   ];

// const embed = new EmbedBuilder()
// .setAuthor({name: AuthorText, iconURL: AuthorAvUrl})
// .setTitle(Title)
// if (!Description === undefined) {embed.setDescription(Description)} else return;
// embed.setColor(Color)
// if (Color === null) {embed.setColor('random')} else {embed.setColor(Color)}
// if (!Fields === null) {embed.addFields(fields)}
// embed.setTimestamp()


// return embed;
// }



client.on('invalidated', () => {
  console.log('Session invalidated. Reconnecting...');
  client.destroy();
  client.login(process.env.TOKEN);
});



function EmbedCreator(AuthorText, AuthorAvUrl, Title, Description, Color, Fields) {
  // If no Fields are passed, we initialize it with default data


  // Create the embed
  const embed = new EmbedBuilder()
    .setAuthor({ name: AuthorText, iconURL: AuthorAvUrl })
    .setTitle(Title);

  // Add Description if provided
  if (Description) {
    embed.setDescription(Description);
  }

  // Set Color, use 'RANDOM' if no color is provided
  if (Color) {
    embed.setColor(Color);
  } else {
    embed.setColor('Random'); // You can also use 'Random' instead of 'random' if you want a random color
  }

  // Add fields if provided, else use default fields
  if (Fields && Array.isArray(Fields)) {
    embed.addFields(Fields);
  }

  // Set timestamp
  embed.setTimestamp();

  return embed;
}

module.exports = { EmbedCreator, runtime, sleep};


// client.on('interactionCreate', (interaction) => {
//   if (!interaction.isChatInputCommand()) return;
//   if (interaction.commandName === 'time') {
//     const Embed = RuntimeEmbedFunc(runtime)
//     interaction.reply({embeds: [Embed]})
//   }
// })


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});










client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'roleid') {
    const role = interaction.options.getRole('roleid', true).id
    interaction.reply(role)
  }
})

client.login(process.env.TOKEN)
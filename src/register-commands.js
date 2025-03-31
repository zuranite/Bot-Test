require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { describe } = require('node:test');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  }, {
    name : 'time',
    description: 'Shows bot runtime.'
  },

];



const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {

  try {

    console.log("Registering Commands")

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID ), { body: commands} )

    


    console.log("Successfully registered commands")

  } catch (error) {
    console.log(error);
  }


})()

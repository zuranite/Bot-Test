require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { describe } = require('node:test');
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  }, {
    name : 'time',
    description: 'Shows bot runtime.'
  },
  {
    name: 'roleid',
    description: 'Role id',
    

  },
]

const data = [new SlashCommandBuilder()
  .setName("test")
  .setDescription('roleid')
  .addRoleOption(option => option.setName('roleid').setDescription('test')),
  new SlashCommandBuilder().setName('time').setDescription('Shows bot runtime')
]


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {

  try {

    console.log("Registering Commands")

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: data})

    


    console.log("Successfully registered commands")

  } catch (error) {
    console.log(error);
  }


})()

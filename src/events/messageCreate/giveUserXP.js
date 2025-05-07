const { Client, Message} = require("discord.js")
const Level = require("../../Models/Level.js")
const LevelXP = require("../../utils/LevelXP.js")
const cooldowns = new Set();
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


function randomXP(minimum, maximum) {
    minimum = Math.ceil(minimum)
    maximum = Math.floor(maximum)
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

module.exports = async (client, message) => {
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id) || message.guild.id !== process.env.ZURA_WORKS ) return;

    const daXPtoGive = randomXP(40, 60)

    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };


    try {
        const level = await Level.findOne(query)

        if (level) {
            level.xp += daXPtoGive
        

        if (level.xp > LevelXP(level.level)) {
            level.xp = 0;
            level.level += 1;


            message.channel.send(`${message.member} Ur fatass has leveled up to **level ${level.level}**. Now go touch some grass discordian`)
        }
        await level.save().catch((error) => {
            console.log(`Error saving this bitches LEVEL: ${error}`)
            return;
        })
        cooldowns.add(message.author.id)
        setTimeout(() => {
            cooldowns.delete(message.author.id)
        }, 15000)


        } else {
            const newLevelData = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: daXPtoGive,
            })
            await newLevelData.save().catch((err) => {
                console.log(`Error saving new level data entry 😢: ${err}`)
            })
        }
    
        
    } catch (err) {
        console.log(`We got an error giving xp: ${err}`)
    }
}
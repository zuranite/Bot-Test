const { EmbedBuilder } = require('discord.js')

function EmbedCreator(AuthorText, AuthorAvUrl, Title, Description, Color, Fields, Timestamp) {
    // If no Fields are passed, we initialize it with default data
  
  
    // Create the embed
    const embed = new EmbedBuilder()
      if (AuthorText && AuthorAvUrl){
        embed.setAuthor({ name: AuthorText, iconURL: AuthorAvUrl })
      
      }
      if (Title) {
      embed.setTitle(Title);
      }
  
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
    if (Timestamp) {
    embed.setTimestamp();
    }
    return embed;
  }
  
module.exports =  { EmbedCreator }
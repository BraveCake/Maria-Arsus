const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('del')
    .setDescription('deletes given number of messages')
    .addIntegerOption(option =>
      option.setName('number')
        .setDescription('number of messages to be deleted')
        .setRequired(true)),
  
  async execute(interaction) {
    const amount = interaction.options.getInteger('number');
    try {
        const messages = await interaction.channel.bulkDelete(amount + 1);
        interaction.reply({ content: `Successfully deleted ${messages.size - 1} messages.`, ephemeral: true });
    } 
    catch (error) {
        console.error('Error deleting messages:', error);
        interaction.reply({ content: 'An error occurred while trying to delete the messages.', ephemeral: true });
    }
  }
};
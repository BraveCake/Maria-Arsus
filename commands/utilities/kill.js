const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('kills the bot'),

  async execute(interaction) {
    // Check if the command issuer has admin access
    const isAdmin = interaction.member.permissions.has('ADMINISTRATOR');

    if (!isAdmin) {
      return await interaction.reply('You do not have the necessary permissions to use this command.');
    }


    try {
      await interaction.reply('Shutting down...');
      // Perform any cleanup or additional tasks before shutting down
      console.log('Bot is shutting down.');
      process.exit(); // Exit the Node.js process
    }
    catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while shutting the bot down');
    }
  }
};

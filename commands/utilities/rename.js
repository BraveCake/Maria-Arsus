const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rename')
    .setDescription('Change the nickname of the targeted user in the guild.')
    .addUserOption(option => // Changed to addUserOption for targeting users
      option.setName('target')
        .setDescription('The targeted user you want to change the nickname of.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('name')
        .setDescription('New nickname for the user.')
        .setRequired(true)),

  async execute(interaction) {
    // Check if the command issuer has admin access
    const isAdmin = interaction.member.permissions.has('ADMINISTRATOR');

    if (!isAdmin) {
      return await interaction.reply('You do not have the necessary permissions to use this command.');
      return;
    }

    // Get the target user and new nickname from options
    const targetUser = interaction.options.getMember('target');
    const newNickname = interaction.options.getString('name');

    try {
      // Change the nickname of the targeted user
      await interaction.guild.members.fetch(targetUser.id) // Ensure we have the latest data
      .then(member => member.setNickname(newNickname));

      // Reply with a success message
      await interaction.reply(`Successfully changed the nickname of ${targetUser.user.username} to ${newNickname}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while changing the nickname.');
    }
  }
};
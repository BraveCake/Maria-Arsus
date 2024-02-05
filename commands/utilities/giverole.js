const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giverole')
    .setDescription('Give a role to a specific user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The targeted user you want to give the role to.')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role you want to give')
        .setRequired(true)),

  async execute(interaction) {
    // Check if the command issuer has admin access
    const isAdmin = interaction.member.permissions.has('ADMINISTRATOR');

    if (!isAdmin) {
      return await interaction.reply('You do not have the necessary permissions to use this command.');
    }

    // Get the target user and role from options
    const targetUser = interaction.options.getMember('target');
    const roleToGive = interaction.options.getRole('role');

    try {
      // Add the specified role to the targeted user
      await targetUser.roles.add(roleToGive);

      // Reply with a success message
      await interaction.reply(`Successfully gave the role ${roleToGive.name} to ${targetUser.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while giving the role.');
    }
  }
};

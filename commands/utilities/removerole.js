const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('removes a role from a specific user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The targeted user you want to remove his role.')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role you want to strip')
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
      // remove the specified role from the targeted user roles
      await targetUser.roles.remove(roleToGive);

      // Reply with a success message
      await interaction.reply(`Successfully removed the role ${roleToGive.name} from ${targetUser.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while giving the role.');
    }
  }
};

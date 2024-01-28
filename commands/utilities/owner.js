const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('owner')
    .setDescription('Shows who the server owner is'),

  async execute(interaction) {
    // Check if the command issuer has admin access
    const isAdmin = interaction.member.permissions.has('ADMINISTRATOR');

    if (!isAdmin) {
      return await interaction.reply('You do not have the necessary permissions to use this command.');
    }

    // Check if interaction.guild is defined
    if (!interaction.guild) {
      return await interaction.reply('This command can only be used in a server.');
    }

    // Get the server owner
    const owner = await interaction.guild.fetchOwner();

    // Check if owner is defined
    if (!owner) {
      return await interaction.reply('Unable to determine the server owner.');
    }

    // Generate an embed with the server owner's avatar as a thumbnail
    const thumbnailEmbed = {
      color: 0x3498db, // You can set the color to your preference
      author: {
        name: "" + owner.displayName,
        icon_url: owner.displayAvatarURL({ dynamic: true }),
      },
      thumbnail: {
        url: owner.displayAvatarURL({ dynamic: true }),
      },
      title: 'Server Owner Thumbnail',
      description: `This is the avatar of the server owner, ${owner.user.username}.`,
    };

    // Reply with the embed
    await interaction.reply({ embeds: [thumbnailEmbed] });
  }
};

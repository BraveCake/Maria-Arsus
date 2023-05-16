const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Replies with passed!'),
  async execute(interaction) {
    await interaction.reply('passed');
  },
};
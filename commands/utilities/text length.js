const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('textlength')
    .setDescription('Replies with the length of your text!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input that you want to know its length')
        .setRequired(true)),
  
  async execute(interaction) {
    await interaction.reply(interaction.options.get('input').value.length.toString());
  }
};
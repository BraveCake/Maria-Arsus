const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rgb2hex')
    .setDescription('converts your RGB color into hex')
    .addIntegerOption(option =>
      option.setName('r')
        .setDescription('Red value')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('g')
        .setDescription('Green value')
        .setRequired(true)).addIntegerOption(option =>
      option.setName('b')
        .setDescription('Blue value')
        .setRequired(true)),
  
  async execute(interaction) {
    const hexResult = ("#"+interaction.options.getInteger('r').toString(16)+interaction.options.getInteger('g').toString(16)+interaction.options.getInteger('b').toString(16)).toUpperCase();
    await interaction.reply(`The hex value is: ${hexResult}`);
  }
};
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hex2rgb')
    .setDescription('converts your hex color into rgb')
    .addStringOption(option =>
      option.setName('hex')
        .setDescription('hex value')
        .setRequired(true)),
  
  async execute(interaction) {
    const hexValue = interaction.options.getString('hex').replace('#','');
    const rgbValue = parseInt(hexValue.slice(0,2),16)+" "+parseInt(hexValue.slice(2,4),16)+" "+parseInt(hexValue.slice(4),16);
    await interaction.reply(`The RGB value is: ${rgbValue}`);
  }
};
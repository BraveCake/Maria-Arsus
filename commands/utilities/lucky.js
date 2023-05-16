const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lucky')
    .setDescription('generates a random number within a specific range of numbers')
    .addIntegerOption(option =>
      option.setName('number1')
        .setDescription('start range/ end range if number2 not provided')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('number2')
        .setDescription('end range if not provided the default start range is 1')
        .setRequired(false)),
  
  async execute(interaction) {
    const number1 = interaction.options.getInteger('number1');
    const number2 = interaction.options.getInteger('number2');

    let result;
    if (number2) {
      result = Math.random()*number2+number1
    } else {
      result = Math.random()*number1
    }

    await interaction.reply(`The lucky number is: ${Math.floor(result)}`);
  }
};
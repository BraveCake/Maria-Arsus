const { SlashCommandBuilder } = require('discord.js');
const { translate } = require('@vitalets/google-translate-api');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('translates a text from a given language to English or another if specified')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('text you want to translate')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('target')
        .setDescription('language you want to translate into')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('source')
        .setDescription('original language of the text')
        .setRequired(false)),

  async execute(interaction) {
    const text = interaction.options.getString('text');
    const targetLanguage = interaction.options.getString('target') ?? "en";
    const sourceLanguage = interaction.options.getString('source');
    console.log(text);
    let options;
    if (sourceLanguage) {
      options = { from: sourceLanguage, to: targetLanguage };
    } else {
      options = { to: targetLanguage };
    }
    const translatedText = (await translate(text, options)).text;
    await interaction.reply(`Translation: ${translatedText}`);
  }
};
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('The question for the poll')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('option0')
        .setDescription('Option 0')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('option1')
        .setDescription('Option 1')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('option2')
        .setDescription('Option 2')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option3')
        .setDescription('Option 3')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option4')
        .setDescription('Option 4')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option5')
        .setDescription('Option 5')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option6')
        .setDescription('Option 6')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option7')
        .setDescription('Option 7')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option8')
        .setDescription('Option 8')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option9')
        .setDescription('Option 9')
        .setRequired(false)),
  
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [];
    const emojis = []; //numeric emojis from 0:9

    for (let i = 0; i <= 9; i++) {
      const option = interaction.options.getString(`option${i}`);
      if (option) {
        options.push(option);
        emojis.push(`${i}\u20E3`);
      }
    }

    // Handle the poll creation using the question and options
    // ...

    const pollMessage = `**${question}**\n\n${options.map((option, index) => `${emojis[index]} ${option}`)}`;
    const reply = await interaction.reply({
      content: pollMessage,
      fetchReply: true,
    });
    console.log(reply);

    for (let i = 0; i < options.length; i++) {
      await reply.react(emojis[i]);
    }
  }
};

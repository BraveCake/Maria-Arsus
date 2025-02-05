const { SlashCommandBuilder } = require('discord.js');
const OpenAI = require('openai');
require('dotenv').config();
const AI_TOKEN = process.env.AI_TOKEN;
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: AI_TOKEN
  }
);
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask an AI model a question')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('Your question')
        .setRequired(true)),
  
    async execute(interaction) {
      const question = interaction.options.getString('input');
      interaction.deferReply();
      console.log("The question is:");
      console.log(question+"\n");
      const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
        "role": "user",
        "content": question
        }
      ]
      });
      const answer = completion.choices[0].message; 
      await interaction.editReply(answer);
  }
};

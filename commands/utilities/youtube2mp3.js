const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { MessagePayload } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('youtube2mp3')
    .setDescription('Converts your video into mp3 file')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('youtube video url you want to convert into mp3')
        .setRequired(true)),

  async execute(interaction) {
    const videoUrl = interaction.options.get('url').value;
    const videoID = ytdl.getURLVideoID(videoUrl);
    const videoTitle = (await ytdl.getInfo(videoID)).videoDetails.title;
    const filePath = `audio/${videoTitle}.mp3`;
    const stream = ytdl(videoUrl, { filter: 'audioonly' }).pipe(fs.createWriteStream(filePath));
   await new Promise(resolve => stream.on("finish", resolve)); 
    await  interaction.deferReply();
    await interaction.editReply({ content: 'Here is the file you requested:', files: [filePath] });
  fs.unlinkSync(filePath);


  }
};
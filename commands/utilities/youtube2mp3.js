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
    await interaction.deferReply();
    const videoUrl = interaction.options.get('url').value;
	  try{
      const videoID = ytdl.getURLVideoID(videoUrl);
      const videoTitle = (await ytdl.getInfo(videoID)).videoDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filePath = `audio/${videoTitle}.mp3`;
      const stream = ytdl(videoUrl, { filter: 'audioonly' }).pipe(fs.createWriteStream(filePath));
      await new Promise(resolve => stream.on("finish", resolve));
      await interaction.editReply({ content: 'Here is the file you\'ve requested:', files: [filePath] });
      fs.unlinkSync(filePath);
    }
    catch({name,msg}){
      console.log(`an error ${name} has occurred ${msg}`);
     }
  }
};

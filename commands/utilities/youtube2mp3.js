const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { YtDlp } = require('ytdlp-nodejs');
const { createWriteStream } = require('fs');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const sanitize = require('sanitize-filename');
const ytdlp = new YtDlp();

const pipeline = promisify(stream.pipeline);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('youtube2mp3')
    .setDescription('Download YouTube audio as mp3')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('The YouTube video URL')
        .setRequired(true)
    ),

  async execute(interaction) {
    const url = interaction.options.getString('url');
    await interaction.reply(`🎶 Downloading audio from: ${url}`);

    try {
      // Fetch video info to get the title
      const rawTitle = await ytdlp.getTitleAsync(url);
      const safeTitle = sanitize(rawTitle) || `audio-${Date.now()}`;
      const outputFile = path.join(__dirname, '..', '..', 'audio', `${safeTitle}.mp3`);

      // Download and save the audio stream
      const audioStream = ytdlp.stream(url, {
        format: {
          filter: 'audioonly',
          type: 'mp3',
          quality: 'highest',
        },
        onProgress: (progress) => {
          console.log(progress);
        },
      });

      const fileStream = createWriteStream(outputFile);
      await audioStream.pipeAsync(fileStream);


      // Create an attachment and send it to Discord
      await interaction.editReply({
        content: `✅ Download complete: \`${safeTitle}\``,
        files: [outputFile],
      });
	  fs.unlinkSync(outputFile);

    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: '❌ Failed to download audio. Check the console for errors.',
      });
    }
  },
};

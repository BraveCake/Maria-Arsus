const { SlashCommandBuilder } = require('discord.js');
const { YtDlp } = require('ytdlp-nodejs');
const ytdlp = new YtDlp();
const { PassThrough } = require('stream');
const {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('plays music')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('youtube video url of the song')
        .setRequired(true)),

  async execute(interaction) {
    const url = interaction.options.getString('url');
    if (!url) {
      throw new Error('Please specify a song URL.');
    }

    const channel = interaction.guild.members.cache.get(interaction.member.user.id).voice.channelId;
    const connection = await joinVoiceChannel({
      channelId: channel,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    const streamPipe = ytdlp.stream(url, {
        format: {
          filter: 'audioonly',
          type: 'mp3',
          quality: 'highest',
        },
        onProgress: (progress) => {
          console.log(progress);
        },
      });
	const stream = new PassThrough();
	await streamPipe.pipe(stream);
    const player = createAudioPlayer();
    const resource = createAudioResource(stream);
    connection.subscribe(player);
    player.play(resource);
    player.on('error', (error) => console.error(error));
    interaction.reply("Playing music now ");


  }
}

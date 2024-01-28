const { SlashCommandBuilder } = require('discord.js');
const {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');

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
    const stream = await ytdl(url, { filter: 'audioonly' });
    const player = createAudioPlayer();
    const resource = createAudioResource(stream);
    connection.subscribe(player);
    player.play(resource);
    player.on('error', (error) => console.error(error));
    interaction.reply("Playing music now ");


  }
}
const { SlashCommandBuilder } = require('discord.js');
const dbClient = require('../../database-client.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('notify')
    .setDescription('Notification assitance system').addSubcommand(subCommand=>
      subCommand.setName('me')
  .setDescription('Notifies you when a certain amount of time has passed')
  .addIntegerOption(option =>
    option.setName('hours')
      .setDescription('total hours')
      .setRequired(false))
  .addIntegerOption(option =>
    option.setName('minutes')
      .setDescription('minutes')
      .setRequired(false))
  .addStringOption(option =>
    option.setName('message')
      .setDescription('Optional message')
      .setRequired(false))
    ).addSubcommand(subCommand=>
      subCommand.setName('cancel')
  .setDescription('Cancels a notify subscription by ID')
  .addIntegerOption(option =>
    option.setName('id').setDescription('The ID of the subscription to cancel')
.setRequired(true))
)
  ,
  async execute(interaction) {
        if (interaction.options.getSubcommand() === 'cancel') {
      const id = interaction.options.getInteger('id');
      try {
        await dbClient.query(`DELETE FROM "NotifySubscriptions" WHERE id = $1`, [id]);
        await interaction.reply(`Subscription with ID ${id} has been canceled.`);
      } catch (error) {
        console.error(error.stack);
        await interaction.reply(`Failed to cancel the subscription with ID ${id}.`);
      }
          return;
        }

    const date = new Date().getTime();//current time&time
    const msg= interaction.options.getString('message');
    const hours = interaction.options.getInteger('hours')??0;
    const minutes = interaction.options.getInteger('minutes')??0;
    const totalMilliseconds=hours*60*60*1000+minutes*60*1000;
    const duration = date+totalMilliseconds;
    options = [interaction.user.id, duration, msg,date];
    let result;
    try {         
       result = await dbClient.query(
        `INSERT INTO "NotifySubscriptions" ("uid", "duration","msg","date")  
             VALUES ($1, $2,$3,$4) RETURNING *`, options); // sends queries
    } catch (error) {
      console.error(error.stack);
    } finally {              
      interaction.reply("Alright I will notify you when the time comes!\n you can cancel that through using /notify cancel "+result.rows[0].id)
    }
  }
};

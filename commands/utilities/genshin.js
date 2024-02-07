const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('genshin')
    .setDescription('genshin related commands')
    .addSubcommand(subcommand =>
		subcommand
			.setName('resets').setDescription('Shows when genshin resets happen (EU) only'))
  ,
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'resets') {
        const remainingTime = getTimeRemaining();
        await interaction.reply(`Time before next daily reset: **${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s**\nTime before next abyss reset: **${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s** `);  
    }
}};


function getTimeRemaining() {
    const now = new Date(); // Current date and time
    const utcNow= new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()); // Convert to UTC
    const month = utcNow.getMonth(); // Current month
    const year = utcNow.getFullYear(); // Current year
    const date = utcNow.getDate(); // Current date
    const hours = utcNow.getHours(); // Current hour
    let targetDay,targetMonth=month,targetYear = year ;
    if (date >= 16 && hours >= 3) {
        targetDay = 1; // Target the 1st day of next month
        targetMonth= month+1;
        if (targetMonth == 12) { // months are from 0 to 11
            targetMonth = 0; // Reset month to January
            targetYear++; // Increment year
        }
    } else if (date >= 1 && hours >= 3) {
        targetDay = 16; // Target the 16th day of current month
    } else {
        targetDay = date >= 16 ? 1 : 16; // If today is 16th or after, target next month's 1st, otherwise target 16th
    }

    const targetDate = new Date(Date.UTC(targetYear, targetMonth, targetDay, 3, 0, 0));

    // Calculate the time remaining until the target date
    const timeRemaining = targetDate - now;
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
        remaining: timeRemaining,
        days: days,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        seconds: secondsRemaining
    };
}
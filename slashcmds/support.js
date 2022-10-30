const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');

module.exports={
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Need help? Join here! \nhttps://discord.gg/X58z9eQGek'),

    async execute(interaction) {
        console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command restart`);

        await interaction.reply({
            embeds: [{
                description: "Need help? Join here! \nhttps://discord.gg/X58z9eQGek\n\nWant to support this project? Message <@928624781731983380> or donate here: https://cash.app/$hoesinmydms"
            }],
            ephemeral: true
        });
    }
};

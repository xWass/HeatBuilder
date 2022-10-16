const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');

module.exports={
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Need support? Join here! \nhttps://discord.gg/X58z9eQGek'),

    async execute(interaction) {
        console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command restart`);

        await interaction.reply({
            embeds: [{
                title: "Need support? Join here! \nhttps://discord.gg/X58z9eQGek"
            }],
            ephemeral: true
        });
    }
};

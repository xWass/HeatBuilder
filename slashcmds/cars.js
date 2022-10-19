const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');

module.exports={
    data: new SlashCommandBuilder()
        .setName('cars')
        .setDescription("Upload a list of all the cars in the game."),

    async execute(interaction) {
        console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command cars`);
        interaction.reply({
            embeds: [{
                title: "Here's a list of all the cars!"
            }]
        })
        interaction.followUp({
            files: [
                "./cars.txt"
            ]
        })

    }
};

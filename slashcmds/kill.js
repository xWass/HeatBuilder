const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');
const execSync=require('child_process').execSync;

module.exports={
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription("Kill the bot's host process."),

    async execute(interaction) {
        console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command bot`);
        let validIds=["176152457284550656", "928624781731983380", "451229130072260608", "312713892893687808"];

        if (!validIds.includes(interaction.member.id)) {
            return interaction.reply({
                embeds: [{
                    title: "You are not allowed to use this command!"
                }],
                ephemeral: true
            });
        }
        await interaction.reply({
            embeds: [{
                title: "Shutting down... \nOnly xWass can save me now..."
            }],
            ephemeral: true
        });

        try {
            execSync('pm2 kill', {encoding: 'utf-8'});
        } catch (err) {
            console.log(err);
        }

    }
};

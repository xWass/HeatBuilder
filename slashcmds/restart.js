const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');
const execSync=require('child_process').execSync;

module.exports={
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restart the bot!'),

    async execute(interaction) {
        console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command restart`);
        let validIds=["176152457284550656", "928624781731983380", "451229130072260608"];

        if (!validIds.includes(interaction.member.id)) {
            interaction.reply({
                embeds: [{
                    title: "You are not allowed to use this command!"
                }],
                ephemeral: true
            });
            return;
        }
        await interaction.reply({
            embeds: [{
                title: "Restarting. See you in 30 seconds!"
            }],
            ephemeral: true
        });

        try {
            execSync('pm2 restart 0', {encoding: 'utf-8'});
        } catch (err) {
            console.log(err);
        }

    }
};

const {
    SlashCommandBuilder
}=require('@discordjs/builders');

module.exports={
    data: new SlashCommandBuilder()
        .setName('usage')
        .setDescription('View bot usage.'),
    async execute(interaction, client) {
        const usage=require('../usage.json');
        interaction.reply({
            embeds: [{
                title: "Command Usage.",
                description: `Build Request: ${ usage.build.count } \nOrchan Build Request: ${ usage.orchan.count }`,
                color: 'GREEN',
            }],
            ephemeral: true
        });
    }
};

const {
    SlashCommandBuilder
}=require('@discordjs/builders');

module.exports={
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Execute a command.')
        .addStringOption(option => option
            .setName('suggestion')
            .setDescription('Feature you are suggesting.')
            .setRequired(true)
        ),
    async execute(interaction, client) {
        const suggestion=interaction.options.getString('suggestion');
        const chan=client.channels.cache.get("1032069301596864582")
        interaction.reply({
            embeds: [{
                title: "Suggestion submitted.",
                color: 'GREEN',
            }],
            ephemeral: true
        })
        chan.send({
            embeds: [{
                description: `\`\`\`${ suggestion }\`\`\``,
                footer: {
                    text: `Suggested by ${interaction.user.tag}`
                },
                color: 'GREEN',
            }],
            ephemeral: false
        })
    }
};

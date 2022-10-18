const {
    SlashCommandBuilder
}=require('@discordjs/builders');
const {exec}=require('child_process');

module.exports={
    data: new SlashCommandBuilder()
        .setName('exec')
        .setDescription('Execute a command.')
        .addStringOption(option => option
            .setName('command')
            .setDescription('Command to execute.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const valid=['928624781731983380'];
        if (!valid.includes(interaction.member.id)) {
            interaction.reply({
                embeds: [{
                    title: 'Error',
                    description: 'You do not have permission to execute commands.',
                    color: 0xFF0000
                }],
                ephemeral: true
            });
            return;
        }
        const comm=interaction.options.getString('command');
        await interaction.deferReply();
        exec((comm), (error, stdout) => {
            if (error) {
                interaction.followUp({
                    embeds: [{
                        title: 'Error',
                        description: `Output: \`\`\`${ error }\`\`\``,

                    }],
                    ephemeral: true
                });
            } else {
                interaction.followUp({
                    embeds: [{
                        title: 'Output',
                        description: `\`\`\`${ stdout||"Completed with no output." }\`\`\``,
                    }],
                    ephemeral: false
                });
            }
        });
    }
};

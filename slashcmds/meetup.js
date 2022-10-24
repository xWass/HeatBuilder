const {SlashCommandBuilder}=require('@discordjs/builders');
const {MessageActionRow, MessageButton}=require('discord.js');
const {readFileSync, writeFileSync}=require('node:fs');

const chalk=require('chalk');

module.exports={
    data: new SlashCommandBuilder()
        .setName('meetup')
        .setDescription("Host a meetup in NFS Heat")
        .addStringOption((option) => option
            .setName("set")
            .setRequired(true)
            .setDescription("Open or close a meetup!")
            .addChoices(
                {name: 'Open', value: 'open'},
                {name: 'Close', value: 'close'},
            )
        ),


    async execute(interaction) {
        console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command meetup`);
        const set=interaction.options.getString('set');

        const meetupJSON=JSON.parse(
            readFileSync('./meetup.json', 'utf-8')
        );
        let validIds=["928624781731983380"];

        if (!validIds.includes(interaction.member.id)) {
            interaction.reply({
                embeds: [{
                    title: "You are not allowed to use this command!"
                }],
                ephemeral: true
            });
            return;
        }

        if (set==="open") {

            if (meetupJSON?.enabled) {
                interaction.reply({
                    embeds: [{
                        title: "Meetup is already open!"
                    }],
                    ephemeral: true
                });
                return;
            }

            const row=new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('join')
                        .setLabel('Join the Meetup')
                        .setStyle('PRIMARY')
            );

            await writeFileSync("./meetup.json", "{ \"enabled\": true }");

            await interaction.reply({
                embeds: [{
                    description: "xWass is hosting a meetup!\nClick the button to join!"
                }],
                components: [row]
            });
            return;

        } else if (set==="close") {

            if (!meetupJSON?.enabled) {
                interaction.reply({
                    embeds: [{
                        title: "Meetup is already closed!"
                    }],
                    ephemeral: true
                });
                return;
            }
            console.log(meetupJSON)
            await writeFileSync("./meetup.json", "{ \"enabled\": false }");
            console.log(meetupJSON)

            await interaction.reply({
                embeds: [{
                    title: "Meetup is now closed"
                }],
                ephemeral: true
            });


        }


    }
};

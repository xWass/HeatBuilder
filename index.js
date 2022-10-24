const fs=require('fs');
const chalk=require('chalk');
const {
    Client, Collection, Intents, MessageEmbed,
}=require('discord.js');
const {readFileSync, writeFileSync} = require('node:fs');

const intents=new Intents();
intents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
);

const client=new Client({intents, partials: ['MESSAGE', 'REACTION'], allowedMentions: {parse: ['users']}});
require('dotenv').config();

client.SlashCommands=new Collection();
const commandFiles=fs.readdirSync('./slashcmds').filter((file) => file.endsWith('.js'));


process.on('unhandledRejection', (error) => {
    console.log(error);
});

const {REST}=require('@discordjs/rest');
const {Routes}=require('discord-api-types/v9');

const commands=[];
for (const file of commandFiles) {
    const command=require(`./slashcmds/${ file }`);
    commands.push(command.data.toJSON());
}

const rest=new REST({version: '9'}).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log(chalk.yellowBright('Started refreshing application [/] commands.'));

        await rest.put(
            Routes.applicationCommands("1029924294207209552"),
            {body: commands},
        );
        console.log(chalk.greenBright('Successfully reloaded application [/] commands.'));
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', async () => {
    client.user.setActivity('your builds!', {type: 'LISTENING'});
});

client.once('ready', async () => {
    for (const file of commandFiles) {
        console.log(`${ chalk.yellowBright('[SLASH COMMAND LOADED]') } ${ file }`);
    }
    console.log(chalk.greenBright('Ready!'));
});
for (const file of commandFiles) {
    const command=require(`./slashcmds/${ file }`);
    client.SlashCommands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {

    if (interaction.isAutocomplete()&&interaction.commandName==="build") {
        const raceBuilds=JSON.parse(
            readFileSync('./builds/track.json', 'utf-8')
        );
        const focusedValue=interaction.options.getFocused();
        const choices=raceBuilds
            .map((raceBuild) =>
                `${ raceBuild["Car"] }`
            );

        if (focusedValue.length <=2) {
            return interaction.respond([])
        }
        const filtered=choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));
        await interaction.respond(
            filtered.map(choice => ({name: choice, value: choice}))
        )
        return;
    } else if (interaction.isAutocomplete()&&interaction.commandName==="orchan") {
        const raceBuilds=JSON.parse(
            readFileSync('./builds/orchanTrack.json', 'utf-8')
        );
        const focusedValue=interaction.options.getFocused();
        const choices=raceBuilds
            .map((raceBuild) =>
                `${ raceBuild.Manufacturer } ​${ raceBuild['Car Name'] }`
            );

        if (focusedValue.length<=2) {
            return interaction.respond([]);
        }
        const filtered=choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));
        await interaction.respond(
            filtered.map(choice => ({name: choice, value: choice}))
        );
        return;
    }
    if (interaction.isButton()&&interaction.customId==='join') {
        const meetupJSON=JSON.parse(
            readFileSync('./meetup.json', 'utf-8')
        );
        if (!meetupJSON.enabled) {
            interaction.reply({
                embeds: [{
                    title: "Meetup is closed!"
                }],
                ephemeral: true
            });
            return;
        }


        console.log(interaction.user.id)
        const user=client.users.cache.get("928624781731983380")
        user.send({
            embeds: [{
                description: `<@${ interaction.user.id }> has joined the meetup!`
            }]
        })
        return;
    }
    
    const command=client.SlashCommands.get(interaction.commandName);
    if (!command) return;
    console.log(`${ chalk.yellowBright('[EVENT FIRED]') } interactionCreate with command ${ interaction.commandName }`);
    
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        interaction.reply({
            embeds: [{
                description: `An error has occurred! Message <@928624781731983380> with this information: \n\`\`\`Command Name: ${interaction.comandName} \nError: ${error}\`\`\``
            }],
            ephemeral: true
        });
    }
});
client.login(process.env.TOKEN);

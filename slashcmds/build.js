const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');

module.exports={
  data: new SlashCommandBuilder()
    .setName('build')
    .setDescription('Search for a car build and type!')
    .addStringOption((option) => option
      .setName('car')
      .setRequired(true)
      .setDescription('Search for a car!')
      .setAutocomplete(true))
    .addStringOption((option) => option
      .setName("type")
      .setRequired(true)
      .setDescription("Select a build type!")
      .addChoices(
        {name: 'Track', value: 'Track'},
        {name: 'Off-Road', value: 'Off-Road'},
        {name: 'Drag', value: 'Drag'},
        {name: 'Drift', value: 'Drift'},
      )
    ),
  async execute(interaction, client) {
    console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command build`);
    const car=interaction.options.getString('car');
    const type=interaction.options.getString('type');
    const carObj=require("../cars.json");
    await interaction.reply({
      embeds: [{
        title: `${ car } | ${ type } Build`,
        description: `ok i need to access this from json`,
        color: 'GREEN',
      }],
      ephemeral: true
    });
  }
};

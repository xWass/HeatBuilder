const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');
const {readFileSync, writeFileSync}=require('node:fs');
const raceBuilds=JSON.parse(
  readFileSync('./raceBuilds.json', 'utf-8')
);


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
    const raceBuild=raceBuilds
      .find((raceBuild_) =>
        `${ raceBuild.Manufacturer } ${ raceBuild['Car Name'] }`===returnedValue
      );

      console.log(raceBuild)
    console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command build`);
    const car=interaction.options.getString('car');
    // const type=interaction.options.getString('type');

    await interaction.reply({
      embeds: [{
        title: `${ car } Build`,
        description: `\`\`\`${ car ||"There is no available build for this selection :( \nWant to add your own? Head to https://github.com/xWass/HeatBuilder/blob/master/cars.json and open a pull request!" }\`\`\``,
        color: 'GREEN',
      }],
      ephemeral: true
    });
  }
};

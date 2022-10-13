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

    console.log(`${ chalk.greenBright('[EVENT ACKNOWLEDGED]') } interactionCreate with command build`);

    const carUnsplit=interaction.options.getString('car');
    const car=carUnsplit.split(" ​")
    const manufacturer=car[0]
    const carName=car[1]

    const data = raceBuilds.find(x => {
      return x["Manufacturer"]===manufacturer&&x["Car Name"]===carName;
    })
    /*
    time for VARIABLES
    */
    const engine=data["Engine"]
    const crank=data["Crankshaft"]
    const ecu=data["ECU"]
    const cooling=data["Cooling"]
    const exhaust=data["Exhaust"]
    const turbo=data["Turbo"]
    const nos=data["Nitrous System"]
    const suspension=data["Suspension"]
    const brakes=data["Brakes"]
    const tires=data["Tires"]
    const clutch=data["Clutch"]
    const gearbox=data["Gearbox"]
    const diff=data["Differential"]
    const active=data["Auxiliary (Active)"]
    const passive=data["Auxiliary (Passive)"]
    const sensitivity=data["Sensitivity"]
    const downforce=data["Downforce"]


    const type=interaction.options.getString('type');

    await interaction.reply({
      embeds: [{
        title: `${ carUnsplit } | ${type} Build`,
        description: `\`\`\`Engine: ${engine} \nCrankshaft: ${crank} \nECU: ${ecu} \nCooling: ${cooling} \nExhaust: ${exhaust} \nTurbo: ${turbo} \nNitrous: ${nos} \nSuspension: ${suspension} \nBrakes: ${brakes} \nTires: ${tires} \nClutch: ${clutch} \nGearbox: ${gearbox} \nDifferential: ${diff} \nActive Auxiliary: ${active} \nPassive Auxiliary: ${passive} \n\nLIVE TUNING: \nSteering Sensitivity: ${sensitivity} \nDownforce: ${downforce}\`\`\``,
        color: 'GREEN',
      }],
      ephemeral: true
    });
  }
};

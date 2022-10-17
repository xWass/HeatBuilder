const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');
const {readFileSync, writeFileSync}=require('node:fs');

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
    const type=interaction.options.getString('type');
    let build;
    if (type==="Track") {
      build=JSON.parse(
        readFileSync('./builds/track.json', 'utf-8')
      );
    } else if (type === "Off-Road") {
      build=JSON.parse(
        readFileSync('./builds/offroad.json', 'utf-8')
      );
    } else if (type==="Drag") {
      build=JSON.parse(
        readFileSync('./builds/drag.json', 'utf-8')
      );
    } else if (type==="Drift") {
      build=JSON.parse(
        readFileSync('./builds/drift.json', 'utf-8')
      );
    }
    const carUnsplit=interaction.options.getString('car');
    const car=carUnsplit.split(" ​")
    const manufacturer=car[0]
    const carName=car[1]

    const data = build.find(x => {
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
    const cost = data["Parts Cost"]



    await interaction.reply({
      embeds: [{
        title: `${ carUnsplit } | ${type} Build`,
        description: `\`\`\`Engine: ${engine||"None"} \nCrankshaft: ${crank||"None"} \nECU: ${ecu||"None"} \nCooling: ${cooling||"None"} \nExhaust: ${exhaust||"None"} \nTurbo: ${turbo||"None"} \nNitrous: ${nos||"None"} \nSuspension: ${suspension||"None"} \nBrakes: ${brakes||"None"} \nTires: ${tires||"None"} \nClutch: ${clutch||"None"} \nGearbox: ${gearbox||"None"} \nDifferential: ${diff||"None"} \nActive Auxiliary: ${active||"None"} \nPassive Auxiliary: ${passive||"None"} \n\nLIVE TUNING: \nSteering Sensitivity: ${sensitivity||"0"} \nDownforce: ${downforce||"0"} \n\nCOST TO BUILD: ${cost||"N/A"}\`\`\``,
        color: 'GREEN',
        footer: {
          text: `Thanks to Orchan#6179 and PCNW for supplying the builds and to the Caliber Gaming staff team for the support.\nMuch love - xWass <3`,
        },
      }],
      ephemeral: true
    });
  }
};

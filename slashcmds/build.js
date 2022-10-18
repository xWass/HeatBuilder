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
    } else if (type==="Off-Road") {
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
    const car=interaction.options.getString('car');
    const data=build.find(x => {
      return x["Car"]===car;
    });


    /*
    time for VARIABLES
    */
    const engine=data["Engine"];
    const crank=data["Crankshaft"];
    const ecu=data["ECU"];
    const cooling=data["Cooling"];
    const exhaust=data["Exhaust"];
    const turbo=data["Turbo"];
    const nos=data["NOS"];
    const suspension=data["Suspension"];
    const brakes=data["Brakes"];
    const tires=data["Tires"];
    const clutch=data["Clutch"];
    const gearbox=data["Gearbox"];
    const diff=data["Differential"];
    const active=data["Aux 1"];
    const passive=data["Aux 2"];
    const sensitivity=data["Steering Sensitivity"];
    const downforce=data["Downforce"];
    const tract=data["Traction"];
    const dstyle=data["Drift Style"];
    const trackRank=data["Track Rank"]
    const aerion=data["Aerion Time"]
    const sonic=data["Sonic Time"]




    await interaction.reply({
      embeds: [{
        title: `${ car } | ${ type } Build`,
        description: `\`\`\`
TRACK RANKING: ${trackRank}\n
TIMES:
Aerion: ${aerion}
Sonic: ${sonic}\n
Engine: ${ engine||"None" }
Crankshaft: ${ crank||"None" }
ECU: ${ ecu||"None" }
Cooling: ${ cooling||"None" }
Exhaust: ${ exhaust||"None" }
Turbo: ${ turbo||"None" }
Nitrous: ${ nos||"None" }
Suspension: ${ suspension||"None" }
Brakes: ${ brakes||"None" }
Tires: ${ tires||"None" } 
Clutch: ${ clutch||"None" }
Gearbox: ${ gearbox||"None" }
Differential: ${ diff||"None" } 
Active Auxiliary: ${ active||"None" }
Passive Auxiliary: ${ passive||"None" }\n
LIVE TUNING:
Steering Sensitivity: ${ sensitivity||"0" }
Downforce: ${ downforce||"0" }
Tracton Control: ${tract||"N/A"}
Drift Style: ${dstyle||"N/A"}
\`\`\``,
        color: 'GREEN',
        footer: {
          text: `Thanks to Orchan#6179 and PCNW for supplying the builds and to the Caliber Gaming staff team for the support.Much love - xWass <3`,
        },
      }],
      ephemeral: true
    });
  }
};

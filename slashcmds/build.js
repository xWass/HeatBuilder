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
                {name: 'Drag', value: 'Drag'},
                {name: 'Drift', value: 'Drift'},
                {name: 'Off-Road', value: 'Off-Road'},

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

        if (!data) {
            interaction.reply({
                embeds: [{
                    title: "There is not an available build for this car and type combination.",
                    description: "Try using /orchan instead!",
                    footer: {
                        text: "Want to contribute? Head over to: https://github.com/xWass/HeatBuilder"
                    }
                }],
                color: 'GREEN',
                ephemeral: true,
            });
            return;
        }

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

        const trackRank=data["Track Rank"];
        const driftRank=data["Drift Rank"];
        const dragRank=data["Drag Rank"];
        const offroadRank=data["Offroad Rank"];

        const dscore=data["Avg Drift Score"];
        const aerion=data["Aerion Time"];
        const sonic=data["Sonic Time"];
        const htv=data["HTV-2"];
        const rumble=data["Rumble"];
        const combined=data["Combined Time"];


        const sixty=data["0-60"];
        const quarter=data["1/4 Mile"];


        const trackStr=
            `\`\`\`
TRACK RANKING: ${ trackRank }\n
TIMES:
Aerion: ${ aerion||"N/A" }
Sonic: ${ sonic||"N/A" }\n
Engine: ${ engine||"N/A" }
Crankshaft: ${ crank||"N/A" }
ECU: ${ ecu||"N/A" }
Cooling: ${ cooling||"N/A" }
Exhaust: ${ exhaust||"N/A" }
Turbo: ${ turbo||"N/A" }
Nitrous: ${ nos||"N/A" }
Suspension: ${ suspension||"N/A" }
Brakes: ${ brakes||"N/A" }
Tires: ${ tires||"N/A" } 
Clutch: ${ clutch||"N/A" }
Gearbox: ${ gearbox||"N/A" }
Differential: ${ diff||"N/A" } 
Active Auxiliary: ${ active||"N/A" }
Passive Auxiliary: ${ passive||"N/A" }\n
LIVE TUNING:
Steering Sensitivity: ${ sensitivity||"0" }
Downforce: ${ downforce||"0" }
Tracton Control: ${ tract||"N/A" }
Drift Style: ${ dstyle||"N/A" }
\`\`\``;

        const driftStr=
            `\`\`\`
DRIFT RANKING: ${ driftRank }\n
Average Drift Score:${ dscore||"N/A" }\n
Engine: ${ engine||"N/A" }
Crankshaft: ${ crank||"N/A" }
ECU: ${ ecu||"N/A" }
Cooling: ${ cooling||"N/A" }
Exhaust: ${ exhaust||"N/A" }
Turbo: ${ turbo||"N/A" }
Nitrous: ${ nos||"N/A" }
Suspension: ${ suspension||"N/A" }
Brakes: ${ brakes||"N/A" }
Tires: ${ tires||"N/A" } 
Clutch: ${ clutch||"N/A" }
Gearbox: ${ gearbox||"N/A" }
Differential: ${ diff||"N/A" } 
Active Auxiliary: ${ active||"N/A" }
Passive Auxiliary: ${ passive||"N/A" }\n
LIVE TUNING:
Steering Sensitivity: ${ sensitivity||"0" }
Downforce: ${ downforce||"0" }
Tracton Control: ${ tract||"N/A" }
Drift Style: ${ dstyle||"N/A" }
\`\`\``;

        const dragStr=
            `\`\`\`
DRAG RANKING: ${ dragRank }\n
SPEEDS:
0-60: ${ sixty||"N/A" }
1/4 Mile: ${ quarter||"N/A" }\n
Engine: ${ engine||"N/A" }
Crankshaft: ${ crank||"N/A" }
ECU: ${ ecu||"N/A" }
Cooling: ${ cooling||"N/A" }
Exhaust: ${ exhaust||"N/A" }
Turbo: ${ turbo||"N/A" }
Nitrous: ${ nos||"N/A" }
Suspension: ${ suspension||"N/A" }
Brakes: ${ brakes||"N/A" }
Tires: ${ tires||"N/A" } 
Clutch: ${ clutch||"N/A" }
Gearbox: ${ gearbox||"N/A" }
Differential: ${ diff||"N/A" } 
Active Auxiliary: ${ active||"N/A" }
Passive Auxiliary: ${ passive||"N/A" }\n
LIVE TUNING:
Steering Sensitivity: ${ sensitivity||"0" }
Downforce: ${ downforce||"0" }
Tracton Control: ${ tract||"N/A" }
Drift Style: ${ dstyle||"N/A" }
\`\`\``;

        const offroadStr=
            `\`\`\`
DRAG RANKING: ${ offroadRank }\n
TIMES:
HTV-2: ${ htv||"N/A" }
Rumble: ${ rumble||"N/A" }
Combined: ${ combined||"N/A" }
Engine: ${ engine||"N/A" }
Crankshaft: ${ crank||"N/A" }
ECU: ${ ecu||"N/A" }
Cooling: ${ cooling||"N/A" }
Exhaust: ${ exhaust||"N/A" }
Turbo: ${ turbo||"N/A" }
Nitrous: ${ nos||"N/A" }
Suspension: ${ suspension||"N/A" }
Brakes: ${ brakes||"N/A" }
Tires: ${ tires||"N/A" } 
Clutch: ${ clutch||"N/A" }
Gearbox: ${ gearbox||"N/A" }
Differential: ${ diff||"N/A" } 
Active Auxiliary: ${ active||"N/A" }
Passive Auxiliary: ${ passive||"N/A" }\n
LIVE TUNING:
Steering Sensitivity: ${ sensitivity||"0" }
Downforce: ${ downforce||"0" }
Tracton Control: ${ tract||"N/A" }
Drift Style: ${ dstyle||"N/A" }
\`\`\``;



        let finalStr;
        if (type==="Track") {
            finalStr=trackStr;
        } else if (type==="Off-Road") {
            finalStr=offroadStr;
        } else if (type==="Drag") {
            finalStr=dragStr;
        } else if (type==="Drift") {
            finalStr=driftStr;
        }

        await interaction.reply({
            embeds: [{
                title: `${ car } | ${ type } Build`,
                description: finalStr,
                color: 'GREEN',
                footer: {
                    text: `Thanks to Trigger for supplying the builds and to the Caliber Gaming staff team for the support.\nMuch love - xWass <3`,
                },
            }],
            ephemeral: true
        });
        const json=require("../usage.json");

        json.build.count++;

        writeFileSync("./usage.json", JSON.stringify(json));
    }
};

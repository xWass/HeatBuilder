const {SlashCommandBuilder}=require('@discordjs/builders');
const chalk=require('chalk');

module.exports={
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription("View the top cars for each race type!")
        .addStringOption((option) => option
            .setName("type")
            .setRequired(true)
            .setDescription("Select a race type!")
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
            build="\`\`\`Porsche 911 Carrera RSR 2.8 '73 \nVolkswagen Beetle '63\n McLaren F1 '93\n Ferrari F40 '87\n Mazda MX-5 '96\n Nissan Skyline 2000 GT-R '71\n Pagani Huayra BC '17\n Nissan Silvia Spec-R Aero '02\n Nissan Fairlady 240 ZG '71\n Ford GT '17\`\`\`"
        } else if (type==="Off-Road") {
            build="\`\`\`Porsche 911 Carrera RSR 2.8 '73\n Volkswagen Beetle '63\n Volvo 242DL '75\n Mazda MX-5 '96\n Nissan 180SX Type X '96\n Honda Civic Type-R '00\n Ford Mustang Foxbody '90\n Porsche Cayman GT4 '15\n Mercedes AMG GT '15\n Acura RSX-S '04\`\`\`"
        } else if (type==="Drag") {
            build="\`\`\`Volkswagen Beetle '63\n Ferrari LaFerrari '13 (1x15 NOS, Manual, 3rd Gear Launch)\n Volvo 242DL '75\n Ferrari F40 '87\n Pagani Huayra BC '17\n Porsche 911 Carrera RSR 2.8 '73\n Honda NSX Type-R '92\n Nissan 180SX Type X '96\n Mazda MX-5 '96\n Ford Mustang Foxbody '90\`\`\`"
        } else if (type==="Drift") {
            build="\`\`\`Mazda RX-7 Spirit R '02\n Nissan 350Z '08\n Buick Grand National '87\n Chevrolet Corvette Z06 '13\n Volvo 242DL '75\n Chevrolet Corvette Grand Sport K.S '17\n Nissan Silvia Spec-R Aero '02\n Mitsubishi Lancer Evolution IX '07\n Nissan Fairlady 240 ZG '71\n Nissan 370Z Heritage Edition '19\`\`\`"
        }

        await interaction.reply({
            embeds: [{
                title: `Top cars in ${type}`,
                description: build,
                color: 'GREEN',

            }],
            ephemeral: true
        });
    }
};
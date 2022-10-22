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
            build="\`\`\`Porsche 911 Carrera RSR 2.8 '73 \nVolkswagen Beetle '63\nMcLaren F1 '93\nFerrari F40 '87\nMazda MX-5 '96\nNissan Skyline 2000 GT-R '71\nPagani Huayra BC '17\nNissan Silvia Spec-R Aero '02\nNissan Fairlady 240 ZG '71\nFord GT '17\`\`\`"
        } else if (type==="Off-Road") {
            build="\`\`\`Porsche 911 Carrera RSR 2.8 '73\nVolkswagen Beetle '63\nVolvo 242DL '75\nMazda MX-5 '96\nNissan 180SX Type X '96\nHonda Civic Type-R '00\nFord Mustang Foxbody '90\nPorsche Cayman GT4 '15\nMercedes AMG GT '15\nAcura RSX-S '04\`\`\`"
        } else if (type==="Drag") {
            build="\`\`\`Volkswagen Beetle '63\nFerrari LaFerrari '13 (1x15 NOS, Manual, 3rd Gear Launch)\nVolvo 242DL '75\nFerrari F40 '87\nPagani Huayra BC '17\nPorsche 911 Carrera RSR 2.8 '73\nHonda NSX Type-R '92\nNissan 180SX Type X '96\nMazda MX-5 '96\nFord Mustang Foxbody '90\`\`\`"
        } else if (type==="Drift") {
            build="\`\`\`Mazda RX-7 Spirit R '02\nNissan 350Z '08\nBuick Grand National '87\nChevrolet Corvette Z06 '13\nVolvo 242DL '75\nChevrolet Corvette Grand Sport K.S '17\nNissan Silvia Spec-R Aero '02\nMitsubishi Lancer Evolution IX '07\nNissan Fairlady 240 ZG '71\nNissan 370Z Heritage Edition '19\`\`\`"
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
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
            build="\`\`\`1. Porsche 911 Carrera RSR 2.8 '73\n2. Volkswagen Beetle '63\n3. McLaren F1 '93\n4. Ferrari F40 '87\n5. Mazda MX-5 '96\n6. Nissan Skyline 2000 GT-R '71\n7. Pagani Huayra BC '17\n8. Nissan Silvia Spec-R Aero '02\n9. Nissan Fairlady 240 ZG '71\n10. Ford GT '17\`\`\`"
        } else if (type==="Off-Road") {
            build="\`\`\`1. Porsche 911 Carrera RSR 2.8 '73\n2. Volkswagen Beetle '63\n3. Volvo 242DL '75\n4. Mazda MX-5 '96\n5. Nissan 180SX Type X '96\n6. Honda Civic Type-R '00\n7. Ford Mustang Foxbody '90\n8. Porsche Cayman GT4 '15\n9. Mercedes AMG GT '15\n10. Acura RSX-S '04\`\`\`"
        } else if (type==="Drag") {
            build="\`\`\`1. Volkswagen Beetle '63\n2. Ferrari LaFerrari '13 (1x15 NOS, Manual, 3rd Gear Launch)\n3. Volvo 242DL '75\n4. Ferrari F40 '87\n5. Pagani Huayra BC '17\n6. Porsche 911 Carrera RSR 2.8 '73\n7. Honda NSX Type-R '92\n8. Nissan 180SX Type X '96\n9. Mazda MX-5 '96\n10. Ford Mustang Foxbody '90\`\`\`"
        } else if (type==="Drift") {
            build="\`\`\`1. Mazda RX-7 Spirit R '02\n2. Nissan 350Z '08\n3. Buick Grand National '87\n4. Chevrolet Corvette Z06 '13\n5. Volvo 242DL '75\n6. Chevrolet Corvette Grand Sport K.S '17\n7. Nissan Silvia Spec-R Aero '02\n8. Mitsubishi Lancer Evolution IX '07\n9. Nissan Fairlady 240 ZG '71\n10. Nissan 370Z Heritage Edition '19\`\`\`"
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
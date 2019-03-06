const simulation = require('./simulation/simulation');


const result = new simulation.Simulation()
    .runAll(1000000, res => {
        console.log(res.action.description);
        console.log(`Won\t${res.won}`);
        console.log(`Lost\t${res.lost}`);
        console.log(`Ratio\t${res.ratio}`);
        console.log("\n");

    });

console.log(`${result.description} offers best results`);

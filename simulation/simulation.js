const doors = require('./doors');
const random = require('../utils/prandom');

const Actions = Object.freeze({
    NeverChangeDoors: Symbol("Never Change Doors"),
    AlwaysChangeDoors: Symbol("Always Change Doors"),
    randomlyChangeDoors: Symbol("Randomly Change Doors")
});

class Simulation {

    constructor() {
        this.doors = new doors.Doors();
    }

    runAll(count, view) {
        let best = {
            action: null,
            ratio: null
        };

        Object.keys(Actions).forEach(key => {
            const value = Actions[key];
            const r = this.run(value, count, view);
            if (!best.action || best.ratio < r) {
                best.action = value;
                best.ratio = r;
            }
        });

        return best.action;
    }

    run(action, count, view) {
        let won = 0;
        let lost = 0;

        for (let i = 0; i < count; i++) {
            const prizeWinner = this.doors
                .setupThreeDoorsWithPrize()
                .selectrandomDoor()
                .openUnprizedDoor()
                .changeDoor(action === Actions.randomlyChangeDoors ?
                    random.nextBoolean() :
                    action === Actions.AlwaysChangeDoors)
                .isWinner();


            if (prizeWinner) {
                won++;
            } else {
                lost++;
            }
        }

        const ratio = (won / (won + lost));

        if (!!view) {
            view({
                action: action,
                won: won,
                lost: lost,
                ratio: ratio
            });
        }
        return ratio;
    }

}

module.exports = {
    Simulation: Simulation
}
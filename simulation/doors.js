const random = require('../utils/prandom');

function selectNextIfUsed(toSetValue, alreadySelectedValues) {
    if (alreadySelectedValues.length === 1) {
        if (toSetValue === alreadySelectedValues[0]) {
            return (toSetValue + 1) % 3;
        }
    } else {
        let result = toSetValue;
        while (result === alreadySelectedValues[0]
        || result === alreadySelectedValues[1]) {
            result = (result + 1) % 3;
        }
        return result;
    }
}

class Doors {


    constructor() {
    }

    setupThreeDoorsWithPrize() {
        this.correctDoor = random.nextInt(3);
        return this;
    }

    selectrandomDoor() {
        this.firstChoice = random.nextInt(3);
        return this;
    }

    openUnprizedDoor() {
        if (this.firstChoice === this.correctDoor) {
            this.discardedDoor = selectNextIfUsed(random.nextInt(2), [this.correctDoor]);
        } else {
            this.discardedDoor = selectNextIfUsed(0, [this.correctDoor, this.firstChoice]);
        }
        return this;
    }

    changeDoor(change) {
        this.secondChoice = this.firstChoice;
        if (change) {
            this.secondChoice = selectNextIfUsed(this.secondChoice, [this.firstChoice, this.discardedDoor]);
        }
        return this;
    }

    isWinner() {
        return this.secondChoice === this.correctDoor;
    }

}

module.exports = {
    Doors: Doors
}
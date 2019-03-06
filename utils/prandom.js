

class Random {
    constructor() {
    }

    nextInt(to) {
        return Math.floor(Math.random() * to);
    }

    nextBoolean() {
        return Math.random() < 0.5;
    }
}

module.exports = new Random();
class Event {
    constructor(options = {}) {
        if (!options.type) {
            throw new Error("Event type is required.");
        }
        this.type = options.type;
        this.run = options.run || (() => {});
    }
}

module.exports = Event;
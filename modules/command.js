class Command {
    constructor(options = {}) {
        if (!options.name || !options.run) {
            throw new Error("Command name and run is required.");
        }
        this.name = options.name;
        this.description = options.description || "No description provided.";
        this.aliases = options.aliases || [];
        this.category = options.category || "General";
        this.cooldown = options.cooldown || 0;
        this.run = options.run;
    }
}

module.exports = Command;

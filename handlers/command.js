const { readdirSync } = require("fs");
const Command = require("../modules/command");
const path = require("path");

module.exports = async function (api, client) {
    const commandsPath = path.join(__dirname, "..", "commands");
    const commands = readdirSync(commandsPath).filter((f) => f.endsWith(".js"));
    for (const command of commands) {
        const commandModule = require(path.join(commandsPath, command));
        if (!(commandModule instanceof Command)) continue;
        client.commands.set(commandModule.name, commandModule);
        if (
            Array.isArray(commandModule.aliases) &&
            commandModule.aliases.length > 0
        ) {
            commandModule.aliases.forEach((alias) =>
                client.commands.set(alias, commandModule)
            );
        }
    }
    console.log("Commands loaded successfully.");
};

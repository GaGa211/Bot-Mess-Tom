const Event = require("../modules/event");
const { config } = require("../config");

module.exports = new Event({
    type: "message",
    run(api, client, field) {
        const [commandName, ...args] = field.args;
        if (!commandName.startsWith(config.prefix)) return;
        const cmd = client.commands.get(commandName.replace(config.prefix, ""));
        if (cmd) return cmd.run(api, field, args);
    },
});

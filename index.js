const { readFile } = require("fs/promises");
const login = require("./fca-horizon-remastered");

const client = {
    commands: new Map(),
};

const loginHandle = (error, api) => {
    if (error) return console.error("Error during login:", error);
    console.log("\nLogged in successfully!");
    api.setOptions({
        listenEvents: true, // enable for join/leave/etc events
    });
    ["event", "command"].forEach((handler) => {
        require(`./handlers/${handler}`)(api, client);
    });
};

async function main() {
    const appState = await readFile("./appstate.json", "utf-8");
    login({ appState: JSON.parse(appState) }, loginHandle);
}

main();

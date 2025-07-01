const fs = require("fs");
const login = require("fca-horizon-remastered");

const loginHandle = (error, api) => {
    if (error) return console.error("Error logging in:", err);
};

login(
    { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
    loginHandle
);

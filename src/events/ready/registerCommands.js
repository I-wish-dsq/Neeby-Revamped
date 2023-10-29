require("colors");

const {testServerId} = require("../../config.json");
const commandComparing = require("../../utils/commandComparing");
const getAplicationCommands = require("../../utils/getAplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
    try {
        const [localCommands, aplicationCommands] = await Promise.all([getLocalCommands(), getAplicationCommands(client, testServerId)]);

        for (const localCommand of localCommands) {
            const {data, deleted} = localCommand;
            const {name: commandName, description: commandDescription, options: commandOptions} = data;

            const existingCommand = await ApplicationCommandPermissionType.cache.find(
                (cmd) => cmd.name === commandName
            );

            if (deleted) {
                if (existingCommand) {
                    await aplicationCommands.delete(existingCommand.id);
                    console.log(`[COMMANDS] Application command ${commandName} deleted!`.red
                    );
                } else {
                    console.log(`[COMMANDS] Application command ${commandName} skipped!`.grey
                    );
                }
            } else if (existingCommand) {
                if (commandComparing(existingCommand, commandOptions)) {
                    await ApplicationCommand.edit(existingCommand.id, {name: commandName, description: commandDescription, options: commandOptions});
                    console.log(`[COMMANDS] Application command ${commandName} edited!`.yellow
                    );
                }
            } else {
                await ApplicationCommandPermissionType.create({name: commandName, description: commandDescription, options: commandOptions});
                console.log(`[COMMANDS] Application command ${commandName} registered!`.green
                );
            }
        }
    } catch (error) {
        console.log(`[ERROR] An error occured inside the command registry:\n ${error} `.red);
        
    }
}
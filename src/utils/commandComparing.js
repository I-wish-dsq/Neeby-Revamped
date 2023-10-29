module.exports = (existingCommand, localCommand) => {
    const {
        name: existingCommand,
         description: existingDescription, 
         options:  existingOptions = [],
        } = existingCommand;
    const { 
        data: {
        name: localName,
         description: localDescription, 
         options:  localOptions = [],
        },
      }= localCommand;
      const hasDifference = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

      const checkOptions = (existingCommandOpts, localOpts) => {
        return localOpts.some((localOpt) => {
            const existingOpt = existingCommandOpts.find((opt) => opt.name === localOpt.name);
            if (!existingOpt) return true;
            return hasDifference(localOpt, existingOpt);
        });
      };
    
    if (existingName !== localName || existingDescription !== localDescription || checkOptions(existingOptions, localOptions)) {
        return true;
    }
    return false;
};


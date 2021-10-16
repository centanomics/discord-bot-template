module.exports = async (client, message) => {
  const prefix = process.env.COMMAND_PREFIX;
  // checks if the message had the prefix or from itself
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.get(command)) {
    await client.commands.get(command).execute(message, args);
  } else {
    // if the command doesn't exist, notify the user
    message.channel.send(`${command} command does not exist`);
  }
};

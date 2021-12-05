const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { REST, CDN } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Load commands from ./commands and add them to the commands collection
(() => {
	client.commands = new Collection();
	const commandFiles = fs
		.readdirSync('./commands')
		.filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}
})();

client.once('ready', async () => {
	console.log(
		`https://discord.com/api/oauth2/authorize?client_id=${client.application.id}&permissions=8&scope=applications.commands%20bot`
	);

	// Set Status

	client.user.setActivity('over Legends MC', { type: 'WATCHING' });

	// Deploy Commands

	let commands = [];

	fs.readdirSync(path.join(__dirname, 'commands')).forEach(cmdPath => {
		commands.push(require(path.join(__dirname, 'commands', cmdPath)));
	});

	const rest = new REST({ version: '9' }).setToken(process.env.token);

	await rest.put(
		Routes.applicationGuildCommands(
			client.application.id,
			process.env['guild']
		),
		{
			body: commands.map(cmd => cmd.data.toJSON()),
		}
	);

	const applicationCommands = await (
		await client.guilds.fetch(process.env['guild'])
	).commands.fetch();
	commands
		.filter(cmd => !cmd.defaultPermsion)
		.forEach(cmd => {
			if (!cmd.allowedRoles) return;
			const permissionDictionary = {
				MOD: process.env['mod-role'],
				OWNER: process.env['owner-role'],
				ADMIN: process.env['admin-role'],
			};

			let permissions = [];
			cmd.allowedRoles.forEach(role => {
				permissions.push({
					type: 'ROLE',
					id: permissionDictionary[role],
					permission: true,
				});
			});

			applicationCommands
				.find(appCmd => appCmd.name === cmd.data.name)
				.permissions.set({ permissions: permissions });
		});
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (!interaction.replied)
			await interaction.reply({
				content: 'An error has occurred please try again later.',
				ephemeral: true,
			});
	}
});

client.login(process.env.token);

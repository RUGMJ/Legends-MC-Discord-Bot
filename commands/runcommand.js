const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const multicraftApiNode = require('multicraft-api-node');
const api = new multicraftApiNode({
	url: 'https://panel.pebblehost.com/api.php',
	user: process.env['multicraft-email'],
	key: process.env['multicraft-api-key'],
});
module.exports = {
	data: new SlashCommandBuilder()
		.setName('runcommand')
		.setDescription(
			'Allows you to run a minecraft command from discord, only works for admins.'
		)
		.setDefaultPermission(false)
		.addStringOption(option =>
			option
				.setName('command')
				.setRequired(true)
				.setDescription('The minecratf command you would like to run.')
		),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		// const result = await api.restartServer({ id: 213276 });
		const result = await api.sendConsoleCommand({
			server_id: 213276,
			command: interaction.options.getString('command'),
		});
		if (!result.success)
			return await interaction.reply(
				'Sorry, an error occured with that request'
			);

		await interaction.reply(
			`I\'ve sent the command \`${interaction.options.get(
				'command'
			)}\` to the server`
		);
	},
};

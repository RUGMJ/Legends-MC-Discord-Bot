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
		.setName('clearchat')
		.setDescription(
			'Allows you to clear the minecraft chat from discord, only works for admins.'
		)
		.setDefaultPermission(false),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.deferReply();
		// const result = await api.restartServer({ id: 213276 });
		const result = await api.sendConsoleCommand({
			server_id: process.env['multicraft-server-id'],
			command: `clearchat`,
		});
		if (!result.success)
			return await interaction.editReply(
				'Sorry, an error occured with that request'
			);

		await interaction.editReply(
			`I've *attempted* to clear the minecraft chat.`
		);
	},
	allowedRoles: ['ADMIN', 'OWNER'],
};

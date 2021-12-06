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
		.setName('kick')
		.setDescription(
			'Allows you to kick a minecraft user from discord, only works for mods and admins.'
		)
		.setDefaultPermission(false)
		.addStringOption(option =>
			option
				.setName('user')
				.setRequired(true)
				.setDescription('The minecraft user you want to kick.')
		),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		// const result = await api.restartServer({ id: 213276 });
		const result = await api.sendConsoleCommand({
			server_id: process.env['multicraft-server-id'],
			command: `kick ${interaction.options.getString('user')}`,
		});
		if (!result.success)
			return await interaction.reply(
				'Sorry, an error occured with that request'
			);

		await interaction.reply(
			`I've *attempted* to kick ${interaction.options.getString('user')}.`
		);
	},
	allowedRoles: ['MOD', 'ADMIN', 'OWNER'],
};

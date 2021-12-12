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
		.setName('mute')
		.setDescription(
			'Allows you to mute a minecraft user from discord, only works for mods and admins.'
		)
		.setDefaultPermission(false)
		.addStringOption(option =>
			option
				.setName('user')
				.setRequired(true)
				.setDescription('The minecraft user you want to mute.')
		)
		.addStringOption(option =>
			option
				.setName('duration')
				.setDescription('The duration you would like to mute them for')
				.setRequired(true)
		),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.deferReply();
		// const result = await api.restartServer({ id: 213276 });
		const result = await api.sendConsoleCommand({
			server_id: process.env['multicraft-server-id'],
			command: `kick ${interaction.options.getString(
				'user'
			)} ${interaction.options.getString('duration')}`,
		});
		if (!result.success)
			return await interaction.editReply(
				'Sorry, an error occured with that request'
			);

		await interaction.editReply(
			`I've *attempted* to mute ${interaction.options.getString(
				'user'
			)} for ${interaction.options.getString('duration')}.`
		);
	},
	allowedRoles: ['MOD', 'ADMIN', 'OWNER'],
};

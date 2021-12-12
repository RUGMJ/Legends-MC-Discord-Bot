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
		.setName('stop')
		.setDescription('Stops the mc server, this command only works for admins.')
		.setDefaultPermission(false),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.deferReply();
		const result = await api.stopServer({
			id: process.env['multicraft-server-id'],
		});
		if (!result.success)
			return await interaction.editReply(
				'Sorry, an error occured with that request'
			);

		await interaction.editReply(
			'The server *should* now be stopping, if the server is not down within the next 5 minutes either try again, or check the console for further details'
		);
	},
	allowedRoles: ['ADMIN', 'OWNER'],
};

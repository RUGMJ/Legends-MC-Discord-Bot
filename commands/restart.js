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
		.setName('restart')
		.setDescription('Restarts the mc server')
		.setDefaultPermission(false),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const result = await api.restartServer({ id: 213276 });
		if (!result.success)
			return await interaction.reply(
				'Sorry, an error occured with that request'
			);

		await interaction.reply(
			'The server *should* now be restarting, if the server is not up within the next 5 minutes either try again, or check the console for further details'
		);
	},
};

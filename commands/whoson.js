const { SlashCommandBuilder } = require('@discordjs/builders');
const multicraftApiNode = require('multicraft-api-node');
const api = new multicraftApiNode({
	url: 'https://panel.pebblehost.com/api.php',
	user: process.env['multicraft-email'],
	key: process.env['multicraft-api-key'],
});
const { CommandInteraction } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoson')
		.setDescription('Lists the players who are currently online!'),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.deferReply();
		const status = await api.getServerStatus({
			id: process.env['multicraft-server-id'],
			player_list: 1,
		});
		if (!status.success)
			return await interaction.editReply(
				'Sorry, an error occured with that request'
			);
		switch (status.data.onlinePlayers) {
			case '0':
				await interaction.editReply(
					`(0) No one is online right now :( Why dont you join? :)`
				);
				break;
			case '1':
				await interaction.editReply(
					`(1) Its only ${status.data.players[0].name} right now, Why dont you join them? :)`
				);
				break;
			default:
				let players = [];
				status.data.players.forEach(player => {
					players.push(player.name);
				});

				const last = players.pop();
				await interaction.editReply(
					`(${status.data.onlinePlayers}) Currently ${
						players.join(', ') + ' and ' + last
					} are online, Why dont you join them?`
				);
				break;
		}
	},
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const multicraftApiNode = require('multicraft-api-node');
const api = new multicraftApiNode({
	url: 'https://panel.pebblehost.com/api.php',
	user: process.env['multicraft-email'],
	key: process.env['multicraft-api-key'],
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoson')
		.setDescription('Lists the players who are currently online!'),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const status = await api.getServerStatus({ id: 213276, player_list: 1 });
		if (!status.success)
			return await interaction.reply(
				'Sorry, an error occured with that request'
			);
		switch (status.data.onlinePlayers) {
			case '0':
				await interaction.reply(
					`(0) No one is online right now :( Why dont you join? :)`
				);
				break;
			case '1':
				await interaction.reply(
					`(1) Its only ${status.players[0].name} right now, Why dont you join them? :)`
				);
				break;
			default:
				let players = [];
				status.data.players.forEach(player => {
					players.push(player.name);
				});

				const last = players.pop();
				await interaction.reply(
					`(${status.data.onlinePlayers}) Currently ${
						players.join(', ') + ' and ' + last
					} are online, Why dont you join them?`
				);
				break;
		}
	},
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const sent = await interaction.reply({
			content: 'Pinging...',
			fetchReply: true,
		});
		interaction.editReply(
			`Pong!: ${sent.createdTimestamp - interaction.createdTimestamp}ms`
		);
	},
};

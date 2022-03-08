const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Says whatever you want :)')
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('The message you want to send')
				.setRequired(true)
		),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		interaction.channel.send(interaction.options.getString('message', true));
		interaction.editReply('Done');
	},
};

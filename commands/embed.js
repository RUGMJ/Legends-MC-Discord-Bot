const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');
const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Allows you to send an embed')
		.addStringOption(option =>
			option
				.setRequired(true)
				.setName('message')
				.setDescription('The message to send in the embed')
		)
		.setDefaultPermission(false),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const embed = new MessageEmbed().setDescription(
			interaction.options.getString('message')
		);
		interaction.channel.send({
			embeds: [embed],
		});
		interaction.reply({ ephemeral: true, content: 'Sent' });
	},
	allowedRoles: ['ADMIN', 'OWNER'],
};

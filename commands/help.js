const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(
			'Shows a list of commands that you can access and their description'
		),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		// await interaction.reply(interaction.client.commands.data);
		const reply = new MessageEmbed({
			title: 'Help Menu',
		});
		interaction.client.commands.forEach(async cmd => {
			reply.addField(`/${cmd.data.name}`, cmd.data.description);
		});

		interaction.reply({ embeds: [reply] });
	},
};

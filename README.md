# Legends MC Discord bot

> This bot was made by RUGMJ#1898

The main idea of the bot it to intergrate the minecraft server into a discord bot, mainly to allow admins to control the server while on mobile however some commands such as /whoson will work for members as well

## How to use:

- First either clone this repo or download a zipped version of it
- If you're using a node version manager then switch to version 16.10 or if you havent got node installed download node js 16.10
- run `npm i` inside of the downloaded folder
- then finally create a .env file in the root of the directory and add the following values:

  ```
  token=[Your discord bot token goes here]
  multicraft-email=[Your multicraft user email goes here]
  multicraft-api-key=[Your multicraft api key goes here]
  guild=[The guild id for your discord server goes here]
  admin-role=[The role id for your trusted admins (people who can use /start /stop /restart /runcommand etc)]
  owner-role=[The role id for your owner role (people who can use /start /stop /restart and /runcommand etc)]
  ```

- Then simply run `node .` or if you're using pm2 `pm2 start index.js`

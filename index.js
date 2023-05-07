var mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer);

var D = require('discord.js');
var ttt = require('discord-tictactoe');
var chalk = require('chalk');

var client = new D.Client();
var config = require('./config.json');
let color = "#RANDOM";

var jc = config.jc;
let prefix = config.prefix;
let ip = config.ip;
let username = config.username;
let ver = config.version;
var bot;

let pass = config.password;
if (!pass) {
    bot = mineflayer.createBot({
        host: ip,
        hideErrors: false,
        username: username,
        version: ver
    });
} else {
    bot = mineflayer.createBot({
        host: ip,
        username: username,
        hideErrors: false,
        password: pass,
        version: ver
    });
}

bot.loadPlugin(tpsPlugin);


// =========================
// SET ACTIVITY BOT
// =========================
client.on('ready', activity => {
    client.user.setStatus(`online`)
    client.user.setActivity(
        `${ip} Servers Chat, | For Help Do  ${prefix}help `, {
            type: "WATCHING"
        }
    )
});

client.on('ready', async () => {
    console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log(chalk.magenta(`Discord Bot on. Loggined as ${client.user.tag}`))
    console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()\n'))
})
bot.once('login', async () => {
    console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log(chalk.magenta(`bot is on At ${ip}`))
    bot.chat(jc)
    console.log(chalk.yellow(`Bot just say "${jc}"`))
    console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()\n'))
})

let forceStop = false;

function getRandomMessage() {
    return config.messages[Math.floor(Math.random() * config.messages.length)];
}

function isInLobby() {
    if (!bot || !bot.game || bot.game.difficulty != "hard") {
        return true;
    } else {
        return false;
    }
}



//tictactoe
new ttt({
    "language": "en",
    "command": "-ttt",
    "commandOptionName": "opponent",
}).attach(client)


client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return
    let args = msg.content.split(" ").slice(1)
    args = msg.content.slice(prefix.length).split(/ +/);
    let command = msg.content.split(" ")[0];
    command = command.slice(prefix.length);
    command = args.shift().toLowerCase();

    if (command == "say") {
        const chat = args.join(" ")
        bot.chat(chat)
        const success = new D.MessageEmbed()
            .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(success);
    } else if (command == "forward") {
        bot.setControlState('forward', true)
        const MoForw = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Im Moving forward To Stop Do -stop`)
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(MoForw);
    } else if (command == "backward") {
        bot.setControlState('back', true)
        const MoBackw = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Im Moving backward To Stop Do -stop`)
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(MoBackw);
    } else if (command == "stop") {
        bot.clearControlStates()
        const MoStop = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Stopped!`)
            .setColor(color)
            .setTimestamp();
        msg.channel.send(MoStop);
    } else if (command == "left") {
        bot.setControlState('left', true)
        const MoLeft = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Im Moving left To Stop Do -stop`)
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(MoLeft);
    } else if (command == "right") {
        bot.setControlState('right', true)
        const MoRight = new D.MessageEmbed()
            .setDescription(`:white_check_mark: Im Moving Right To Stop Do -stop`)
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(MoRight);
    } else if (command == "help") {
        const help = new D.MessageEmbed()
            .setTitle('Help')
            .setDescription('Here are the available commands:')
            .addFields({
                name: `:speech_balloon: ${prefix}say`,
                value: `Get the bot to say what you want.`
            }, {
                name: `:arrows_counterclockwise: ${prefix}movement`,
                value: `Look at the movement command.`
            }, {
                name: `:frame_photo: ${prefix}dupe`,
                value: `Frame dupe. `
            }, {
                name: `:signal_strength: ${prefix}tps`,
                value: `Get TPS of server.`
            }, {
                name: `:busts_in_silhouette: ${prefix}online`,
                value: `Get the current player list.`
            }, {
                name: `:information_source: ${prefix}status`,
                value: `Show information about the bot.`
            }, {
                name: `:world_map: ${prefix}location`,
                value: `Show the bot's current location.`
            }, {
                name: `:loudspeaker: ${prefix}spam`,
                value: `Spam ping the mentioned user. (Usage: ${prefix}spam @username 10)`
            }, {
                name: `:wastebasket: ${prefix}purge`,
                value: `Delete messages in bulk.`
            }, {
                name: `:game_die: ${prefix}ttt`,
                value: `Play TicTacToe.`
            }, )
            .setColor('#313338');
        msg.channel.send(help);
    } else if (command == "movement") {
        const movement = new D.MessageEmbed()
            .setTitle(`Movement Command`)
            .addField(` ${prefix}forward `, 'To Move Forward')
            .addField(` ${prefix}backward `, 'To Move Backward')
            .addField(` ${prefix}left `, 'To Move Left')
            .addField(` ${prefix}right `, 'To Move Right')
            .addField(` ${prefix}stop `, 'To Stop')
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(movement);
    } else if (command == "purge") {
        msg.channel.bulkDelete(100);
    } else if (command == "dupe") {
        const itemframe = bot.nearestEntity(entity => entity.name.match('item_frame'))
        if (itemframe) {
            setInterval(async () => {
                const shulk = bot.inventory.items().find(item => item.name.includes('shulker_box'))
                if (shulk) {
                    bot.equip(shulk, 'hand')
                    bot.lookAt(itemframe.position);
                    await bot.useOn(itemframe)
                    await bot.attack(itemframe)
                }
            }, 300);
            const dupe = new D.MessageEmbed()
                .setTitle(`:white_check_mark: Dupe Started`)
                .setColor(0xA020F0)
                .setTimestamp();
            msg.channel.send(dupe);
        } else {
            return msg.reply("Bot doesn't have an item frame.");
        }
    } else if (command == "tps") {
        const tps = new D.MessageEmbed()
            .setTitle('Current TPS ===> ' + bot.getTps())
            .setColor(0xA020F0)
            .setTimestamp();
        msg.channel.send(tps);
    } else if (command == "online") {
        let players = Object.keys(bot.players);
        let list = players.map((e) => e.username);
        const playerList = players.join(", ");

        const online = new D.MessageEmbed()
            .setColor(0xA020F0)
            .setTitle(`List Of Online Players`)
            .setDescription(`Here are the players currently online:\n\n${playerList}`)
            .setTimestamp();

        if (playerList) {
            return msg.channel.send(online);
        } else {
            return msg.channel.send("There are no players online right now.");
        }
    } else if (command == "status") {
        const status = new D.MessageEmbed()
            .setColor(0xf58367)
            .setTitle(`**${bot.username}** Statistics`)
            .setDescription(`Health: **${bot.health}**\nFood: **${bot.food}**\nXP: **${bot.experience.level || 0}**`)
            .setColor(0xA020F0)
            .setTimestamp();

        msg.channel.send(status);
    } else if (command == "location") {
        const X = bot.entity.position.x.toFixed(1);
        const Y = bot.entity.position.y.toFixed(1);
        const Z = bot.entity.position.z.toFixed(1);

        const coord = new D.MessageEmbed()
            .setColor(0xA020F0)
            .setTitle(`**${bot.username}** Location`)
            .setDescription(`X: **${X}**\nY: **${Y}**\nZ: **${Z}**`)
            .setTimestamp();
        msg.channel.send(coord);
    } else if (command == "spam") {
        const numMessages = parseInt(args[1]);
        const user = msg.mentions.users.first();

        if (!user) {
            return msg.reply('Please mention a user to spam!');
        }

        if (isNaN(numMessages) || numMessages < 1 || numMessages > 10000) {
            return msg.reply('Please provide a valid number of messages between 1 and 10000.');
        }

        for (let i = 0; i < numMessages; i++) {
            msg.channel.send(`Hey ${user}! You're being spammed!`);
        }
    } else if (command == "sneak") {
        bot.setControlState('sneak', true);
        const sneak = new D.MessageEmbed()
            .setDescription(`Bot is Sneaking`)
        msg.channel.send(sneak);
    } else if (command == "stopsneak") {
        bot.setControlState('sneak', false);
        const stsneak = new D.MessageEmbed()
            .setDescription(`Bot Stopped Sneaking`)
        msg.channel.send(stsneak);
    } else if (command == "jump") {
        bot.setControlState('jump', true);
        const jump = new D.MessageEmbed()
            .setDescription(`Bot Started Jumping`)
        msg.channel.send(jump);
    } else if (command == "stopjump") {
        bot.setControlState('jump', false);
        const stjump = new D.MessageEmbed()
            .setDescription(`Bot Stopped Jumping`)
        msg.channel.send(stjump);
    }
})

bot.on("messagestr", message => {
    let channel = client.channels.cache.get(config.scid)
    if (!channel) return;
    const msg = new D.MessageEmbed()
        .setDescription(`>> ${message}`)
    channel.send(msg)
});

client.login(config.Dtoken)
    .catch(error => {
        console.log(chalk.red(`Can't Login`));
    })

bot.on('end', () => {
    console.log(chalk.red('Disconnected'));
});

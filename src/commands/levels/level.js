const { SlashCommandBuilder, AttachmentBuilder, MessageFlags } = require("discord.js")
const Level = require("../../Models/Level.js")
const LevelXP = require("../../utils/LevelXP.js")

const presenceColors = {
    "online": "#3ed606",
    "idle": "#f2b716",
    "dnd": "#d41608",
}


function roundRect(ctx, x, y, width, height, radius, fillStyle) {
    ctx.fillStyle = fillStyle
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill()
  }

function drawRoundedRect(ctx, x, y, width, height, radius, progress) {
    const progressWidth = width * progress
    
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    // ctx.arcTo(x + radius, y, x, y + height - radius, radius)
    // ctx.arcTo(x, y + height - radius, x + progressWidth, y + height, radius)
    ctx.arcTo(x + progressWidth, y, x + progressWidth, y + height, radius);
    ctx.arcTo(x + progressWidth, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
}



const { createCanvas, loadImage, registerFont } = require('canvas');



// registerFont('./fonts/YourFont.ttf', { family: 'YourFont' });

const width = 934;
const height = 282;

async function createRankCard(options) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Extract options
    let {
        avatarURL,
        username,
        currentXP,
        requiredXP,
        level,
        rank,
        presence,
    } = options;

    const cornerRadius = 12;

    // Background
   //ctx.fillStyle = '#1a0342';
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height);

    // Overlay
    //ctx.fillStyle = 
    const fillStyle = "rgba(30, 30, 30, 0.5)"
    roundRect(ctx, 20, 20, width - 40, height - 40, cornerRadius, fillStyle)
    //ctx.beginPath()
    //ctx.moveTo(20 + cornerRadius, 20)
    //ctx.arcTo(20 + cornerRadius, 20, 20, 20 + cornerRadius)
    //ctx.lineTo(20, height - 20 - cornerRadius)
    //ctx.arcTo(20, height - 20 - cornerRadius, 20 + cornerRadius, height - 20, cornerRadius)
    //ctx.lineTo(width - 20 - cornerRadius, height - 20)
    //ctx.arcTo(width - 20 - cornerRadius, height - 20, width - 20, height - 20 - cornerRadius, cornerRadius)
    //ctx.lineTo(width - 20, 20 + cornerRadius)
    //ctx.arcTo(width - 20, 20 + cornerRadius, width - 20 - cornerRadius, 20, cornerRadius)
    //ctx.lineTo(20 + cornerRadius, 20)
    //ctx.closePath
    //ctx.fill()

    // Load Avatar
    avatarURL = avatarURL.replace(".webp", ".png")
    const res = await Promise.race([
    fetch(avatarURL, { headers: { "User-Agent": "Mozilla/5.0" }}),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout fetching avatar")), 2000))
]);

    const arraybuffer = await res.arrayBuffer()
    const avatarbuffer = await Buffer.from(arraybuffer)
    const avatar = await loadImage(avatarbuffer);

    // Draw Circular Avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(125, 141, 80, 0, Math.PI * 2, true);
    ctx.closePath();
    if (presenceColors[presence]) {
        const color = presenceColors[presence]
        ctx.lineWidth = 4
        ctx.strokeStyle = color
    }
    ctx.stroke()
    ctx.clip();
    ctx.drawImage(avatar, 45, 61, 160, 160);
    ctx.restore();


    // Username
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`${username}`, 250, 220 - 20);

    if (rank === 1) {
        ctx.fillStyle = "#fcba03"
    } else if (rank === 2) {
        ctx.fillStyle = "#d4d4d4"
    } else if (rank === 3) {
        ctx.fillStyle = "#855119"
    } else {
        ctx.fillStyle = "#ffffff"
    }
    
    ctx.textBaseline = "hanging"
    ctx.font = "60px sans-serif"
    const rankNumMetrics = ctx.measureText(`#${rank}`)
    const levelNumMetrics = ctx.measureText(`${level}`)
    ctx.font = "30px sans-serif"
    const levelTextMetrics = ctx.measureText("LEVEL")
    const rankTextMetrics = ctx.measureText("RANK")
    ctx.font = "60px sans-serif"
    ctx.fillText(`#${rank}`, 894 - levelNumMetrics.width - levelTextMetrics.width - rankNumMetrics.width + 5, 20, 300)
    ctx.font = "30px sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(`RANK`, 894 - levelNumMetrics.width - levelTextMetrics.width - rankNumMetrics.width - rankTextMetrics.width + 5, 50)
    ctx.fillText('LEVEL', 894 - levelNumMetrics.width - levelTextMetrics.width + 5, 50)
    ctx.font = "60px sans-serif"
    ctx.fillText(`${level}`, 894 - levelNumMetrics.width + 5, 20)
    ctx.textBaseline = "alphabetic"

    // XP Bar
    const barX = 250;
    const barY = 220;
    const barWidth = 600;
    const barHeight = 30;
    const progress = currentXP / requiredXP;
    const progressWidth = barWidth * progress

    // Empty bar
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(250 + cornerRadius, 220); // Start at the top-left corner
    ctx.arcTo(250 + barWidth, 220, 250 + barWidth, 220 + barHeight, cornerRadius); // Top-right corner
    ctx.arcTo(250 + barWidth, 220 + barHeight, 250 + cornerRadius, 220 + barHeight, cornerRadius); // Bottom-right corner
    ctx.arcTo(250, 220 + barHeight, 250, 220, cornerRadius); // Bottom-left corner
    ctx.arcTo(250, 220, 250 + cornerRadius, 220, cornerRadius); // Top-left corner
    ctx.closePath();
    ctx.fill();
    // ctx.fillRect(barX, barY, barWidth, barHeight);

    // Filled bar
    ctx.fillStyle = "#ffffff"
    drawRoundedRect(ctx, 250, 220, barWidth, barHeight, cornerRadius, progress)
    ctx.fill()
    //ctx.fillStyle = '#ffffff';
    //ctx.beginPath();
    //ctx.moveTo(270 + cornerRadius, 220); // Start at the top-left corner
    //ctx.lineTo(barX + cornerRadius, barY)
    //ctx.arcTo(270 + progress + cornerRadius, 220, 270 + progress + cornerRadius, 220 + barHeight, cornerRadius); // Top-right corner
    //ctx.lineTo(barX + barWidth, barY + barHeight)
    //ctx.arcTo(270 + progress + cornerRadius, 220 + barHeight, 270 + cornerRadius, 220 + barHeight, cornerRadius); // Bottom-right corner
    //ctx.lineTo(barX + cornerRadius, barY + barHeight)
    //ctx.arcTo(270, 220 + barHeight, 270, 220, cornerRadius); // Bottom-left corner
    //ctx.lineTo(barX, barY + cornerRadius)
    //ctx.arcTo(270, 220, 270 + cornerRadius, 220, cornerRadius); // Top-left corner
    //ctx.closePath();
    //ctx.fill();
    //ctx.fillRect(barX, barY, progress * barWidth, barHeight);


    // REQUIRED XP TEXT
    ctx.textAlign = "end"
    ctx.font = "26px sans-serif"
    const formatNumberToK = require("../../modules/formatNumberToK.js")
    const shortxp = formatNumberToK(requiredXP)
    const shortcurrentxp = formatNumberToK(currentXP)
    const shortxpmetrics = ctx.measureText(`/ ${shortxp} XP`)
    ctx.fillStyle = "#615f5f"
    ctx.fillText(`/ ${shortxp} XP`, 850, barY - 10)
    // CURRENT XP TEXT
    ctx.fillStyle = "#ffffff"
    ctx.fillText(`${shortcurrentxp}`, 850 - shortxpmetrics.width - 5, barY - 10)

    // Output to file
    const buffer = canvas.toBuffer('image/png');
    return buffer
    
}



module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Show chat levels of you or someone else!")
    .addUserOption(option => option
        .setName("user")
        .setDescription("[NOT REQUIRED] The user to check levels of.")
        
    ),
    async execute(interaction) {
        await interaction.deferReply()
        try {

        console.log("lvl cmd received")
        

        const useroption = await interaction.options.getUser("user")
        const interactionuserID = await interaction.user.id
        const fetchedUser = await interaction.guild.members.fetch(useroption?.id || interactionuserID)
        console.log(fetchedUser.id)

        const query = {
            userId: useroption?.id || interactionuserID,
            guildId: interaction.guild.id,
        }

        let allLevels = await Level.find({ guildId: interaction.guild.id })

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        })

        




        if (!useroption) {

            //const query = {
              //  userId: useroption.id,
                //:guildId: interaction.guild.id

          //  };



            const LevelData = await Level.findOne(query)
            if (LevelData) {
                const rank = await allLevels.findIndex((lvl) => lvl.userId === interaction.user.id)

                const image = await createRankCard({
                    avatarURL: fetchedUser.displayAvatarURL(),
                    username: interaction.user.tag,
                    currentXP: LevelData.xp,
                    requiredXP: LevelXP(LevelData.level),
                    level: LevelData.level,
                    rank: rank + 1,
                    presence: fetchedUser.presence?.status,
                })
                

                const Attachment = await new AttachmentBuilder(image, { name: "rank.png" })
                console.log(Attachment)
                interaction.editReply({ files: [Attachment]})

            }

        } else {


            const LevelData = await Level.findOne(query)
            if (LevelData) {
                //interaction.editreply(`This is ur xp discordian: ${LevelData.xp}`)

                const rank = await allLevels.findIndex((lvl) => lvl.userId === useroption.id)

                const image = await createRankCard({
                    avatarURL: fetchedUser.displayAvatarURL(),
                    username: useroption.tag,
                    currentXP: LevelData.xp,
                    requiredXP: LevelXP(LevelData.level),
                    level: LevelData.level,
                    rank: rank + 1,
                    presence: fetchedUser.presence?.status,
                })
                //image = Buffer.from(arrayBuffer)

                const Attachment = await new AttachmentBuilder(image, { name: "rank.png" })

                interaction.editReply({ files: [Attachment]})
                
            }
        }
    } catch(error) {
        console.log(`Error handling LEVEL command: ${error}`)
            interaction.editReply({ content: `Error: ${error}`, flags: MessageFlags.Ephemeral})
    }

    }

}
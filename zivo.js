const { Client } = require("discord.js");
const { channels, staffRoles, unregisterRoles, welcomeSound, staffSound, tokens } = require("./settings.json");

 tokens.forEach((token, i) => {
  const client = new Client();
  let connection;
  client.on("ready", async () => connection = await client.channels.cache.get(channels[i]).join());
    
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if ((oldState.channelID && !newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID === newState.channelID) || newState.member.user.bot || newState.channelID  !== channels[i]) return;
    const hasStaff = newState.channel.members.some((x)=> staffRoles.some((r) => x.roles.cache.has(r)));
    const staffSize = newState.channel.members.filter((x) => staffRoles.some((r) => x.roles.cache.has(r))).size;
    const unregisterSize = newState.channel.members.filter((x) => unregisterRoles.some((r) => x.roles.cache.has(r))).size;
    if (!hasStaff && unregisterSize === 1) await connection.play(welcomeSound);
    else if (hasStaff && staffSize === 1 && unregisterSize === 1) await connection.play(staffSound);
  });
   
 client.on("voiceStateUpdate", async (oldState, newState) => {
   const ilgarcaliskan = client.channels.cache.get("1053344936214417440")
    if(!oldState.member.user.bot){
    
    if(!oldState.channel && newState.channel){
    ilgarcaliskan.send(`\`${newState.member.user.tag}\` İsimli Üye \`${newState.channel.name}\` İsimli Sesli Odaya Giriş Yaptı!`)
    }
    
    if(oldState.channel && !newState.channel){
    ilgarcaliskan.send(`\`${oldState.member.user.tag}\` İsimli Üye \`${oldState.channel.name}\` İsimli Odadan Çıkış Yaptı!`)
    }
    
    if(oldState.channel && newState.channel){
   ilgarcaliskan.send(`\`${oldState.member.user.tag}\` İsimli Üye \`${oldState.channel.name}\` İsimli Sesli Kanaldan \`${newState.channel.name}\` İsimli Sesli Kanala Geçiş Yaptı!`)
    }
    }
    })
  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "🖤 Discord.gg/1099" }, status: "idle" });
  })
  client.login(token).then(() => console.log(`${client.user.tag} Aktif!`)).catch(() => console.error(`${token} Tokeni aktif edilemedi!`));
});


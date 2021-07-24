const client = require('../index');
const Schema = require('../models/invites');
const ultrax = require("ultrax")
ultrax.inviteLogger(client);

client.on('inviteJoin', (member, invite, inviter) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
          const channel = member.guild.channels.cache.get(data.Channel);
          channel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
      });
})

const client = require('../index');
const { snipe } = require('../collection/index');

client.on('messagesDelete', (message) => {
  let snipes = snipe.get(message.channel.id) || [];
  if (snipes.length > 5) snipes = snipes.slice(0, 4);
  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
  })
  snipe.set(message.channel.id, snipes);
})

const { MessageEmbed, Message, Client } = require('discord.js');
function subsequenceFromStartLast(sequence, at1) {
    var start = at1;
    var end = sequence.length - 1 + 1;
    return sequence.slice(start, end);
  }

  function listsGetRandomItem(list, remove) {
    var x = Math.floor(Math.random() * list.length);
    if (remove) {
      return list.splice(x, 1)[0];
    } else {
      return list[x];
    }
  }

module.exports = {
    name: 'password',
    category : 'extra',
    usage: '[1-100]',
    description : "Generate random passworld from 1 - 100 and sends it in DMs.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        Password_Characters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,@,#,$,%,&'.split(',');
        Password = ['Your password is:','\n','||'].join('');
        Password_Length = subsequenceFromStartLast(message.content, 9);
        if (Password_Length % 1 == 0 && Password_Length > 0) {
          if (Password_Length <= 100) {
            for (var count2 = 0; count2 < Password_Length; count2++) {
              Password += String(listsGetRandomItem(Password_Characters, false));
            }
            (message.member).send(String((String(Password) + '||')));
            message.channel.send(String('A random password has been sent to your DMs')).then(m => m.delete({ timeout: 5000 }));
            message.delete();
          } else {
            message.channel.send(String('Enter a password length equal to or less than 100 please :)')).then(m => m.delete({ timeout: 5000 }));
            message.delete();
          }
        } else {
          m.send(String('The password length is not a valid number :), enter a number between 1 to 100')).then(m => m.delete({ timeout: 5000 }));
          message.delete();
        }
    }
}

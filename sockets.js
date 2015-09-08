module.exports = function(wss) {
  var users = [];

  wss.on('connection', function(ws) {
    var name = 'Guest ' + wss.clients.length;
    console.log(name + ' has joined!');
    var index = users.length;
    users.push(name);
    ws.send('r|' + name);
    broadcast('j|' + JSON.stringify(users));

    ws.on('message', function(message) {
      broadcast(message);
    });

    ws.on('close', function() {
      users.splice(index, 1);
      broadcast('j|' + JSON.stringify(users));
    });
  });

  function broadcast(data) {
    wss.clients.forEach(function(client) {
      client.send(data);
    });
  }
};

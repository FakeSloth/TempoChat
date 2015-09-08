module.exports = function(wss) {
  wss.on('connection', function(ws) {
    var number = wss.clients.length;
    console.log('Guest ' + number + ' has joined!');
    ws.send('j|Guest ' + number);

    ws.on('message', function(message) {
      broadcast(message);
    });
  });

  function broadcast(data) {
    wss.clients.forEach(function(client) {
      client.send(data);
    });
  }
};

module.exports = function(wss) {
  wss.on('connection', function(ws) {
    console.log('connect!');
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

var React = require('react/addons');
var ChatList = require('./ChatList');
var ChatInput = require('./ChatInput');
var Websocket = require('ws');

var App = React.createClass({
  componentDidMount: function() {
    var ws = new Websocket("ws://localhost:3000");

    ws.onopen = function() {
      console.log("Connected!");
    }.bind(this);

    ws.onmessage = function(e) {
      var data = e.data.split('|');
      if (data[0] === 'j') {
        this.state.username = data[1];
        return;
      }
      var messages = this.state.messages.concat([e.data]);
      this.setState({messages: messages});
    }.bind(this);

    ws.onclose = function() {
      console.log("Disconnected!");
    };

    this.ws = ws;
  },

  getInitialState: function() {
    return {
      messages: [],
      username: ''
    };
  },

  onInputSubmit: function(text) {
    this.ws.send(this.state.username + ': ' + text);
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="#">TempoChat</a>
          <form className="form-inline navbar-form pull-right">
            <button className="btn btn-secondary" type="submit">Login</button>
          </form>
        </nav>
        <div className="container">
          <ChatList messages={this.state.messages} />
          <ChatInput onInputSubmit={this.onInputSubmit} username={this.state.username} />
        </div>
      </div>
    );
  }
});

module.exports = App;

var React = require('react/addons');
var ChatList = require('./ChatList');
var ChatInput = require('./ChatInput');
var UserList = require('./UserList');
var Websocket = require('ws');

var App = React.createClass({
  componentDidMount: function() {
    var ws = new Websocket("ws://localhost:3000");

    ws.onopen = function() {
      console.log("Connected!");
    }.bind(this);

    ws.onmessage = function(e) {
      var data = e.data.split('|');
      if (data[0] === 'r') return this.setState({username: data[1]});
      if (data[0] === 'j') {
        console.log(data);
        return this.setState({users: JSON.parse(data[1])});
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
      username: '',
      users: []
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
          <div className="row">
            <div className="col-md-4">
              <UserList users={this.state.users} />
            </div>
            <div className="col-md-8">
              <ChatList messages={this.state.messages} />
              <ChatInput onInputSubmit={this.onInputSubmit} username={this.state.username} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;

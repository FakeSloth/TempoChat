var React = require('react/addons');
var ChatList = require('./ChatList');
var ChatInput = require('./ChatInput');
var Websocket = require('ws');

var App = React.createClass({
  componentDidMount: function() {
    var ws = new Websocket('ws://localhost:3000');
    ws.onopen = function() {
      console.log('connect!');
    };
    ws.onmessage = function(e) {
      var messages = this.state.messages.concat([e.data]);
      this.setState({messages:messages});
    }.bind(this);
    ws.onclose = function() {
      console.log('close');
    };
    this.ws = ws;
  },

  getInitialState: function() {
    return {messages: []};
  },

  onInputSubmit: function(text) {
    //this.setState({messages: messages});
    this.ws.send(text);
  },

  render: function() {
    return (
      <div>
        <ChatList messages={this.state.messages} />
        <ChatInput onInputSubmit={this.onInputSubmit} />
      </div>
    );
  }
});

module.exports = App;

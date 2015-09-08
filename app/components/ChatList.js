var React = require('react/addons');

var ChatList = React.createClass({
  // When new messages scroll to the bottom of the list
  componentDidUpdate: function() {
    React.findDOMNode(this.refs.messages).scrollTop = React.findDOMNode(this.refs.messages).scrollHeight;
  },
  
  createMessage: function(text, index) {
    return (
      <li className="chat-message" key={index + text}>{text}</li>
    );
  },

  render: function() {
    return (
      <ul className="chat-list" ref="messages">
        {this.props.messages.map(this.createMessage)}
      </ul>
    );
  }
});

module.exports = ChatList;

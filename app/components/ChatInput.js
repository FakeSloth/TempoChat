var React = require('react/addons');

var ChatInput = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) return;
    this.props.onInputSubmit(text);
    React.findDOMNode(this.refs.text).value = '';
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
               className="form-control"
               onChange={this.handleChange}
               ref="text" />
      </form>
    );
  }
});

module.exports = ChatInput;

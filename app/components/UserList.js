var React = require('react/addons');

var UserList = React.createClass({
  createUserItem: function(name, index) {
    return (
      <li className="user-item" key={index + name}>{name}</li>
    );
  },

  render: function() {
    return (
      <ul className="user-list">
        {this.props.users.map(this.createUserItem)}
      </ul>
    );
  }
});

module.exports = UserList;

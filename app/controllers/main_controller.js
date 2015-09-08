var React = require('react/addons');
var App = React.createFactory(require('../components/App'));

module.exports = {
  index: function(req, res) {
    var reactHtml = React.renderToString(App({}));
    res.render('index', {reactOutput: reactHtml});
  }
};

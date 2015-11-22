
var ListItem = React.createClass({
  render: function(){
    return (
      <li>
        {this.props.city}
      </li>
    )
  }
});
module.exports = ListItem;
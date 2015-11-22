var ListItem = require('./ListItem');

var List = React.createClass({
  render: function(){
	var items = [];  
	this.props.list.forEach(function(item) {
		items.push(<ListItem city={item.city} />)
	});
		
	return (
      <div>
        <h3> Favorites </h3>
        <ul>
			{items}
        </ul>
      </div>
    )									 
										 
  }
});
module.exports = List;
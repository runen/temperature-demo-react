var SaveButton = React.createClass({

	handleChange : function(e) {
		this.props.onStateChange();
	},	
	
	render: function(){
		var button;  
		if(this.props.currentFavorite) { 
			button = <div className="btn btn--remove" onClick={this.handleChange}  > Remove</div>;
		} else {
			button = <div className="btn" onClick={this.handleChange}  > Save</div>;
		}

	return (
		<div>
			{button}
		</div>
	)									 

	}
});

module.exports = SaveButton;
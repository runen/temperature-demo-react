var Search = React.createClass({

	getInitialState() {
		return { value: '' };
	},

	handleChange(event) {
		this.setState({value: event.target.value});
	},

	handleSubmit(event){
		
		event.preventDefault();
		
		this.props.onSearch(this.state.value);
		
		this.getDOMNode().querySelector('input').blur();
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<input type="text" placeholder="Enter location..." value={this.state.value} onChange={this.handleChange} />
				</div>
			</form>
		);
	}
});

module.exports = Search;
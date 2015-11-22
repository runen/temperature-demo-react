
var Search = require('./Search');
var SaveButton = require('./SaveButton');
var List = require('./List');

var Main = React.createClass({

	getInitialState(){
		
		var favorites = [];

		if(localStorage.favorites){
			favorites = JSON.parse(localStorage.favorites);
		}

		return {
			favorites: favorites,
			temp: "",
			city: "",
			isCurrentFavorite: false
		};
	},

	/**
	 * Toggle current city's favority state
	 **/
	toggleFavorite(){
		
		var favorite = false;
		
		if(this.iscityInFavorites()){
			this.removeFromFavorites();
		}
		else{
			this.addToFavorites();
			favorite = true;
		}
		
		this.setState({
			isCurrentFavorite: favorite
		});

	},

	/**
	 * Add current city to favorites
	 **/	
	addToFavorites(){

		var favorites = this.state.favorites;

		favorites.push({
			city: this.state.city,
			temp: this.state.temp
		});

		this.setState({
			favorites: favorites
		});

		localStorage.favorites = JSON.stringify(favorites);
	},

	/**
	 * Remvoes current city from favorites
	 **/	
	removeFromFavorites(){

		var favorites = this.state.favorites,
			index = -1,
			i, len = favorites.length;

		for(i = 0; i < len; i++){
			if(favorites[i].city == this.state.city){
				index = i;
				break;
			}
		}

		if(index !== -1){	
			favorites.splice(index, 1);

			this.setState({
				favorites: favorites
			});
			
			localStorage.favorites = JSON.stringify(favorites);
		}

	},

	/**
	 * Check if current city is in favorites
	 **/	
	iscityInFavorites(){

		var favorites = this.state.favorites,
			i, len = favorites.length;

		for(i = 0; i < len; i++){
			if(favorites[i].city == this.state.city){
				return true;
			}
		}
		return false;
	},
	
	/**
	 * Fetch weather data
	 * @param query: string, name of the city 
	 **/
	GetTemperature: function (query) {
		
		var source = "http://api.openweathermap.org/data/2.5/find?q="+query+"&units=metric&appid=2de143494c0b295cca9337e1e96b00e0";

		$.get(source, function (result) {
			var data = result;
			if (this.isMounted()) {
				this.setState({
					temp: Math.round(data.list[0].main.temp),
					city: data.list[0].name
				});
			}
		}.bind(this));
	},

	render(){
		
		var currentFavorite = this.iscityInFavorites();

		return (
			
			<h1>Temperature by location</h1>

			<Search onSearch={this.GetTemperature} />

			<div className="display">
				<span className="diplay__digit">{this.state.temp}</span>
				<SaveButton onStateChange={this.toggleFavorite} currentFavorite={currentFavorite} />
			</div>

			<div className="list">
				<List list={this.state.favorites} />
			</div>

		);
	}

});

module.exports = Main;
/**
 * L.Control.GeoSearch - search for an address and zoom to it's location
 * L.GeoSearch.Provider.Google uses google geocoding service
 * https://github.com/smeijer/leaflet.control.geosearch
 */

onLoadGoogleApiCallback = function() {
	L.GeoSearch.Provider.Google.Geocoder = new google.maps.Geocoder();
};

L.GeoSearch.Provider.Google = L.Class.extend({
	options: {

	},

	initialize: function(options) {
		options = L.Util.setOptions(this, options);

		$.ajax({
			url: "https://maps.googleapis.com/maps/api/js?v=3&callback=onLoadGoogleApiCallback&sensor=false",
			dataType: "script"
		});
	},

	GetLocations: function(qry, callback) {
		var geocoder = L.GeoSearch.Provider.Google.Geocoder;
		
		var parameters = L.Util.extend({
			address: qry
		}, this.options);

		var results = geocoder.geocode(parameters, function(data){
			data = {results: data};

			if (data.results.length == 0)
				return [];

			var results = [];
			for (var i = 0; i < data.results.length; i++)
				results.push(new L.GeoSearch.Result(
					data.results[i].geometry.location.lng(), 
					data.results[i].geometry.location.lat(), 
					data.results[i].formatted_address
				));

			if(typeof callback == 'function')
				callback(results);
		});
	},
});
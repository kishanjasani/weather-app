window.addEventListener( 'load', () => {
	let long;
	let lat;
	let app = 'b67be043a5728f9d2f05794c91cc72f9';
	let temperatureDescription = document.querySelector( '.temperature__description' );
	let temperatureDegree      = document.querySelector( '.degree' );
	let locationTimezone       = document.querySelector( '.location__timezone' );
	let tempIcon               = document.querySelector( '.icon' );

	if ( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition( position => {
			long = position.coords.longitude;
			lat  = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api   = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${app}`;

			fetch( api )
				.then( response => {
					return response.json();
				} )
				.then( data => {
					console.log( data );
					const { description, icon } = data.weather[0];
					const { temp }              = data.main;

					temperatureDegree.textContent      = temp;
					temperatureDescription.textContent = description;
					locationTimezone.textContent       = data.name;
					tempIcon.innerHTML               = `<img src="./weather-icons/${icon}.png">`;
				} );
		} );
	} else {
		h1.textContent = "Your browser is not support Geo Location.";
	}
} );

'./weather-icons/'

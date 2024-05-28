const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: null,
			planets: null,
			currentPlanet: null,
			currentPlanetUrl: "",
			starships: [],
			currentStarship: null,
			currentStarshipUrl: "",
			
			
		},
		actions: {
			
			

			getCharacters: async () => {

				if(localStorage.getItem('characters')) {
					setStore({characters: JSON.parse(localStorage.getItem('characters'))})
					return;
				
				};

				const response = await fetch("https://swapi.dev/api/people");
				if (!response.ok) {
					console.log('Error' , response.status, response.statusText);
				};

				const data = await response.json();
				setStore({characters: data.results});
				console.log(data.results);
				localStorage.setItem('characters', JSON.stringify(data.results))
			},

			getPlanets: async () =>{
				if(localStorage.getItem('planets')){
					setStore({planets: JSON.parse(localStorage.getItem('planets'))})
					return;
				}

				const response = await fetch('https://www.swapi.tech/api/planets');
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ planets: data.results });
				localStorage.setItem('planets', JSON.stringify(data.results))
			
			},

			settingPlanetUrl: (text) => { setStore({ currentPlanetUrl: text }); },

			getCurrentPlanet: async () => {
				const uri = getStore().currentPlanetUrl;
				console.log(uri);
				const response = await fetch(uri);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
				console.log(data.result);
				setStore({ currentPlanet: data.result });
			},

			getStarships: async () => {
				if (localStorage.getItem('starships')){
					setStore({starships: JSON.parse(localStorage.getItem('starships'))})
					return;
				}

				const response = await fetch ("https://swapi.dev/api/starships");
				if (!response.ok) {
					console.log('Error' , response.status, response.statusText);
					return
				};

				const data = await response.json();
				console.log(data);
				setStore({starships: data.results});
				localStorage.setItem('starships', JSON.stringify(data.results))

			},
			

		}
	};
};

export default getState;

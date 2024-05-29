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
			favorites: [],
			contacts: [],
			apiContact: "https://playground.4geeks.com/contact/",
			agenda: "VictoriaG",
			
			
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

			addFavorites: (favorite) => {
				const store = getStore();
				const existingFavorites = store.favorites;
				const isAlreadyFavorite = existingFavorites.some(item => item.name === favorite.name && item.type === favorite.type);
				if (!isAlreadyFavorite) {
					setStore({ favorites: [...existingFavorites, favorite] });
				}
			},

			removeFavorite: (name) => {
				const existingFavorites = getStore().favorites;
				const updatedFavorites = existingFavorites.filter(item => item.name !== name);
				setStore({ favorites: updatedFavorites });
			},

			createAgenda: async () => {
				const uri = "https://playground.4geeks.com/contact/agendas/VictoriaG";
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify()
				} 

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error', response.status, response.statusText);
					return
				}
					
				},

				getContacts: async () => {
					const uri = "https://playground.4geeks.com/contact/agendas/VictoriaG"
					const response = await fetch(uri);
					if (!response.ok) {
						console.log('error', response.status, response.statusText);
						return
					}
					const data = await response.json();
					setStore({contacts: data.contacts});
					console.log(data.contacts);
				},

				addContact: async (dataToSend) => {
					const uri = `${getStore().apiContact}agendas/${getStore().agenda}/contacts`;
					const otptions = {
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify(dataToSend)
					}
					const response = await fetch(uri, otptions);
					if (!response.ok) {
						console.log('error', response.status, response.statusText);
						return
					}
					if (response.ok) {
						const newContact = await response.json();
						setStore({ contacts: [...store.contacts, newContact] });
					}
					// const data = await response.json();
					getActions().getContacts();
			
			},

			deleteContact: async (contactId) => {
				const uri = `https://playground.4geeks.com/contact/agendas/VictoriaG/contacts/${contactId}`
				const options = {
					method: 'DELETE',

				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error', response.status, response.statusText);
					return
				}

				
				getActions().getContacts();
			},

			
		
			editContact: async (contactId) =>  {
				const uri = `https://playground.4geeks.com/contact/agendas/VictoriaG/contacts/${contactId}`
		
				const options = {
					method: "PUT",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(editedContact)
				};
		
				const response = await fetch(uri, options);
		
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
				};
				if (response.ok) {
					const updatedContact = await response.json();
					setStore({ contacts: [...store.contacts, updatedContact] });
				

				getActions().getContacts();

				}
			}

			

		},
	};
};

export default getState;

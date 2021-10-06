const first = document.querySelector('.first');
const info1 = document.querySelector('#a')
const info2 = document.querySelector('#b')

const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
const key = 'a51283757b2f8b947a1affd8c483d7f2';
const city = 'Seoul'
const language = 'en'

const getWeather = async () => {
    const urlToFetch = `${endpoint}?q=${city}&appid=${key}&lang=${language}`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            const city = jsonResponse.name;
            const status = jsonResponse.weather[0].description;
            const connection = jsonResponse.cod;
            first.textContent = `${city} - OpenWeather API`;
            info1.innerHTML = `${city} currently has <span>${status}</span>.`
            info2.textContent = `The response status from OpenWeather API is ${connection}.`
        }
        else{
            first.textContent = `${city} - OpenWeather API is not responding.`
            throw new Error('response not working')
        }
    } catch(error) {
        console.log('caught error', error)
    }

}

getWeather();
// export default getWeather;

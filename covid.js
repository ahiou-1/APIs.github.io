const dateForCovid = new Date();
const dayForCovid = dateForCovid.getDate();
const total = document.querySelector('#confirmed')
const dead = document.querySelector('#death')
let emptyDay = '0';

if(dayForCovid < 10) {
    emptyDay += dayForCovid -3;
} else {
    emptyDay = dayForCovid -3;
}

const endpoint2 = `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/KOR/2021-10-${emptyDay}`;

const getCovid = async () => {
    const urlToFetch = `${endpoint2}`
    try {
        const response = await fetch(urlToFetch)
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            const confirmed = jsonResponse.stringencyData.confirmed;
            const death = jsonResponse.stringencyData.deaths;
            total.innerHTML = `Total Confirmed Cases: <span>${confirmed}</span>`;
            dead.innerHTML = `Total deaths: <span>${death}</span>`
        } else {
            throw new Error('noooouuuu')
        }
    } catch (e) {
        console.log('EEERRRORORRR', e)
    }
}
getCovid();

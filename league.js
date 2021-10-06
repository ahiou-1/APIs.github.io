const searchSummoner = document.querySelector('.searchSummoner');
const summonerName = document.querySelector('#summoner-name')
const summonerLevel = document.querySelector('#summoner-level')

const required = {
    firstEndpoint: 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/',
    secondEndpoint: 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/',
    thirdEndpoint: 'https://asia.api.riotgames.com/lol/match/v5/matches/',
    key: 'RGAPI-9669e5ce-76e8-4270-a5d1-d4fe36912ad8',
}

const getLeague = async () => {
    const summoner = searchSummoner.value;
    const urlToFetch = `${required['firstEndpoint']}${summoner}?api_key=${required['key']}`
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const puuid = jsonResponse.puuid;
            summonerName.textContent = `Summoner's name: ${jsonResponse.name}`
            summonerLevel.textContent = `Summoner's level: ${jsonResponse.summonerLevel}` 
            try{
                const matches = await fetch(`${required['secondEndpoint']}${puuid}/ids?start=0&count=3&api_key=${required['key']}`)
                const jsonMatches = await matches.json();
                console.log(jsonMatches)
                try {
                    const matchResponse = await fetch(`${required['thirdEndpoint']}${jsonMatches[0]}?api_key=${required['key']}`)
                    if (matchResponse.ok) {
                        const jsonMatchDetail = await matchResponse.json();
                        console.log(jsonMatchDetail);
                    }
                } catch(e) {
                    console.log(e)
                }
            } catch(error) {
                console.log(error)
            }
        } else {
            throw new Error('noonononoo');
        }
    } catch(e) {
        console.log(e);
    }
}

function pressEnterLeague(event) {
    if (event.keyCode == 13) {
        getLeague();
        searchSummoner.value = '';
    } else {
        
    }
}


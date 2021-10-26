const searchSummoner = document.querySelector('.searchSummoner');
const summonerNickName = document.querySelector('#summoner-name')
const summonerLevel = document.querySelector('#summoner-level')
const matchTable = document.querySelector('.table');



const required = {
    firstEndpoint: 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/',
    secondEndpoint: 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/',
    thirdEndpoint: 'https://asia.api.riotgames.com/lol/match/v5/matches/',
    key: 'RGAPI-c82398c3-6a3c-4dac-b4cc-9ba71af95263',
}

const getLeague = async () => {
    const summoner = searchSummoner.value.toLowerCase();
    const urlToFetch = `${required['firstEndpoint']}${summoner}?api_key=${required['key']}`
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const puuid = jsonResponse.puuid;
            summonerNickName.textContent = `Summoner's name: ${jsonResponse.name}`
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
                        const participantsArray = jsonMatchDetail.info.participants;

                        for (let i = 0; i < jsonMatchDetail.info.participants.length; i++) {
                            if(participantsArray[i].summonerName.toLowerCase() == summoner) { 
                                const gameDetails = {
                                    winLose: jsonMatchDetail.info.participants[i].win,
                                    champion: jsonMatchDetail.info.participants[i].championName,
                                    gameMode: jsonMatchDetail.info.gameMode,
                                    kills: jsonMatchDetail.info.participants[i].kills,
                                    deaths: jsonMatchDetail.info.participants[i].deaths,
                                    assists: jsonMatchDetail.info.participants[i].assists,
                                }
                                if(gameDetails.winLose) {
                                    gameDetails.winLose = 'WIN';
                                } else {
                                    gameDetails.winLose = 'LOSE';
                                }
                                console.log(gameDetails)

                                matchTable.innerHTML = `
                                <table>
                    <thead>
                        <tr>
                            <th>Win/Lose</th>
                            <th>Champion</th>
                            <th>Game Mode</th>
                            <th>Kills</th>
                            <th>Deaths</th>
                            <th>Assists</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${gameDetails.winLose}</td>
                            <td>${gameDetails.champion}</td>
                            <td>${gameDetails.gameMode}</td>
                            <td>${gameDetails.kills}</td>
                            <td>${gameDetails.deaths}</td>
                            <td>${gameDetails.assists}</td>
                            
                        </tr>
                        <tr class="toggle1">
                            <td>information</td>
                        </tr>
                        
                    </tbody>
                </table>
                                `
                            } 
                        }
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
        matchTable.innerHTML = '<span>Summoner Not Found.</span>'
    }
}

function pressEnterLeague(event) {
    if (event.keyCode == 13) {
        getLeague();
        searchSummoner.value = '';
    } else {
        
    }
}




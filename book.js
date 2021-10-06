const endpoint1 = 'https://openlibrary.org/search.json';
const search = document.querySelector('.search')
const book1 = document.querySelector('#book1');
const book2 = document.querySelector('#book2');
const book3 = document.querySelector('#book3');
const buffering = document.querySelector('.buffering')


const getBook = async () => {
    const value = search.value.split(' ').join('+')
    const urlToFetch = `${endpoint1}?q=${value}`
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            const title1 = jsonResponse.docs[0].title
            const title2 = jsonResponse.docs[1].title
            const title3 = jsonResponse.docs[2].title
            const author1 = jsonResponse.docs[0].author_name[0]
            const author2 = jsonResponse.docs[1].author_name[0]
            const author3 = jsonResponse.docs[2].author_name[0]
            const link1 = `http://openlibrary.org/${jsonResponse.docs[0].key}`
            const link2 = `http://openlibrary.org/${jsonResponse.docs[1].key}`
            const link3 = `http://openlibrary.org/${jsonResponse.docs[2].key}`
            book1.innerHTML = `1. ${title1} by ${author1}. link: <a href="${link1}" target="_blank">click</a>`
            book2.innerHTML = `2. ${title2} by ${author2}. link: <a href="${link2}" target="_blank">click</a>`
            book3.innerHTML = `3. ${title3} by ${author3}. link: <a href="${link3}" target="_blank">click</a>`
            buffering.textContent = '';
        } else {
            throw new Error('nO!!!!!!')
        }
    } catch(e) {
        console.log(e)
    }
}

function pressEnter(event) {
    if (event.keyCode == 13) {
        getBook();
        search.value = '';
        buffering.textContent = 'searching...'
    }
}


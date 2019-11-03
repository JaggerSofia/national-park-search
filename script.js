'use strict'
const apiUrl='https://developer.nps.gov/api/v1/parks?parkCode=acad'



function findPark(searchPark, maxResults = 10) {
    const params = {
        stateCode: searchPark,
        q: searchPark,
        limit: maxResults,
    };
    
    let queryString = $.param(params);
    console.log('QueryString', queryString);
    const url = apiUrl + '?' + queryString;
    console.log(url)

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            })
}

function displayResult(responseJson) {
    for(let i=0; i<responseJson.length; i++) {
        $('#results-list').html(
            `<li>
                <h3>${responseJson[i].fullName}</h3>
                <p>${responseJson[i].description}</p>
                <a src='${responseJson[i].url}>${responseJson[i].fullName} Website</a>
            </li>`
        )
    }
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let searchPark = $('#search-park').val();
        let maxResults = $('#results-num').val();

        if (searchPark !== '') {
            findPark(searchPark, maxResults);
        } else {
            alert('Please enter a search term and results');
        }
    })
}

$(watchForm);
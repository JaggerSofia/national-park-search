'use strict'
const apiUrl='https://developer.nps.gov/api/v1/parks?parkCode=acad'

function findPark(searchPark, maxResults = 10) {
    const params = {
        q: searchPark,
        limit: maxResults,
    };
    
    let queryString = $.param(params);
    console.log('QueryString', queryString);
    const url = apiUrl + '&' + queryString;
    console.log(url)

    const options = {
        // "headers": {
        //     "x-api-key": "XvV7YH8CQvUmv8YNW5501fw3Gi4SDPPAcZoYubix",
        //     "X-API-Key": "XvV7YH8CQvUmv8YNW5501fw3Gi4SDPPAcZoYubix",
        //     "User-Agent": "PostmanRuntime/7.18.0",
        //     "Accept": "*/*",
        //     "Cache-Control": "no-cache",
        //     "Postman-Token": "f0bd70ee-2ccd-4547-9682-1f825996cbfc,3e6afe32-2a36-4dfb-bb6e-a918faf989e0",
        //     "Host": "developer.nps.gov",
        //     "Accept-Encoding": "gzip, deflate",
        //     "Cookie": "AWSALB=RxZIIE4JTQ5J+jUKHigNoWGZkYoW5LwN/v00MVRUj1iBRf1m/rR9lG8Qk0W0hq6YAJiHd2hlJ5afpKzwxk7jzIYzzhxdqgxsQjy9wi/IQlhApZeRKhFOT6pkxD1d",
        //     "Connection": "keep-alive",
        //     "cache-control": "no-cache"
        //   }
        headers: new Headers({
            "Authorization": 'XvV7YH8CQvUmv8YNW5501fw3Gi4SDPPAcZoYubix'})
    };

    fetch(url, options)
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
    console.log(responseJson)
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


//when user clicks the search button, append city to list group 
$('.searchButton').on('click', function(){
    let location = $('.search-city').val(); 

    getCurrentWeather(location);
    appendWeather(location); 

    localStorage.setItem('city', location); 
})

//append the city to the left side of the page as a previous search
const appendWeather = location => { 

    //create new list item for city
    let li = document.createElement('BUTTON'); 

    li.setAttribute('class', 'list-group-item past-city'); 

    li.innerHTML = location; 

    //when user clicks the city, they will revisit previous search history
    li.addEventListener('click', function(){
        getCurrentWeather(location); 
    })

    //adds most recently searched location above older searches
    $('.city-list').prepend(li); 

} 


//when user searches for city, ajax calls for current and future conditions of the city
const getCurrentWeather = location => {

    let currentDate = moment().format('L'); 

    $('#city-name').text(`${location} ${currentDate}`); 

    //set apiKey 
    const apiKey = 'eb064f8519bae71185dae0cf9c297178'

    //create url with location and apiKey
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

    //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);  

        let cityID = response.id; 
        getWeekForecast(location); 

        //sets text in card body to display temp, humidity, and wind speed
        $('#temperature').text(`Temperature: ${response.main.temp} F`); 
        $('#humidity').text(`Humidity: ${response.main.humidity} %`); 
        $('#wind').text(`Wind Speed: ${response.wind.speed} MPH`); 
    }); 

}


//user presented with city name, date, icone representation of weather conditions
//uv inex displays if weather is favorable, m,oderate or sever

//five day forecast displays the date, icon of weather condition
const getWeekForecast = location => { 
    console.log(location); 
}

//when open weather dashboard, last searched city forecast is displayed
const reloadForecast = () => { 
    let lastCity = localStorage.getItem('city'); 

    if (lastCity === null){
        return; 
    } else { 
        getCurrentWeather(lastCity); 
        appendWeather(lastCity); 
    }
}

reloadForecast(); 
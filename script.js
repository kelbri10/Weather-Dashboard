//append the city to the left side of the page as a previous search

//when user clicks the search button, append city to list group 
$('.searchButton').on('click', function(){
    let location = $('.search-city').val()

    let currentDate = moment().format('L'); 

    $('#city-name').text(`${location} ${currentDate}`); 

    getCurrentWeather(location);
    appendWeather(location); 
})

//append the city to the left side of the page as a previous search
const appendWeather = location => { 
    location.setAttribute('class', 'list-group-item'); 
}

 //when user searches for city, ajax calls for current and future conditions of the city
const getCurrentWeather = location => {
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
        //sets text in card body to display temp, humidity, and wind speed
        $('#temperature').text(`Temperature: ${response.main.temp} F`); 
        $('#humidity').text(`Humidity: ${response.main.humidity} %`); 
        $('#wind').text(`Wind Speed: ${response.wind.speed} MPH`); 
    }); 

}


//user presented with city name, date, icone representation of weather conditions
//uv inex displays if weather is favorable, m,oderate or sever

//five day forecast displays the date, icon of weather condition

//when user clicks on city in search history the history is redisplayed 

//when open weather dashboard, last searched city forecast is displayed
window.onload = function () {
    main();
};

function main(){
    
    weather_text_loc = document.getElementById("weather_text");
    // weather_text_loc.textContent = 'test';
    location_text = document.getElementById("location_text");
    actual_weather = document.getElementById("actual_weather");
    actual_weather2 = document.getElementById("actual_weather2");
    console.log("test");

    const BASE_URL = 'http://127.0.0.1:8000/my_location/';

    const getIp_location = async () => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            weather_text_loc.textContent = "Your ip = "+ response['data']['ip'];
            console.log(response);
            console.log(response['data']['ip']);
            location_text.textContent = "Your city = " + response['data']['city'];
            return response;
        } catch (errors) {
            console.error(errors);
        }
    };
    
    
    getIp_location();

    
    const WEATHER_END_POINT = "http://127.0.0.1:8000/my_weather/";
    const getWeather = async () => {
        try {
            const response = await axios.get(`${WEATHER_END_POINT}`);
            actual_weather.textContent = "Temp fells like " + response['data']['main']['feels_like']+ "\n";
            // ans += "Temperature fells like " + response['data']['main']['feels_like']+ "\n";
            // actual_weather.textContent = ans;
            actual_weather2.textContent = "Humidity: " + response['data']['main']['humidity'] + "%";
            
            console.log(response);
            // console.log(response['data']['ip']);
            // location_text.textContent = "Your city = " + response['data']['city'];
            return response;
        } catch (errors) {
            console.error(errors);
        }
    };
    getWeather();

}

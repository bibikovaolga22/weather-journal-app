const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const countryID = 'ie';
const APIkey = 'c84d21471d843cfc8d3be7bb8c04d13f';


const recordEntry = async (e) => {
    const city = document.getElementById('city').value;
    let entry = await getOpenWeather(baseURL, city, countryID, APIkey);
    entry.feelings = document.getElementById('feelings').value;
    console.log(entry);
    postWeather('/postWeather', entry);
    updateUI();
};

const generate = document.getElementById('generate');
generate.addEventListener('click', recordEntry);


const getOpenWeather = async (URL, city, country, key) => {
    const response = await fetch(`${URL}?q=${city},${country}&appid=${key}&units=metric`);

    try {
        const data = await response.json();
        console.log(data)
        return {
            weather: data.main.temp,
            location: data.name,
            icon: data.weather[0].icon,
            weatherState: data.weather[0].main,
        }

    } catch (error) {
        console.log('error', error)
    }
}

const getWeather = async () => {
    const response = await fetch('/getWeather')

    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error, 'error')
    }
}

const postWeather = async (url, projectData) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });


    try {
        let newData = await response.json();

        console.log(newData)
        return newData;
    } catch (error) {
        console.log('error', error)
    }
}
const updateUI = async () => {
    const entry = await getWeather();
    const temperature = document.getElementById('temp');
    const locate = document.getElementById('location');
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.style.width = '60px';
    icon.style.height = '86px';
    locate.innerHTML = entry.location;
    const celcius = Math.round(entry.weather);
    temperature.innerHTML = `${celcius}°C`;
    const iconCode = entry.icon;
    const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    temperature.appendChild(icon).innerHTML = `<img src=${iconUrl}>`;
    document.getElementById('content').innerHTML = entry.feelings;


}

window.addEventListener('load', updateUI);
window.addEventListener('load', generateTodaysDate);

//SHOW DATE

function generateTodaysDate() {

    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();
    const daylist = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const showDay = document.getElementById('date').innerHTML = ` ${daylist[month]} ${date}, ${year}`

}


import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Forecast from './forecast.jsx'

export default function Weather() {
    
    const[url,SetUrl] = useState('weather/src/assets/islamabad.jpeg')
    const [city, setCity] = useState('islamabad')
    const [forecast, setForecast] = useState([]);
    const [weather, setWeather] = useState({})
    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&per_page=1&client_id=XiMno4l_C8G89rdysNjzAYvRqSQvenlwTtO78w9GViI`)
        .then(res => res.json())
        .then(data => {
            const {results} = data;
            const {urls} = results[0];
            SetUrl(urls.regular)
        })
    },[city])
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51122b41f541e37ccc93611c7a8d7bbf`)
        .then(res => res.json())
        .then(data => {
            const {main, name, sys, weather, wind} = data;
            const temperature = Math.round(main.temp - 273.15)
            const country = sys.country;
            const desc = weather[0].description;
            const speed = wind.speed;
            const pressure = main.pressure;
            const humidity = main.humidity;
            const sunrise = convertUnixToTime(sys.sunrise);
            const sunset = convertUnixToTime(sys.sunset);
            const feels_like = Math.round(main.feels_like - 273.15)
            const Main = weather[0].main
            setWeather(
                {
                    temperature,
                    name,
                    country,
                    desc,
                    speed,
                    pressure,
                    humidity,
                    sunrise,
                    sunset,
                    feels_like,
                    Main
                }
            )
        })
    }, [city]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51122b41f541e37ccc93611c7a8d7bbf`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
      
            // Group data by date
            const dailyData = data.list.reduce((acc, weather) => {
              const date = weather.dt_txt.split(' ')[0];
              if (!acc[date]) acc[date] = [];
              acc[date].push(weather);
              return acc;
            }, {});
      
            // Extract the temperature at 12:00 for each day
            const dailySummaries = Object.keys(dailyData).map(date => {
              const dayData = dailyData[date];
              const summary = dayData.find(weather => weather.dt_txt.includes("12:00:00")) || dayData[0];
              return {
                date: new Date(summary.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
                main: summary.weather[0].main,
                temp: Math.round(summary.main.temp)
              };
            });
            // Set forecast state after mapping
            setForecast(dailySummaries);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error scenarios, e.g., set a default state or show an error message
          }
        };
      
        fetchData();
      }, [city]);

    function convertUnixToTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const time = hours + ':' + minutes + ' ' + ampm;
        return time;
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    
    let image ='weather/src/assets/sun.png';

    if(weather.Main == 'Thunderstorm'){
        image ='weather/src/assets/storm.png';
    } else if(weather.Main == 'Rain'){
        image='weather/src/assets/rainy-day.png'
    } else if(weather.Main == 'Clouds'){
        image = 'weather/src/assets/cloudy.png';
    } else {
        image ='weather/src/assets/sun.png';
    }

    let img ='./src/assets/sun_Color=On.png';

    if(weather.Main == 'Thunderstorm' || weather.Main == 'Rain'){
        img ='./src/assets/Rain_Color=On.png';
    } else if(weather.Main == 'Clouds' || weather.Main == 'smoke'){
        img = './src/assets/Color=On_cloud.png';
    } else {
        img ='./src/assets/sun_Color=On.png';
    }

    const now = new Date();

    // Get the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[now.getDay()];

    // Get the current time in 24-hour format
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;


    return (
        <div className='flex flex-col md:flex-row'>
        <div className="h-screen w-full md:w-[40%] bg-white">
            <div className='flex mt-4 items-center ml-10'>
                <img className='size-5 object-contain mr-2' src="./src/assets/search.png" alt="Search Icon"/>
                <input className='font-sans' id='city' value={city}  type="text" placeholder='Select City..' name='city' onChange={handleCityChange} />
            </div>
            <div className="ml-10">
            <img className="w-[60%] h-[20%] object-contain mt-28" src={image} alt="sun photo" />
            <h1 className="font-bold font-serif text-6xl mt-6">{weather.temperature}° C</h1>
            <p className="font-mono font-semibold text-lg mt-2">{currentDay},<span className="font-serif text-lg text-gray-400">{formattedTime}</span></p>
            </div>
            <hr className='border-gray-400 w-[80%] mt-4 mx-auto'/>
            <div className='flex ml-10 items-center mt-4'>
               <img className='object-cover mr-2' src={img} alt="" />
               <p className='font-mono font-semibold'>{weather.desc}</p>
            </div>
            <div className='flex ml-10 items-center mt-4'>
               <img className='object-cover mr-2' src="./src/assets/Color=On.png" alt="" />
               <p className='font-mono font-semibold'>{weather.speed} km/h</p>
            </div>
            <div className='w-[90%] h-[10%]  mx-auto rounded-lg flex justify-center items-center mt-6 relative'>
                <img className='w-full h-full object-fill  opacity-60 rounded-lg' src={url} alt="city image" />
                <p className='absolute text-white font-mono font-semibold text-lg'>{weather.name}, {weather.country}</p>
            </div>
        </div>
        <Forecast weather={weather} forecast={forecast} city={city}/>
        </div>
    );
}
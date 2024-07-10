import { useState } from "react";
import { useEffect } from "react";

function WeatherCard({forecast}) {

    if (!forecast || !forecast.main) {
        return null; 
    }
    
    let image ='./weather/src/assets/sun.png';

    if(forecast.main == 'Thunderstorm'){
        image ='./weather/src/assets/storm.png';
    } else if(forecast.main == 'Rain'){
        image='./weather/src/assets/rainy-day.png'
    } else if(forecast.main == 'Clouds'){
        image = './weather/src/assets/cloudy.png';
    } else {
        image ='./weather/src/assets/sun.png';
    }
    
    return(
    <div className="h-full w-[18%] mr-2 flex flex-col justify-around items-center bg-white rounded-lg shadow-md">
        <p className="text-gray-400 text-sm md:text-base font-mono font-bold">{forecast.date}</p>
        <img className="object cover w-[40%]" src={image} alt="sun photo" />
        <p className="text-gray-400 text-xs md:text-sm font-mono font-bold">{Math.round(forecast.temp - 273.15)}° C</p>
    </div>
    );
}

function Highlights({img, title, temp, unit=''}) {
    return(
        <div className="h-10 w-28 flex items-center">
            <img className="object-contain h-7 md:h-10 w-10 md:w-14" src={img} alt="" />
            <div className="flex flex-col justify-between">
                <p className="text-[12px] sm:text-[14px] font-sans text-gray-400 font-bold sm:font-semibold">
                    {title}
                </p>
                <p className="text-[0.75rem] font-mono text-gray-400 font-medium">
                    {temp}{unit}
                </p>
            </div>
        </div>
    );
}

export default function Forecast({forecast,weather}) {

    
      
      console.log(forecast)
    return (
        <div className="h-screen w-full bg-[#F6F6F8]">
            <div className="ml-4 md:ml-10 mt-[15%] w-full h-full">
                <p className="mb-4 font-mono text-gray-600 font-bold text-xl">Weekly Highlights</p>
                <div className="w-[90%] h-[14%] md:h-[19%]  flex">
                    <WeatherCard forecast={forecast[1]} />
                    <WeatherCard forecast={forecast[2]} />
                    <WeatherCard forecast={forecast[3]} />
                    <WeatherCard forecast={forecast[4]} />
                    <WeatherCard forecast={forecast[5]} />
                </div>
                <p className="mt-6 font-mono text-gray-600 font-bold text-xl">
                    Today's Highlight
                </p>
                <div className="mt-6 w-[90%] h-[23%] rounded-xl bg-white shadow-sm">
                    <div className="flex justify-around w-full h-[50%] items-center">
                    <Highlights img="/thermometer.png" title="Real Feel" temp={weather.feels_like} />
                    <Highlights img="/wind.png" title="Wind" temp={weather.speed} unit="km/h" />
                    <Highlights img="/sunrise.png" title="Sunrise" temp={weather.sunrise} />
                    </div>
                    <div className="flex justify-around w-full h-[50%] items-center">
                    <Highlights img="/humidity.png" title="Humidity" temp={weather.humidity} unit="%" />
                    <Highlights img="/barometer.png" title="Pressure" temp={weather.pressure} unit="hPa" />
                    <Highlights img="/sunset.png" title="Sunset" temp={weather.sunset} />
                    </div>
                </div>
            </div>
        </div>
    )
}
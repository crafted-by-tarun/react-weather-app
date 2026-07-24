import { useState } from "react"
import { ThreeDot } from 'react-loading-indicators'
export default function WeatherApp() {
    const [city, setCity] = useState("");
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

const url = `https://api.weatherapi.com/v1/forecast.json?key=e298e4452bd74de3a1c191518262306&q=${city}&days=5`;    let cards = [
        {
            title: "Humidity",
            value: `${info.current?.humidity}%`,
            icon: "💧"
        },
        {
            title: "Wind",
            value: `${info.current?.wind_kph}Km/h`,
            icon: "💨"
        },
        {
            title: "Feels Like",
            value: `${info.current?.feelslike_c}°C`,
            icon: "🌡️"
        },
        {
            title: "Visibility",
            value: `${info.current?.vis_km}Km`,
            icon: "👁️"
        }
    ]
    async function GetInfo() {
        if (!city.trim()) {
            alert("Please enter a city");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                alert(data.error.message);
                return;
            }
            setInfo(data);
        } catch (err) {
            alert(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="WeatherContainer">
            <h1>WEATHER APP</h1>
            <div>
                <div className="InputContainer">
                    <input type="text" value={city} placeholder="Enter City"
                        onKeyDown={(e) => { if (e.key === "Enter") GetInfo(); }}
                        onChange={(e) => { setCity(e.target.value) }}></input>
                    <button onClick={GetInfo}>Search</button>
                </div>

                {loading ? <div className="Loading"><ThreeDot  color="#4d18ec" size="medium" text="" textColor="" /></div> :
                    info.location && (
                        <div className="InfoContainer">
                            <div className="WeatherInfo">
                                <div className="CityInfo">  <p className="LocationName">{info.location.name},{info.location.country}</p></div>
                                <div className="TempInfo" >  <p className="temp"> {info.current.temp_c}°C</p></div>
                                <div className="CurrentConditions">
                                    <img src={`https:${info.current.condition.icon}`} alt={info.current.condition.text}></img>
                                    <p>{info.current.condition.text}</p>
                                </div>
                            </div>
                            <div className="cards">
                                {cards.map((card) => (
                                    <div className="card" key={card.title}>
                                        <h2>{card.title}</h2>
                                        <p>{card.value}</p>
                                        <p>{card.icon}</p>
                                    </div>))}
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

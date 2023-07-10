const Country = ({ country, weather }) => {
  const language_list = Object.keys(country.languages).map((key_name, i) => {
    return <li key={i}>{country.languages[key_name]}</li>;
  });

  const flagStyle = {
    fontSize: 300,
  };

  return (
    <div className="country-container">
      <h2>{country.name.common}</h2>
      <div className="country-info">
        <div style={flagStyle}>{country.flag}</div>
        <div className="country-minor-info">
          <p><b>Capital:</b> {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h4>Languages:</h4>
          <ul>{language_list}</ul>
        </div>
        <div className="country-weather">
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp}</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Country;

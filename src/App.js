import { useState, useEffect } from "react";
import axios from "axios";

import CountrySearch from "./Components/Search";
import Message from "./Components/Message";
import CountriesList from "./Components/CountriesList";
import Country from "./Components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [specific_country, setSpecificCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((all_countries) => {
        setCountries(all_countries.data);
      });
  }, []);

  const filtered_countries = countries.filter((country) => {
    if (specific_country) {
      return country.name.common === specific_country.name.common;
    }
    const country_name_array = country.name.common.toLowerCase().split("");
    const charIsInCountryName = (char, index) => {
      return country_name_array[index] === char;
    };
    return search.toLowerCase().split("").every(charIsInCountryName);
  });

  useEffect(() => {
    if (filtered_countries.length === 1 && !weather) {
      const api_key = process.env.REACT_APP_WEATHER_API_KEY;
      const [lat, lng] = filtered_countries[0].capitalInfo.latlng;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
        )
        .then((weather_data) => {
          setWeather(weather_data.data);
        });
    }
  }, [filtered_countries, weather]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    if (weather) {
      setSpecificCountry(null);
      setWeather(null);
    }
  };

  const handleShowButton = (name) => {
    setSearch(name);
    setSpecificCountry(
      countries.find((country) => {
        return country.name.common === name;
      })
    );
  };

  const determineCountriesDisplay = () => {
    if (filtered_countries.length > 10) {
      return <Message message="Too many matches, specify another filter" />;
    } else if (filtered_countries.length > 1) {
      return (
        <CountriesList
          countries={filtered_countries}
          handleClick={handleShowButton}
        />
      );
    } else if (filtered_countries.length === 1 && weather) {
      return <Country country={filtered_countries[0]} weather={weather} />;
    } else if (filtered_countries.length === 1 && !weather) {
      return <Message message="Loading country data" />;
    } else if (!filtered_countries.length && !countries.length) {
      return <Message message="Loading Countries" />;
    } else if (!filtered_countries.length) {
      return <Message message="No countries match search" />;
    }
  };

  return (
    <div className="main">
      <CountrySearch handleChange={handleSearchChange} current={search} />
      {determineCountriesDisplay()}
    </div>
  );
};

export default App;

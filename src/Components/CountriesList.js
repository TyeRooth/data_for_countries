const CountriesList = ({ countries, handleClick }) => {
  const list = countries.map((country) => {
    return (
      <div key={country.name.common} className="listed-country">
        {country.name.common}
        <button onClick={() => handleClick(country.name.common)}>Show</button>
      </div>
    );
  });

  return (
    <div className="info-container">
      <div className="countries-list-container">{list}</div>
    </div>
  );
};

export default CountriesList;

const CountrySearch = ({ handleChange, current }) => {
  return (
    <div className="search-container">
      Find countries: <input onChange={handleChange} value={current}></input>
    </div>
  );
};

export default CountrySearch;

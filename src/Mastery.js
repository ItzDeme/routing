import React, {useState, useEffect} from 'react';
import './App.css';
import Masteries from './Masteries';

require('dotenv').config();
function Mastery() {

  const [masteries, setMasteries] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(()=> {
    fetchItems();
  },[query]);

      const APP_KEY = process.env.REACT_APP_API_KEY;
    const fetchItems = async () => {
      if(query !== ""){
        const data = await fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${process.env.REACT_APP_API_KEY}`);
        
        const items = await data.json();
        const summonerId = items.id;

        const masteryData = await fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.REACT_APP_API_KEY}`);

      const masteryItems = await masteryData.json();
      setMasteries(masteryItems);
      }else{
        return <h1>Enter your summoner name.</h1>
      }
    }

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1 className="mastery-title">Mastery</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <h1 className="mastery-title">{query}</h1>
      <div className="master-div">
      {masteries.map(master =>(
        <Masteries key={master.championId} masteryPoints={master.championPoints} championId={master.championId}/>
      ))}
      </div>
    </div>
  );
}

export default Mastery;

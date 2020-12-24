import React from 'react';

const champions = require('./champion.json');

const Masteries = ({masteryPoints, championId}) => {


    return(
        <div className="mastery-divs">
            <GetName championIds={championId} />
            <h2>{masteryPoints}</h2>
        </div>
    );
}

export default Masteries;

function GetName({championIds}){
    var champName = champions.keys[championIds];
    return  (
        <div>
            <h1>{champName}</h1>
            <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${(champName === 'WuKong') ? 'MonkeyKing' : champName}.png`} alt=""/>
        </div>
        );
    };


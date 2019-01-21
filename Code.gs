var _heroes = {
  "Doomfist": 0,
  "Genji": 0,
  "McCree": 0,
  "Pharah": 0,
  "Reaper": 0,
  "Soldier 76": 0,
  "Ashe": 0,
  "Tracer": 0,
  "Sombra": 0,
  
  "Bastion": 0,
  "Hanzo": 0,
  "Junkrat": 0,
  "Mei": 0,
  "Torbjorn": 0,
  "Widowmaker": 0,
  
  "Dva": 0,
  "Reinhardt": 0,
  "Roadhog": 0,
  "Winston": 0,
  "Orisa": 0,
  "Zarya": 0,
  
  "Ana": 0,
  "Brigette": 0,
  "Mercy": 0,
  "Symmetra": 0,
  "Moira": 0,
  "Zenyatta": 0,
  "Lucio": 0
}

var _maps = {
  "Anubis" : 0,
  "Busan": 0,
  "Blizzard World": 0,
  "Dorado": 0,
  "Eichenwalde": 0,
  "Gibraltr": 0,
  "Hanamura": 0, 
  "Hollywood": 0,
  "Horizon": 0,
  "Ilios": 0,
  "Lijiang": 0,
  "Junkertown": 0,
  "King's Row": 0,
  "Nepal": 0,
  "Numbani": 0,
  "Oasis": 0,
  "Route 66": 0,
  "Volskaya": 0
}

var _modes = {
  "2CP": 0,
  "Hybrid": 0,
  "KOTH": 0,
  "Payload": 0
}

var _mapModes = {
  "Anubis" : "2CP",
  "Blizzard World": "Hybrid",
  "Dorado": "Payload",
  "Eichenwalde": "Hybrid",
  "Gibraltr": "Payload",
  "Hanamura": "2CP", 
  "Hollywood": "2CP",
  "Horizon": "2CP",
  "Ilios": "KOTH",
  "Lijiang": "KOTH",
  "Junkertown": "Payload",
  "King's Row": "Hybrid",
  "Nepal": "KOTH",
  "Numbani": "Hybrid",
  "Oasis": "KOTH",
  "Route 66": "Payload",
  "Volskaya": "2CP"
}

/**************************************************************
  STAT AND SR VALUES
***************************************************************/
function GETSR(scores) {
  var gained = 0;
  var lost = 0;
  
  var wins = 0;
  var losses = 0;
  var draws = 0;
  
  for(var i = 0; i < scores.length; i++) {    
    if(scores[i] > 0) {
      gained += parseInt(scores[i]);
      wins +=1
    } else if(scores[i] < 0) {
      lost += parseInt(scores[i]);
      losses +=1;
    } else if(parseInt(scores[i]) === 0) {
      draws += 1;
    }
  }
  
  var total = wins + losses + draws;
  
  response = [];
  response.push(['Total', 'Wins', 'Losses', 'Draws', 'Winrate']);
  
  var _winrate = ( ( wins / (total - draws) )  * 100 ).toFixed(2) + "%" ;
  
  response.push([total, wins, losses, draws, _winrate]);  
  response.push(['SR Gain', 'SR Loss', 'Net SR Gain', 'Net Avg SR Gain'])
  
  var _netSR = gained + lost;
  var _avgNetSR = ((gained + lost) / total).toFixed(2);

  response.push([gained, lost, _netSR, _avgNetSR]);
  response.push(['Avg Gain', 'Avg Loss']);
  
  var _avgGain = (gained / wins).toFixed(2);
  var _avgLoss = (lost / losses).toFixed(2);
  
  response.push([_avgGain, _avgLoss]);
  
  return response;
} 
/**************************************************************
  END STAT AND SR VALUES
***************************************************************/
/**************************************************************
  BY HERO
***************************************************************/
function GETHEROSTATS(names,scores) {
  var heroesTotal = JSON.parse(JSON.stringify(_heroes));
  var heroesTotalAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesWins = JSON.parse(JSON.stringify(_heroes));
  var heroesWinsAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesLosses = JSON.parse(JSON.stringify(_heroes));
  var heroesLossesAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesDraws = JSON.parse(JSON.stringify(_heroes));
  var heroesDrawsAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesTotalGain = JSON.parse(JSON.stringify(_heroes));
  var heroesTotalGainAdj= JSON.parse(JSON.stringify(_heroes));
  var heroesTotalLoss = JSON.parse(JSON.stringify(_heroes)); 
  var heroesTotalLossAdj= JSON.parse(JSON.stringify(_heroes));

  
  for(var i = 0; i < names.length; i++) {
    names[i].toString().split(',').forEach(function(name) {
      heroesTotal[name] += 1;
      heroesTotalAdj[name] += (1 / names[i].toString().split(',').length);
      
      if(parseInt(scores[i]) > 0) {
         heroesWins[name] += 1;
         heroesWinsAdj[name] += ( 1 / names[i].toString().split(',').length);
         heroesTotalGain[name] += parseInt(scores[i]); 
         heroesTotalGainAdj[name] += parseInt(scores[i]) * ( 1 / names[i].toString().split(',').length);  
      } else if(parseInt(scores[i]) < 0) {
         heroesLosses[name] += 1;
         heroesLossesAdj[name] += ( 1 / names[i].toString().split(',').length);
         heroesTotalLoss[name] += parseInt(scores[i]);
         heroesTotalLossAdj[name] += parseInt(scores[i]) * ( 1 / names[i].toString().split(',').length); 
      } else {
        heroesDraws[name] += 1;
        heroesDrawsAdj[name] += ( 1 / names[i].toString().split(',').length);
      }
    });
  }
  
  var response = [];
  response.push([
    'Heroes',
    'Games','Games Adj.', 
    'Winrate', 'Winrate Adj.',
    'Total Wins', 'Total Wins Adj', 
    'Total Losses', 'Total Losses Adj',
    'Net Gain', 'Net GainAdj',
    'Total Point Gain',
    'Total Point Loss']);
  
  for(hero in _heroes) {
    var tempArr = []
    tempArr.push(hero);
    
    var _heroesTotal = heroesTotal[hero];
    var _heroesTotalAdj = heroesTotalAdj[hero].toFixed(2);
    
    var _winrate = ( ( heroesWins[hero] / (heroesTotal[hero] - heroesDraws[hero]) ) * 100).toFixed(2) + '%';
    var _winrateAdj = ( ( heroesWinsAdj[hero] /  (heroesTotalAdj[hero] - heroesDrawsAdj[hero])) * 100).toFixed(2) + '%';
    var _breakEvenWinrateAdj = ( ( ( ( (heroesTotalLoss[hero] / heroesLosses[hero] ) * -1) / (heroesTotalGain[hero] / heroesWins[hero]) ) * .5) * 100 ).toFixed(2)  + '%' ;
    
    var _heroWins = heroesWins[hero]
    var _heroWinsAdj = heroesWinsAdj[hero].toFixed(2);
    
    var _heroLosses = heroesLosses[hero];
    var _heroLossesAdj = heroesLossesAdj[hero].toFixed(2);
    
    var _heroNetGain = heroesTotalGain[hero] + heroesTotalLoss[hero];
    var _heroNetGainAdj = (heroesTotalGainAdj[hero] + heroesTotalLossAdj[hero]).toFixed(2);
    
    //Total Games
    tempArr.push(_heroesTotal);
    tempArr.push(_heroesTotalAdj);
    // Winrates
    tempArr.push(_winrate);
    tempArr.push(_winrateAdj);
    //Total Wins
    tempArr.push(_heroWins);
    tempArr.push(_heroWinsAdj);
    // Losses
    tempArr.push(_heroLosses);
    tempArr.push(_heroLossesAdj);
    
    tempArr.push(_heroNetGain); // Net Gain
    tempArr.push(_heroNetGainAdj); //Net Adj Gain
  
    tempArr.push(heroesTotalGain[hero]); //Total Gain
    
    tempArr.push(heroesTotalLoss[hero]); //Total Loss

    response.push(tempArr);
  }
  
  return response;
}

/**************************************************************
  END BY HERO
***************************************************************/
/**************************************************************
  BY HERO RECENT GAMES
***************************************************************/
function GETHERORECENTGAMES(names,scores) {
  var totalGames = 15;
  
  var heroesGames = JSON.parse(JSON.stringify(_heroes));
  for(hero in heroesGames) {
    heroesGames[hero] = [];
  }
  
  var heroesRecentWins = JSON.parse(JSON.stringify(_heroes));
  for(hero in heroesGames) {
    heroesRecentWins[hero] = [];
  }
  
  var heroesRecentLosses = JSON.parse(JSON.stringify(_heroes));
  for(hero in heroesGames) {
    heroesRecentLosses[hero] = [];
  }
  
  var heroesRecentDraws = JSON.parse(JSON.stringify(_heroes));
  for(hero in heroesGames) {
    heroesRecentDraws[hero] = [];
  }
  
  for(var i = 0; i < names.length; i++) {
    if(!!names[i]) {
      names[i].toString().split(',').forEach(function(name) {
        if(Array.isArray(heroesGames[name])) {
          heroesGames[name].push(parseInt(scores[i]));
        } 
      });
    }
  }
  
  var response = [];
  response.push([
    'Hero',
    'Recent Games',
    'Win %', 'Loss %', 'Draw %']);
  

  for(hero in heroesGames) {
    var heroLength = heroesGames[hero].length;
    var tempArr = [];
    
    if(heroLength > totalGames) {
      var tempArr = heroesGames[hero].slice(totalGames * -1);
    } else {
      tempArr = heroesGames[hero];
    }
    
    heroesGames[hero] = tempArr;
  }
  
  for(hero in heroesGames) {
    heroesGames[hero].forEach(function(score) {
      if(score > 0) {
        heroesRecentWins[hero]++;
      } else if (score == 0) {
        heroesRecentDraws[hero]++;
      } else if(score < 0) {
        heroesRecentLosses[hero]++;
      }
    });
  }
  
  for(hero in _heroes) {
    var tempArr = [];
    tempArr.push(hero);
    
    tempArr.push( heroesGames[hero].length); // total recent games
    tempArr.push( (heroesRecentWins[hero] / heroesGames[hero].length * 100).toFixed(2) + '%' );
    tempArr.push( (heroesRecentLosses[hero] / heroesGames[hero].length * 100).toFixed(2)+ '%' );
    tempArr.push( (heroesRecentDraws[hero] / heroesGames[hero].length * 100).toFixed(2) + '%' );
    
    response.push(tempArr);
  }
  
  return response;
}

/**************************************************************
  END BY HERO RECENT GAMES
***************************************************************/



/**************************************************************
  BY HERO - SOLO
***************************************************************/
function GETHEROSTATSBYPARTY(names,scores,party) {
  var heroesTotal = JSON.parse(JSON.stringify(_heroes));
  var heroesTotalAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesWins = JSON.parse(JSON.stringify(_heroes));
  var heroesWinsAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesLosses = JSON.parse(JSON.stringify(_heroes));
  var heroesLossesAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesDraws = JSON.parse(JSON.stringify(_heroes));
  var heroesDrawsAdj = JSON.parse(JSON.stringify(_heroes));
  
  var heroesTotalGain = JSON.parse(JSON.stringify(_heroes));
  var heroesTotalGainAdj= JSON.parse(JSON.stringify(_heroes));
  var heroesTotalLoss = JSON.parse(JSON.stringify(_heroes)); 
  var heroesTotalLossAdj= JSON.parse(JSON.stringify(_heroes));

  
  for(var i = 0; i < names.length; i++) {
    if(party[i] == 'Solo') {
      names[i].toString().split(',').forEach(function(name) {
        heroesTotal[name] += 1;
        heroesTotalAdj[name] += (1 / names[i].toString().split(',').length);
        
        if(parseInt(scores[i]) > 0) {
          heroesWins[name] += 1;
          heroesWinsAdj[name] += ( 1 / names[i].toString().split(',').length);
          heroesTotalGain[name] += parseInt(scores[i]); 
          heroesTotalGainAdj[name] += parseInt(scores[i]) * ( 1 / names[i].toString().split(',').length);  
        } else if(parseInt(scores[i]) < 0) {
          heroesLosses[name] += 1;
          heroesLossesAdj[name] += ( 1 / names[i].toString().split(',').length);
          heroesTotalLoss[name] += parseInt(scores[i]);
          heroesTotalLossAdj[name] += parseInt(scores[i]) * ( 1 / names[i].toString().split(',').length); 
        } else {
          heroesDraws[name] += 1;
          heroesDrawsAdj[name] += ( 1 / names[i].toString().split(',').length);
        }
      });
    }
  }
  
  var response = [];
  response.push([
    'Heroes',
    'Games','Games Adj.', 
    'Winrate', 'Winrate Adj.',
    'Total Wins', 'Total Wins Adj', 
    'Total Losses', 'Total Losses Adj',
    'Net Gain', 'Net GainAdj',
    'Total Point Gain',
    'Total Point Loss', 'Total Point Loss Adj']);
  
  for(hero in _heroes) {
    var tempArr = []
    tempArr.push(hero);
    
    var _heroesTotal = heroesTotal[hero];
    var _heroesTotalAdj = heroesTotalAdj[hero].toFixed(2);
    
    var _winrate = ( ( heroesWins[hero] / (heroesTotal[hero] - heroesDraws[hero]) ) * 100).toFixed(2) + '%';
    var _winrateAdj = ( ( heroesWinsAdj[hero] /  (heroesTotalAdj[hero] - heroesDrawsAdj[hero])) * 100).toFixed(2) + '%';
    var _breakEvenWinrateAdj = ( ( ( ( (heroesTotalLoss[hero] / heroesLosses[hero] ) * -1) / (heroesTotalGain[hero] / heroesWins[hero]) ) * .5) * 100 ).toFixed(2)  + '%' ;
    
    var _heroWins = heroesWins[hero]
    var _heroWinsAdj = heroesWinsAdj[hero].toFixed(2);
    
    var _heroLosses = heroesLosses[hero];
    var _heroLossesAdj = heroesLossesAdj[hero].toFixed(2);
    
    var _heroNetGain = heroesTotalGain[hero] + heroesTotalLoss[hero];
    var _heroNetGainAdj = (heroesTotalGainAdj[hero] + heroesTotalLossAdj[hero]).toFixed(2);
    
    //Total Games
    tempArr.push(_heroesTotal);
    tempArr.push(_heroesTotalAdj);
    // Winrates
    tempArr.push(_winrate);
    tempArr.push(_winrateAdj);
    //Total Wins
    tempArr.push(_heroWins);
    tempArr.push(_heroWinsAdj);
    // Losses
    tempArr.push(_heroLosses);
    tempArr.push(_heroLossesAdj);
    
    tempArr.push(_heroNetGain); // Net Gain
    tempArr.push(_heroNetGainAdj); //Net Adj Gain
  
    tempArr.push(heroesTotalGain[hero]); //Total Gain
    
    tempArr.push(heroesTotalLoss[hero]); //Total Loss
    tempArr.push( (heroesTotalLoss[hero] / heroesTotalAdj[hero]).toFixed(2) ); //Total Adj Loss

    response.push(tempArr);
  }
  
  return response;
}
/**************************************************************
  END BY HERO - SOLO
***************************************************************/

/**************************************************************
  BY GAME MODE
***************************************************************/
function GETGAMEMODESTATS(maps,scores,heroes) {
  var totalGames = JSON.parse(JSON.stringify(_modes));
  var totalWins = JSON.parse(JSON.stringify(_modes));
  var totalLosses = JSON.parse(JSON.stringify(_modes));
  var totalPointGains = JSON.parse(JSON.stringify(_modes));
  var totalPointLosses = JSON.parse(JSON.stringify(_modes));

  for(var i = 0; i < maps.length; i++) {
    totalGames[_mapModes[maps[i]]] += 1;
    
    if(scores[i] > 0) {
      totalWins[_mapModes[maps[i]]] += 1;
      totalPointGains[_mapModes[maps[i]]] += parseInt(scores[i]);    
    } else if(parseInt(scores[i]) < 0) {
      totalLosses[_mapModes[maps[i]]] += 1;
      totalPointLosses[_mapModes[maps[i]]] += parseInt(scores[i]); 
    } 
  }
  
  var response = [];
  response.push([
    'Mode', 'Games',
    'Wins','Losses',
    'Winrate',
    'Net Gain',
    'Total Gains', 'Total Losses'
  ]);
  
  for(mode in _modes) {
    var tempArr = [];
    
    var _winrate = ( ( totalWins[mode] / totalGames[mode]) * 100 ).toFixed(2) + '%';
    var _netGain = totalPointGains[mode] + totalPointLosses[mode];
    var _avgNetGain = ( (totalPointGains[mode] + totalPointLosses[mode]) / totalGames[mode]).toFixed(2);
    
    tempArr.push(mode);
    tempArr.push(totalGames[mode]);
    
    tempArr.push(totalWins[mode]);
    tempArr.push(totalLosses[mode]);
    
    tempArr.push(_winrate);
    
    tempArr.push(_netGain);
    
    tempArr.push(totalPointGains[mode]);
    tempArr.push(totalPointLosses[mode]);
    
    response.push(tempArr);
  }
  
  return response;
  
}

/**************************************************************
  END GAME MODE
***************************************************************/

/**************************************************************
  BY MAP
***************************************************************/
function GETMAPSTATS(maps,scores,heroes) {
  var mapsPlayed = JSON.parse(JSON.stringify(_maps));
  var mapsWon = JSON.parse(JSON.stringify(_maps));
  var mapsLost = JSON.parse(JSON.stringify(_maps));
  var mapsTotalGain = JSON.parse(JSON.stringify(_maps)); 
  var mapsTotalLoss = JSON.parse(JSON.stringify(_maps));
  
  for(var i = 0; i < maps.length; i++) {
    mapsPlayed[maps[i]] += 1;
    
    if(scores[i] > 0) {
      mapsWon[maps[i]] += 1;
      mapsTotalGain[maps[i]] += parseInt(scores[i]);
    } else if(scores[i] < 0) {
      mapsLost[maps[i]] += 1;
      mapsTotalLoss[maps[i]] += parseInt(scores[i]);
    } 
  }
  
  
  var response = [];
  
  response.push([
    'Maps', 'Mode', 
    'Times Played', 'Times Won', 'Times Lost',
    'Winrate', 'Total Net Gain', 'Avg Net Gain',
    'Total Gain', 'Total Loss',
  ]);
  
  
  for(map in _maps) {
    var tempArr = [];
    tempArr.push(map);
    tempArr.push(_mapModes[map]);
  
    var _winrate = ( (mapsWon[map] / mapsPlayed[map]) * 100).toFixed(2) + '%' ;
    var _netGain = mapsTotalGain[map] + mapsTotalLoss[map];
    var _avgNetGain =  ((mapsTotalGain[map] + mapsTotalLoss[map]) / mapsPlayed[map]).toFixed(2);
    
    tempArr.push(mapsPlayed[map]);
    tempArr.push(mapsWon[map]);
    tempArr.push(mapsLost[map]);
  
    tempArr.push(_winrate);
    tempArr.push(_netGain);
    tempArr.push(_avgNetGain);
  
    tempArr.push(mapsTotalGain[map]);
    tempArr.push(mapsTotalLoss[map]);

    

    response.push(tempArr);   
  }
  
  return response;
}
/**************************************************************
  END BY MAP
***************************************************************/

/**************************************************************
  BY HERO BY MAP
***************************************************************/
function GETMAPSTATSBYHERO(maps,scores,heroes) {
  var totalGames = JSON.parse(JSON.stringify(_maps));
  for(map in totalGames) {
    totalGames[map] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalGamesAdj = JSON.parse(JSON.stringify(_maps));
  for(map in totalGamesAdj) {
    totalGamesAdj[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalWins = JSON.parse(JSON.stringify(_maps));
  for(map in totalWins) {
    totalWins[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalWinsAdj = JSON.parse(JSON.stringify(_maps));
  for(map in totalWinsAdj) {
    totalWinsAdj[map] = JSON.parse(JSON.stringify(_heroes));;
  } 
  var totalGains = JSON.parse(JSON.stringify(_maps));
  for(map in totalGains) {
    totalGains[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalGainsAdj = JSON.parse(JSON.stringify(_maps));
  for(map in totalGainsAdj) {
    totalGainsAdj[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalLosses = JSON.parse(JSON.stringify(_maps));
  for(map in totalLosses) {
    totalLosses[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalLossesAdj = JSON.parse(JSON.stringify(_maps));
  for(map in totalLossesAdj) {
    totalLossesAdj[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalPointGains = JSON.parse(JSON.stringify(_maps));
  for(map in totalPointGains) {
    totalPointGains[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalPointGainsAdj = JSON.parse(JSON.stringify(_maps));
  for(map in totalPointGainsAdj) {
    totalPointGainsAdj[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalPointLosses = JSON.parse(JSON.stringify(_maps));
  for(map in totalPointLosses) {
    totalPointLosses[map] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalPointLossesAdj = JSON.parse(JSON.stringify(_maps));
  for(map in totalPointLossesAdj) {
    totalPointLossesAdj[map] = JSON.parse(JSON.stringify(_heroes));;
  }


  for(var i = 0; i < maps.length; i++) {
    heroes[i].toString().split(',').forEach(function(hero) {
      if(!!hero && hero.length > 0) {
        totalGames[maps[i]][hero] += 1;
        totalGamesAdj[maps[i]][hero] += (1 / heroes[i].toString().split(',').length );
        
        if(scores[i] > 0) {
          totalWins[maps[i]][hero] += 1; 
          totalWinsAdj[maps[i]][hero] += (1 / heroes[i].toString().split(',').length );
          totalPointGains[maps[i]][hero] += parseInt(scores[i]);
          totalPointGainsAdj[maps[i]][hero] += parseInt(scores[i]) * (1 / heroes[i].toString().split(',').length);

        } else if(parseInt(scores[i]) < 0) {
          totalLosses[maps[i]][hero] +=1;
          totalLossesAdj[maps[i]][hero] += (1 / heroes[i].toString().split(',').length );
          totalPointLosses[maps[i]][hero] += parseInt(scores[i]);
          totalPointLossesAdj[maps[i]][hero] += (parseInt(scores[i]) * (1 / heroes[i].toString().split(',').length) );
          

        } 
      }
    });
  }

  var response = [];
  response.push([
    'Maps', 'Hero', 
    'Matches', 'Times Played Adj',
    'Wins', 'Wins Adj',
    'Losses', 'Losses Adj',
    'Winrate', 'Adj Winrate',
    'Net Gain', 'Net Gain Adj',
    'Total Point Gain', 'Total Point Gain Adj', 'Total Point Losses', 'Total Point Losses Adj',
  ]);  
  
  for(map in _maps) {
    response.push([map]);
    
    for(hero in _heroes) {
      var tempArr = [];
      tempArr.push('',hero); //push empty string for first element to "indent"
      
      var _winrate = ( (totalWins[map][hero] / totalGames[map][hero]) * 100).toFixed(2)  + '%';
      var _winrateAdj = ( (totalWinsAdj[map][hero] / totalGamesAdj[map][hero]) * 100).toFixed(2) + '%';
      var _netGain = totalPointGains[map][hero] + totalPointLosses[map][hero];
      var _netGainAdj = (totalPointGainsAdj[map][hero] + totalPointLossesAdj[map][hero]).toFixed(2);
      var _totalGain = totalPointGains[map][hero];
      var _totalGainAdj = (totalPointGainsAdj[map][hero]).toFixed(2);
      var _totalLoss = totalPointLosses[map][hero];
      var _totalLossAdj = (totalPointLossesAdj[map][hero]).toFixed(2);
      
      tempArr.push(totalGames[map][hero]);
      tempArr.push((totalGamesAdj[map][hero]).toFixed(2));
      tempArr.push(totalWins[map][hero]);
      tempArr.push((totalWinsAdj[map][hero]).toFixed(2));
      tempArr.push(totalLosses[map][hero]);
      tempArr.push((totalLossesAdj[map][hero]).toFixed(2));
      
      tempArr.push(_winrate);
      tempArr.push(_winrateAdj);
      
      tempArr.push(_netGain);
      tempArr.push(_netGainAdj);
      
      tempArr.push(_totalGain);
      tempArr.push(_totalGainAdj)
      tempArr.push(_totalLoss);
      tempArr.push(_totalLossAdj);
      
      response.push(tempArr);
    } 
    
    response.push([]); // line break
  }
  
  return response;
}
/**************************************************************
  END BY HERO BY MAP
***************************************************************/

/**************************************************************
  BY HERO BY MODE
***************************************************************/
function GETMODESTATSBYHERO(maps,scores,heroes) {
  var totalGames = JSON.parse(JSON.stringify(_modes))
  for(mode in totalGames) {
    totalGames[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalGamesAdj = JSON.parse(JSON.stringify(_modes));
  for(mode in totalGamesAdj) {
    totalGamesAdj[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalWins = JSON.parse(JSON.stringify(_modes))
  for(mode in totalWins) {
    totalWins[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalWinsAdj = JSON.parse(JSON.stringify(_modes))
  for(mode in totalWinsAdj) {
    totalWinsAdj[mode] = JSON.parse(JSON.stringify(_heroes));
  } 
  var totalGains = JSON.parse(JSON.stringify(_modes))
  for(mode in totalGains) {
    totalGains[mode] = JSON.parse(JSON.stringify(_heroes));;
  }
  var totalGainsAdj = JSON.parse(JSON.stringify(_modes))
  for(mode in totalGainsAdj) {
    totalGainsAdj[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalLosses = JSON.parse(JSON.stringify(_modes))
  for(mode in totalLosses) {
    totalLosses[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalLossesAdj = JSON.parse(JSON.stringify(_modes))
  for(mode in totalLossesAdj) {
    totalLossesAdj[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalPointGains = JSON.parse(JSON.stringify(_modes))
  for(mode in totalPointGains) {
    totalPointGains[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalPointGainsAdj = JSON.parse(JSON.stringify(_modes))
  for(mode in totalPointGainsAdj) {
    totalPointGainsAdj[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalPointLosses = JSON.parse(JSON.stringify(_modes))
  for(mode in totalPointLosses) {
    totalPointLosses[mode] = JSON.parse(JSON.stringify(_heroes));
  }
  var totalPointLossesAdj = JSON.parse(JSON.stringify(_modes))
  for(mode in totalPointLossesAdj) {
    totalPointLossesAdj[mode] = JSON.parse(JSON.stringify(_heroes));
  }


  for(var i = 0; i < maps.length; i++) {
    heroes[i].toString().split(',').forEach(function(hero) {
      if(!!hero && hero.length > 0) {
        totalGames[_mapModes[maps[i]]][hero] += 1;
        totalGamesAdj[_mapModes[maps[i]]][hero] += (1 / heroes[i].toString().split(',').length );
        
        if(scores[i] > 0) {
          totalWins[_mapModes[maps[i]]][hero] += 1; 
          totalWinsAdj[_mapModes[maps[i]]][hero] += (1 / heroes[i].toString().split(',').length );
          totalPointGains[_mapModes[maps[i]]][hero] += parseInt(scores[i]);
          totalPointGainsAdj[_mapModes[maps[i]]][hero] += parseInt(scores[i]) * (1 / heroes[i].toString().split(',').length);

        } else if(parseInt(scores[i]) < 0) {
          totalLosses[_mapModes[maps[i]]][hero] +=1;
          totalLossesAdj[_mapModes[maps[i]]][hero] += (1 / heroes[i].toString().split(',').length );
          totalPointLosses[_mapModes[maps[i]]][hero] += parseInt(scores[i]);
          totalPointLossesAdj[_mapModes[maps[i]]][hero] += (parseInt(scores[i]) * (1 / heroes[i].toString().split(',').length) );
          

        } 
      }
    });
  }

  var response = [];
  response.push([
    'Maps', 'Hero',
    'Matches', 'Matches Adj',
    'Wins', 'Wins Adj',
    'Losses', 'Losses Adj',
    'Winrate', 'Adj Winrate',
    'Net Gain', 'Net Gain Adj',
    'Total Point Gain', 'Total Point Gain Adj', 'Total Point Losses', 'Total Point Losses Adj'
  ]);  
  
  for(mode in _modes) {
    response.push([mode]);
    
    for(hero in _heroes) {
      var tempArr = [];
      tempArr.push('',hero); //push empty string for first element to "indent"
         
      var _winrate = ( (totalWins[mode][hero] / totalGames[mode][hero]) * 100).toFixed(2)  + '%';
      var _winrateAdj = ( (totalWinsAdj[mode][hero] / totalGamesAdj[mode][hero]) * 100).toFixed(2) + '%';
      var _netGain = totalPointGains[mode][hero] + totalPointLosses[mode][hero];
      var _netGainAdj = (totalPointGainsAdj[mode][hero] + totalPointLossesAdj[mode][hero]).toFixed(2);
      var _totalGain = totalPointGains[mode][hero];
      var _totalGainAdj = (totalPointGainsAdj[mode][hero]).toFixed(2);
      var _totalLoss = totalPointLosses[mode][hero];
      var _totalLossAdj = (totalPointLossesAdj[mode][hero]).toFixed(2);
      
      tempArr.push(totalGames[mode][hero]);
      tempArr.push((totalGamesAdj[mode][hero]).toFixed(2));
      tempArr.push(totalWins[mode][hero]);
      tempArr.push((totalWinsAdj[mode][hero]).toFixed(2));
      tempArr.push(totalLosses[mode][hero]);
      tempArr.push((totalLossesAdj[mode][hero]).toFixed(2));
      
      tempArr.push(_winrate);
      tempArr.push(_winrateAdj);
      
      tempArr.push(_netGain);
      tempArr.push(_netGainAdj);
      
      tempArr.push(_totalGain);
      tempArr.push(_totalGainAdj)
      tempArr.push(_totalLoss);
      tempArr.push(_totalLossAdj);
      

      response.push(tempArr);
    } 
    
    response.push([]); // line break
  }
  
  return response;
}
/**************************************************************
  END BY HERO BY MODE
***************************************************************/

/**************************************************************
  MISCELLANEOUS
***************************************************************/

function GETCURRENTSR(input) {
  var arr = input;
  var value = 0;
  
  arr.forEach(function(item) {
    if(item > 0) {
      value = item;
    }
  });
    
  return value;
}
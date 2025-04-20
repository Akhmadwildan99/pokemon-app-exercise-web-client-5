import { FC } from 'react';
import { Pokemon } from '../types';
import './PokemonDetail.scss'; // Import CSS file for styling

interface Props{
 pokemon?:Pokemon|null; // Bisa null saat loading atau error.
}

const PokemonDetail : FC<Props> = ({pokemon})=>{
 if(!pokemon) return null;

  const healthPercent = (pokemon.stats.hp / 1000) *100;

 return (
   <div className="pokemon-detail">
    <div className="header">
       {/* <img src="/pokemon-logo-white.png" alt="Pokémon Logo" className="logo" /> */}
       <span className="id">#{pokemon.id.toString().padStart(4,'0')}</span>
     </div>
     <img src={pokemon.image} alt={pokemon.name} className="pokemon-image"/>

     <div className="name-row">
       <h1>{pokemon.name}</h1>
       {/* Contoh icon pixel art kecil bisa pakai img atau svg */}
       <img 
         src={pokemon.image}
         alt={`${pokemon.name} icon`}
         className="small-icon"
        />
     </div>

    <div className='stats-card'>
      {/* Health bar */}
      <label>Health</label>
      <div className='health-bar'>
        <div 
          style={{width:`${healthPercent}%`}} 
          className='health-fill'
        ></div>
      </div>
      <p><b>{pokemon.stats.hp}</b> from 1000</p>

      {/* Attack & Defense */}
      <hr/>
      <div className='atk-def'>
        <span><label className='stat-label'>Attack</label><br/><br/><p>{pokemon.stats.attack}</p></span>
        <span><label className='stat-label'>Defense</label><br/><br/><p>{pokemon.stats.defense}</p></span>
      </div>
    </div>

   </div>);
};

export default PokemonDetail;


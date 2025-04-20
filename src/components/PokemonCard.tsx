import { Link } from "react-router-dom";
import { Pokemon } from "../types";
import "./PokemonCard.scss"; // Import CSS file for styling

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => (
  <Link to={`/detail/${pokemon.id}`}>

    <div className="pokemon-card">
      <div className="card-header">
        <span className="type-label">{pokemon.type}</span>
        <span className="id-label">#{pokemon.id.toString().padStart(4, "0")}</span>
      </div>
      <div className="card-image">
        <img src={pokemon.image} alt={`${pokemon.name} Pokémon`} />
      </div>
      <div className="card-footer">
        <h3 className="pokemon-name">{pokemon.name}</h3>
      </div>
    </div>
  </Link>
);

export default PokemonCard;

import { Link } from "react-router-dom";
import { Pokemon } from "../types";
import "./PokemonCardGrid.scss"; // Import CSS file for styling

interface Props {
  pokemon: Pokemon;
}

const PokemonCardGrid = ({ pokemon }: Props) => (
  <Link to={`/detail/${pokemon.id}`} >
    <div className="pokemon-card-grid">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <div className="pokemon-name">
        {pokemon.name.split(" ").map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </div>
    </div>
  </Link>
);


export default PokemonCardGrid;

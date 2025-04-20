import { Pokemon } from "../types";
import PokemonCard from "./PokemonCard";
import PokemonCardGrid from "./PokemonCardGrid";
import "./PokemonList.scss"; // Import CSS file for styling

interface Props {
  pokemons: Pokemon[];
  viewType: "grid" | "list";
}

const PokemonList = ({ pokemons, viewType }: Props) => (
  <div className={`list-container ${viewType === "grid" ? "list-container-grid-view" : "list-container-list-view"}`}>
    {pokemons.map((poke) =>
      viewType === "list" ? (
        <PokemonCard key={poke.id} pokemon={poke} />
      ) : <PokemonCardGrid key={poke.id} pokemon={poke} />
    )}
  </div>
);

export default PokemonList;

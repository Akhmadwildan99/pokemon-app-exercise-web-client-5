import  { useEffect, useState } from "react";
import axios from "axios";
import type { Pokemon } from "../types";
import PokemomList from "../components/PokemonList";
import SortAndToggle from "../components/SortAndToggle";
import HeaderNavbar from "../components/HeaderNavbar";

function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [sortOption, setSortOption] = useState('name');
  const [view, setView] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      let results = res.data.results;

      let detailed = await Promise.all(
        results.map(async (p: any) => {
          let pokeRes = await axios.get(p.url);
          return {
            id: pokeRes.data.id,
            name: pokeRes.data.name,
            image: pokeRes.data.sprites.other["official-artwork"].front_default,
            type: pokeRes.data.types.map((t: any) => t.type.name),
            stats: {
              hp: pokeRes.data.stats.find((s: any) => s.stat.name === "hp")
                .base_stat,
              attack: pokeRes.data.stats.find(
                (s: any) => s.stat.name === "attack"
              ).base_stat,
              defense: pokeRes.data.stats.find(
                (s: any) => s.stat.name === "defense"
              ).base_stat,
            },
          };
        })
      );
      setPokemons(detailed);
    }
    fetchData();
  }, []);

    useEffect(() => {
        const sortedPokemons = [...pokemons].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'attack') {
            return a.stats.attack - b.stats.attack;
        } else if (sortOption === 'defense') {
            return a.stats.defense - b.stats.defense;
        } else if (sortOption === 'hp') {
            return a.stats.hp - b.stats.hp;
        }
        return 0;
        });
    
        setPokemons(sortedPokemons);
    }, [sortOption]);

  return (
    <>
     <HeaderNavbar isHome={true}/>
      <SortAndToggle onSortChange={setSortOption} onViewChange={setView} />
      {!pokemons.length ? (
        <span>Loading...</span>
      ) : (
        <PokemomList pokemons={pokemons} viewType={view} />
      )}
    </>
  );
}

export default Home;

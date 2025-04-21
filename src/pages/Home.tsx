import { useEffect, useState } from "react";
import axios from "axios";
import type { Pokemon } from "../types";
import PokemomList from "../components/PokemonList";
import SortAndToggle from "../components/SortAndToggle";
import HeaderNavbar from "../components/HeaderNavbar";

function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [sortOption, setSortOption] = useState("name");
  const [view, setView] = useState<"list" | "grid">("grid");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        let res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
          { signal }
        );
        let results = res.data.results;

        let detailed = await Promise.all(
          results.map(async (p: { url: string; }) => {
            try {
              let pokeRes = await axios.get(p.url, { signal });
                return {
                id: pokeRes.data.id as number,
                name: pokeRes.data.name as string,
                image: pokeRes.data.sprites.other["official-artwork"]
                  .front_default as string,
                type: pokeRes.data.types.map(
                  (t: { type: { name: string } }): string => t.type.name
                ),
                stats: {
                  hp: pokeRes.data.stats.find(
                  (s: { stat: { name: string }; base_stat: number }) =>
                    s.stat.name === "hp"
                  )?.base_stat as number,
                  attack: pokeRes.data.stats.find(
                  (s: { stat: { name: string }; base_stat: number }) =>
                    s.stat.name === "attack"
                  )?.base_stat as number,
                  defense: pokeRes.data.stats.find(
                  (s: { stat: { name: string }; base_stat: number }) =>
                    s.stat.name === "defense"
                  )?.base_stat as number,
                },
                };
            } catch (error) {
              if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
              } else {
                console.error("Error fetching Pokemon data:", error);
              }
            }
          })
        );

        // Filter out any undefined values that might result from canceled requests
        detailed = detailed.filter((p) => p !== undefined);

        setPokemons(detailed);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching Pokemon data:", error);
        }
      }
    }

    fetchData();

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const sortedPokemons = [...pokemons].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "attack") {
        return a.stats.attack - b.stats.attack;
      } else if (sortOption === "defense") {
        return a.stats.defense - b.stats.defense;
      } else if (sortOption === "hp") {
        return a.stats.hp - b.stats.hp;
      }
      return 0;
    });

    setPokemons(sortedPokemons);
  }, [sortOption]);

  return (
    <>
      <HeaderNavbar isHome={true} />
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

import  { useEffect, useState } from "react";
import axios from "axios";
import type { Pokemon } from "../types";
import Pokemondetailcomponent from "../components/PokemonDetail";
import { useParams } from "react-router-dom";
import HeaderNavbar from "../components/HeaderNavbar";

function Detail() {
  const { id } = useParams<{ id: string }>(); // id sebagai string dari url param.
  const [pkm, setPkm] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function getOne() {
      try {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPkm({
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.other["official-artwork"].front_default,
          type: res.data.types.map((t: { type: { name: any } }) => t.type.name),
          stats: {
            hp: res.data.stats.find(
              (s: { stat: { name: string } }) => s.stat.name === "hp"
            ).base_stat,
            attack: res.data.stats.find(
              (s: { stat: { name: string } }) => s.stat.name === "attack"
            ).base_stat,
            defense: res.data.stats.find(
              (s: { stat: { name: string } }) => s.stat.name === "defense"
            ).base_stat,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
    getOne();
  }, [id]);

  return (
    <>
      <HeaderNavbar isHome={false}/>
      <Pokemondetailcomponent pokemon={pkm} />
    </>
  );
}

export default Detail;

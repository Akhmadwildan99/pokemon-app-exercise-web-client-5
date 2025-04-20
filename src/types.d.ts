export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string[];
  stats: PokemonStats;
}

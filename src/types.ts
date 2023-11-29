export type Card = {
  name: string;
  type_name: string;
  code: string;
  threat: number;
  willpower: number;
  attack: number;
  defense: number;
  health: number;
  quantity: number;
  deck_limit: number;
  imagesrc: string;
  text: string;
};
export type Deck = {
  heroes: {
    [key: string]: string;
  };
};

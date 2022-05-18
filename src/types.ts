export type Book = {
  url: string;
  name: string;
  isbn: string;
  authors: Array<string>;
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: Date;
  characters: Array<string>;
  povCharacters: Array<string>;
};
export type Character = {
  url: string;
  name: string;
  gender: "Female" | "Male";
  culture: string;
  born: string;
  died: string;
  titles: Array<string>;
  aliases: Array<string>;
  father: string;
  mother: string;
  spouse: string;
  allegiances: any[];
  books: Array<string>;
  povBooks: Array<string>;
  tvSeries: Array<string>;
  playedBy: Array<string>;
};

export type House = {
  url: string;
  name: string;
  gender: "Female" | "Male";
  culture: string;
  born: string;
  died: string;
  titles: Array<string>;
  aliases: Array<string>;
  father: string;
  mother: string;
  spouse: string;
  allegiances: any[];
  books: Array<string>;
  povBooks: Array<string>;
  tvSeries: Array<string>;
  playedBy: Array<string>;
};

export type ResourceResult = {
  books: Array<Book>;
  characters: Array<Character>;
  houses: Array<House>;
};

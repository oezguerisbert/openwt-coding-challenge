export const API_URL = "https://www.anapioficeandfire.com/api";
export const localStorageName = "openwt-coding-challenge-login";
export enum Resource {
  Books = "books",
  Characters = "characters",
  Houses = "houses",
}
export const API_URLs: Record<Resource, string> = {
  books: `${API_URL}/books?pageSize=10000`,
  characters: `${API_URL}/characters?pageSize=10000`,
  houses: `${API_URL}/houses?pageSize=10000`,
};
export const ResourcesList = Object.values(Resource) as unknown as readonly [
  string,
  ...string[]
];

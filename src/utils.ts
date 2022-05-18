import { Book, Character, House } from "./types";

export const filterBooks = (search: string, obj: Book) =>
  Object.entries(obj).some(([key, value]) =>
    new RegExp(`.*${search.toLowerCase()}.*`).test(
      value.toString().toLowerCase()
    )
  );

export const filterCharacters = (search: string, obj: Character) =>
  Object.entries(obj).some(([key, value]) =>
    new RegExp(`.*${search.toLowerCase()}.*`).test(
      value.toString().toLowerCase()
    )
  );

export const filterHouses = (search: string, obj: House) =>
  Object.entries(obj).some(([key, value]) =>
    new RegExp(`.*${search.toLowerCase()}.*`).test(
      value.toString().toLowerCase()
    )
  );

export const nonDuplicate = <T extends { name: string }>(obj: Array<T>) => {
  const nonDuplicate: Array<T> = [];
  for (const x of obj) {
    if (nonDuplicate.findIndex((c) => c.name === x.name) === -1) {
      nonDuplicate.push(x);
    }
  }
  return nonDuplicate;
};

import { Book, Character, House } from "./types";

const searchCase = (search: string) => `.*${search.toLowerCase()}.*`;

type FilterOptions<T> = {
  omit: { [key in keyof T]?: boolean };
};

type FilterObjectType = <T>(
  regex: RegExp,
  objEntries: [key: keyof T, value: any],
  options?: FilterOptions<T>
) => boolean;

const filterObject: FilterObjectType = (regex, [key, value], options) => {
  let arrayResult = false;
  if (options?.omit?.[key]) {
    return false;
  }
  if (Array.isArray(value)) {
    arrayResult = value.some((entry) => regex.test(entry.toString()));
  }
  return (
    arrayResult ||
    regex.test(value.toString().toLowerCase()) ||
    regex.test(key.toString().toLowerCase())
  );
};
const objectKeys = <T>(obj: T) => Object.entries(obj) as [keyof T, any];

export const filterBooks = (
  search: string = "",
  obj: Book,
  options?: FilterOptions<Book>
) => {
  const regex = new RegExp(searchCase(search));
  return (
    search.length === 0 ||
    objectKeys(obj).some(([key, value]) =>
      filterObject(regex, [key, value], options)
    )
  );
};

export const filterCharacters = (
  search: string,
  obj: Character,
  options?: FilterOptions<Character>
) => {
  const regex = new RegExp(searchCase(search));
  return (
    search.length === 0 ||
    objectKeys(obj).some(([key, value]) =>
      filterObject(regex, [key, value], options)
    )
  );
};

export const filterHouses = (
  search: string,
  obj: House,
  options?: FilterOptions<House>
) => {
  const regex = new RegExp(searchCase(search));
  return (
    search.length === 0 ||
    objectKeys(obj).some(([key, value]) =>
      filterObject(regex, [key, value], options)
    )
  );
};

export const nonDuplicate = <T extends { name: string }>(obj: Array<T>) => {
  const nonDuplicate: Array<T> = [];
  for (const x of obj) {
    if (nonDuplicate.findIndex((c) => c.name === x.name) === -1) {
      nonDuplicate.push(x);
    }
  }
  return nonDuplicate;
};

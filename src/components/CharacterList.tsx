import { useState, useEffect } from "react";
import { Character } from "../types";
import { nonDuplicate } from "../utils";

interface CharacterListProps {
  links: Array<string>;
}

const characters: Array<Character> = [];

export const CharacterList = ({ links }: CharacterListProps) => {
  const [content, setContent] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const newCharacters: Array<Character> = [];
      setContent(newCharacters);
      for (let link of links) {
        if (!characters.some((character) => character.url === link)) {
          const result = await fetch(link).then((response) => response.json());
          newCharacters.push(result);
        }
      }
      setContent(nonDuplicate(newCharacters));
      setLoading(false);
    })();
  }, [links]);
  return (
    <div className="flex flex-col w-full align-start justify-start">
      {loading
        ? "Loading..."
        : content
            .filter((character) => character.name.length > 0)
            .map((character) => (
              <div
                key={character.url}
                className="flex flex-row w-full h-auto flex-1"
              >
                {character.name}
              </div>
            ))}
    </div>
  );
};

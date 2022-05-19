import { useEffect, useState } from "react";
import { API_URLs } from "../constants";
import { Character } from "../types";
import { filterCharacters, nonDuplicate } from "../utils";
import { Modal } from "./Modal";

interface Props {
  search: string;
}

const CharactersList = ({ search }: Props) => {
  const [content, setContent] = useState<Array<Character>>([]);
  const [character, setCharacter] = useState<Character>();
  const [modal, setModal] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const result = (
        (await fetch(API_URLs.characters).then((response) =>
          response.json()
        )) as Array<Character>
      ).filter((c) => c.name.length > 0);
      setContent(nonDuplicate(result));
    })();
  }, []);

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {content &&
          content
            ?.filter((theCharacter) => filterCharacters(search, theCharacter))
            .map((theCharacter, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-slate-300 p-3 py-6"
                onClick={() => {
                  setCharacter(theCharacter);
                  setModal(true);
                }}
              >
                {theCharacter.name}
              </div>
            ))}
      </div>
      {modal && character && <Modal item={character} />}
    </>
  );
};
export default CharactersList;

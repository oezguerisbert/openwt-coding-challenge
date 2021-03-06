import { useEffect, useState } from "react";
import { useDisclosure } from "react-use-disclosure";
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
  const [loading, setLoading] = useState<boolean>(true);
  const { close: modalClose, isOpen, open: modalOpen } = useDisclosure(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: Array<Character> = await fetch(API_URLs.characters).then(
        (response) => response.json()
      );
      setContent(nonDuplicate(result.filter(({ name }) => name.length > 0)));
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {content &&
          content
            .filter((theCharacter) => filterCharacters(search, theCharacter))
            .map((theCharacter, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-slate-300 p-3 py-6"
                onClick={() => {
                  setCharacter(theCharacter);
                  setModal(true);
                  modalOpen();
                }}
              >
                {theCharacter.name}
              </div>
            ))}
      </div>
      {modal && character && (
        <Modal
          isOpen={isOpen}
          modalClose={modalClose}
          modalOpen={modalOpen}
          item={character}
          replace={{
            father: <div className="flex">{character.name}</div>,
            spouse: <div className="flex">{character.spouse}</div>,
          }}
        />
      )}
    </>
  );
};

export default CharactersList;

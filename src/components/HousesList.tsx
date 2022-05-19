import { useEffect, useState } from "react";
import { useDisclosure } from "react-use-disclosure";
import { API_URLs } from "../constants";
import { House } from "../types";
import { filterHouses, nonDuplicate } from "../utils";
import { Modal } from "./Modal";

interface Props {
  search: string;
}

const HousesList = ({ search }: Props) => {
  const [content, setContent] = useState<Array<House>>([]);
  const [house, setHouse] = useState<House>();
  const [modal, setModal] = useState<boolean>();

  const { close: modalClose, isOpen, open: modalOpen } = useDisclosure(true);

  useEffect(() => {
    (async () => {
      const result = await fetch(API_URLs.houses).then((response) =>
        response.json()
      );
      setContent(nonDuplicate(result));
    })();
  }, []);

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {content
          ?.filter((house) => filterHouses(search, house))
          .map((theHouse) => (
            <div
              key={theHouse.name}
              className="cursor-pointer hover:bg-slate-300 p-3 py-6"
              onClick={() => {
                setHouse(theHouse);
                setModal(true);
              }}
            >
              {theHouse.name}
            </div>
          ))}
      </div>
      {modal && house && (
        <Modal
          isOpen={isOpen}
          modalClose={modalClose}
          modalOpen={modalOpen}
          item={house}
        />
      )}
    </>
  );
};

export default HousesList;

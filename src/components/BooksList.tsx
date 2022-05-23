import { useEffect, useState } from "react";
import { useDisclosure } from "react-use-disclosure";
import { API_URLs } from "../constants";
import { Book } from "../types";
import { filterBooks, nonDuplicate } from "../utils";
import { CharacterList } from "./CharacterList";
import { Modal } from "./Modal";

interface Props {
  search: string;
}

const BooksList = ({ search }: Props) => {
  const [content, setContent] = useState<Array<Book>>([]);
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>();

  const { close: modalClose, isOpen, open: modalOpen } = useDisclosure(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fetch(API_URLs.books).then((response) =>
        response.json()
      );
      setContent(nonDuplicate(result));
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full">
        {content &&
          content
            .filter((theBook) =>
              filterBooks(search, theBook, {
                omit: { characters: true },
              })
            )
            .map((theBook) => (
              <div
                key={theBook.isbn}
                className="cursor-pointer hover:bg-slate-300 p-3 py-6"
                onClick={() => {
                  setBook(theBook);
                  setModal(true);
                  modalOpen();
                }}
              >
                {theBook.name}
              </div>
            ))}
      </div>
      {modal && book && (
        <Modal
          modalClose={modalClose}
          modalOpen={modalOpen}
          isOpen={isOpen}
          item={book}
          replace={{
            characters: book.characters.length,
            povCharacters:
              book.povCharacters.length <= 10 ? (
                <CharacterList links={book.povCharacters} />
              ) : (
                book.povCharacters.length
              ),
          }}
        />
      )}
    </>
  );
};
export default BooksList;

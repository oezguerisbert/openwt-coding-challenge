import { useEffect, useState } from "react";
import { API_URLs } from '../constants';
import { Book } from "../types";
import { filterBooks, nonDuplicate } from '../utils';
import { Modal } from './Modal';

interface Props {
  search: string
}

const BooksList = ({ search }: Props) => {

  const [content, setContent] = useState<Array<Book>>([]);
  const [book, setBook] = useState<Book>();
  const [modal, setModal] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const result = await fetch(API_URLs.books).then((response) => response.json());
      setContent(nonDuplicate(result));
    })();
  }, []);

  return <>
    <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full">
      {content && content?.filter((theBook) => filterBooks(search, theBook)).map((theBook) => (<div key={theBook.isbn} className="cursor-pointer hover:bg-slate-300 p-3 py-6" onClick={() => { setBook(theBook); setModal(true); }}>{theBook.name}</div>))}
    </div>
    {modal && book && <Modal item={book} />}
  </>;
}
export default BooksList;

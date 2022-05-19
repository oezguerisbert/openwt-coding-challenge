import {
  lazy,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { API_URL, Resource, ResourcesList } from "../constants";
import { UserContext } from "../Context";
import { ResourceResult } from "../types";

const BooksList = lazy(() => import("./BooksList"));
const CharactersList = lazy(() => import("./CharactersList"));
const HousesList = lazy(() => import("./HousesList"));

type ContentViewType = (search: string) => Record<Resource, ReactNode>;
const ContentView: ContentViewType = (search: string) => ({
  books: <BooksList search={search} />,
  characters: <CharactersList search={search} />,
  houses: <HousesList search={search} />,
});

const GameOfThrones = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [resources, setResources] = useState<ResourceResult>();
  const [selectedResource, setSelectedResource] = useState<Resource>(
    Resource.Books
  );
  const [search, setSearch] = useState<string>("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL).then((r) => r.json());
      setResources(res);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-2">
        {resources &&
          Object.entries(ResourcesList).map(([k, name]) => (
            <button
              className={`${
                selectedResource === name ? "bg-blue-400" : "bg-slate-100"
              } flex px-3 py-2 justify-center items-center hover:bg-slate-300`}
              key={name}
              value={name}
              onClick={() => {
                formRef.current?.reset();
                setSelectedResource(name as Resource);
              }}
            >
              {name}
            </button>
          ))}
        <div className="flex flex-grow" />
        <form
          ref={formRef}
          className="flex w-1/3"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchInputRef.current?.value ?? "");
          }}
        >
          <input
            ref={searchInputRef}
            className="flex w-full"
            name="search"
            placeholder="Search..."
          />
        </form>
        <button
          className="flex p-2 py-3 bg-slate-600 text-white mx-auto w-auto px-8 font-bold"
          onClick={() => {
            userContext.setNeedsLogin(true);
          }}
        >
          Logout
        </button>
      </div>
      <div className="bg-slate-100 p-4 w-full">
        <Suspense fallback="Loading">
          {ContentView(search)[selectedResource]}
        </Suspense>
      </div>
    </div>
  );
};
export default GameOfThrones;

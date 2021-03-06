import { ReactNode, useEffect } from "react";

interface ModalProps {
  item: any;
  isOpen: boolean;
  modalOpen: Function;
  modalClose: Function;
  replace?: { [name: string]: ReactNode };
}

export const Modal = ({
  item,
  isOpen,
  modalOpen,
  modalClose,
  replace,
}: ModalProps) => {
  useEffect(() => {
    modalOpen();
    const escHandler = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        modalClose();
      }
    };
    window.addEventListener("keyup", escHandler);
    return () => {
      window.removeEventListener("keyup", escHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      tabIndex={-1}
      className={`${
        !isOpen ? "hidden" : ""
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex items-center justify-center bg-slate-500/80 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.name}{" "}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => modalClose()}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            {Object.entries(item)
              .filter(([, value]) => (value as any).toString().length > 0)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-flow-row grid-cols-2 w-full"
                >
                  <div className="flex flex-1 w-min capitalize">{key}</div>
                  <div className="flex flex-1 text-ellipsis overflow-clip w-full text-left">
                    {replace && Object.keys(replace).includes(key)
                      ? replace[key]
                      : (Array.isArray(value)
                          ? value.join(", ")
                          : (value as any)
                        ).toString()}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => modalClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

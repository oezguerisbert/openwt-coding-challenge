import { Modal as FlowbiteModal } from "flowbite-react";
import { useDisclosure } from "react-use-disclosure";
import { useEffect } from 'react';

interface ModalProps {
  item: any;
}

export const Modal = ({ item }: ModalProps) => {
  const { close, isOpen, open } = useDisclosure(true);
  useEffect(() => {
    open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return <FlowbiteModal
    show={isOpen}
    onClose={close}
  >
    <FlowbiteModal.Header>{item.name}</FlowbiteModal.Header>
    <FlowbiteModal.Body className="space-y-6">
      {Object.entries(item).filter(([, value]) => (value as any).toString().length > 0).map(([key, value]) => <div key={key} className="grid grid-flow-row grid-cols-2 w-full">
        <div className="flex flex-1 w-min capitalize">{key}</div>
        <div className="flex flex-1 text-ellipsis overflow-clip w-full">{(value as any).toString()}</div>
      </div>)}
    </FlowbiteModal.Body>
    <FlowbiteModal.Footer>
      <button className="flex p-3 py-2 bg-blue-300 hover:bg-blue-400" onClick={close}>Close</button>
    </FlowbiteModal.Footer>
  </FlowbiteModal>
}
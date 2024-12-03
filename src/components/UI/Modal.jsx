import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";


export default function Modal({children, open, onClose, className = ''}) {
  const dialog =useRef();
  useEffect(()=>{
    const modal = dialog.current;
    if(open){
      modal.showModal();
    }else{
      modal.close();
    }
  },[open]);
  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-min-percentage shadow-2xl ${className}`} >{children}</dialog>,
    document.getElementById("modal")
  );
}

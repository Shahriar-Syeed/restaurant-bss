
import { useState } from "react";
import Loading from "../components/loader/Loading.jsx";
export default function useLoading() {

  const [load, setLoad]= useState(false);



  return (
    {
      loader: load ? <Loading/> : null,
      startLoad: ()=>setLoad(true),
      endLoad: ()=>setLoad(false),

    }
  );
}

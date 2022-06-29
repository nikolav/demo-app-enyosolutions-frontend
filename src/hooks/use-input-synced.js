import { useState } from "react";
export default function useInputSynced(initialValue = {}) {
  const [input, setInput] = useState(initialValue);

  //   return [sync_, input];
  return { sync: sync_, inputs: input, setInput };

  function sync_(evt) {
    setInput((current) => ({
      ...current,
      [evt.target.name]: evt.target.value,
    }));
  }
}
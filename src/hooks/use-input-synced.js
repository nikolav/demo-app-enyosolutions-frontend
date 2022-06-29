import { useState } from "react";
export default function useInputSynced(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const setInput_ = (name, value) =>
    setInputs((current) => ({ ...current, [name]: value }));
  const sync = (evt) => setInput_(evt.target.name, evt.target.value);
  //
  return { sync, inputs, setInput: setInput_ };
}

import React, { createContext, useState, ReactNode } from "react";
import runChat from "@/utils/gemini";
interface ContextValue {
  previousPrompt: string[];
  setPreviousPrompt: React.Dispatch<React.SetStateAction<string[]>>;
  onSend: (prompt: string) => Promise<void>;
  setRecent: React.Dispatch<React.SetStateAction<string>>;
  recent: string;
  show: boolean;
  resData: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
export const Context = createContext<ContextValue | undefined>(undefined);
interface ContextProviderProps {
  children: ReactNode;
}
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [input, setInput] = useState<string>("");
  const [recent, setRecent] = useState<string>("");
  const [previousPrompt, setPreviousPrompt] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [resData, setResData] = useState<string>("");
  const delayResponse = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResData((prev) => prev + nextWord);
    }, 75);
  };
  const onSend = async (prompt: string) => {
    setResData("");
    setShow(true);
    setRecent(input);
    const response = await runChat(input);
    const responseArr = response.split("**");
    let newArr = "";
    for (let i = 0; i < responseArr.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newArr += responseArr[i];
      } else {
        newArr += `<b>${responseArr[i]}</b>`;
      }
    }
    const newResponse = newArr.split("*").join("<br/>");
    const newResponseArray = newResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayResponse(i, nextWord + " ");
    }
    setInput("");
  };
  const contextValue: ContextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSend,
    setRecent,
    recent,
    show,
    resData,
    input,
    setInput,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;

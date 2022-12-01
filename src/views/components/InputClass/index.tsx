import React, { useCallback, useState } from "react";

import styles from "./index.module.scss";

import { useToDoStore } from "../../../data/stores/useToDoStore";

interface I_InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<I_InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.inputPlus}>
      <input
        className={styles.inputPlusValue}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введіть текст..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />

      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.inputPlusButton}
      ></button>
    </div>
  );
};

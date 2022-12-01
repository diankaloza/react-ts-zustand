import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

import { useToDoStore } from "../../../data/stores/useToDoStore";

interface I_InputTask {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<I_InputTask> = ({
  id,
  title,
  onDone,
  onEdit,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode) {
      inputRef?.current?.focus();
    }
  }, [editMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={editMode}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              onDone(id);
            }
          }}
          checked={checked}
          className={styles.inputTaskCheckbox}
        />
        {editMode ? (
          <input
            ref={inputRef}
            className={styles.inputTaskTitleEdit}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdit(id, value);
                setEditMode(false);
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {editMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdit(id, value);
            setEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setEditMode(true);
          }}
        ></button>
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      ></button>
    </div>
  );
};

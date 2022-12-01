import React, { useEffect } from "react";

import styles from "./index.module.scss";

import { useToDoStore } from "../../data/stores/useToDoStore";
import { InputPlus } from "../components/InputClass";
import { InputTask } from "../components/InputTask";

export const App: React.FC = () => {
  const [tasks, createTask, upDateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.upDateTask,
    state.removeTask,
  ]);

  console.log(tasks);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To do App</h1>
      <section className={styles.articleCection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleCection}>
        {tasks.length === 0 && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdit={upDateTask}
            onRemoved={removeTask}
            key={task.id}
          />
        ))}
      </section>
    </article>
  );
};

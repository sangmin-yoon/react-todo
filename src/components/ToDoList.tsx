import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryObj, categoryState, toDoSelector } from "../atoms";
import CreateCat from "./CreateCat";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const cat = useRecoilValue(categoryObj);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      <div>
        <h1>to Dos</h1>
        <hr />
        <CreateCat />
        <hr />
        <select value={category} onInput={onInput}>
          {Object.keys(cat).map((item) => (
            <option key={item} value={cat[item]}>
              {cat[item]}
            </option>
          ))}
        </select>
        <CreateToDo />
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </div>
    </>
  );
}

export default ToDoList;

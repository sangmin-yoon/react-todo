import { categoryObj, IToDo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const cat = useRecoilValue(categoryObj);

  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1);
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {Object.keys(cat).map(
        (item) =>
          category !== cat[item] && (
            <button key={item} onClick={() => onClick(cat[item])}>
              {cat[item]}
            </button>
          )
      )}
      <button onClick={onDelete}>delete</button>
    </li>
  );
}

export default ToDo;

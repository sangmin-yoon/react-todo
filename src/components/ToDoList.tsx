import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from "recoil";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IForm {
  toDo: string;
}

interface IToDo {
  id: number;
  text: string;
  catrgory: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, catrgory: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <>
      <div>
        <h1>to Dos</h1>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("toDo", {
              required: "toDo를 입력해 주세요",
            })}
            type="text"
            placeholder="오늘 할 일은?"
          />
          <button>Add</button>
        </form>
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>{toDo.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;

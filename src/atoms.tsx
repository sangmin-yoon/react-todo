import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

interface catObj {
  [key: string]: string;
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

const newCat = JSON.parse(localStorage.getItem("createCat")!);

export const categoryObj = atom<catObj>({
  key: "testCat",
  default: {
    TO_DO: "TO_DO",
    DOING: "DOING",
    DONE: "DONE",
    ...newCat,
  },
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos")!) || [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    localStorage.setItem("toDos", JSON.stringify(toDos));

    return toDos.filter((toDo) => toDo.category === category);
  },
});

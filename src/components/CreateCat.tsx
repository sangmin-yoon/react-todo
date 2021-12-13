import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryObj } from "../atoms";

interface IForm {
  createCat: string;
}

function CreateCat() {
  const setCat = useSetRecoilState(categoryObj);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = ({ createCat }: IForm) => {
    setCat((prev) => {
      localStorage.setItem(
        "createCat",
        JSON.stringify({ ...prev, [createCat]: createCat })
      );
      return {
        ...prev,
        [createCat]: createCat,
      };
    });
    setValue("createCat", "");
  };

  return (
    <>
      <h3>카테고리 추가</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("createCat", {
            required: "입력해 주세요",
          })}
          type="text"
          placeholder="추가 카테고리 이름을 입력"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateCat;

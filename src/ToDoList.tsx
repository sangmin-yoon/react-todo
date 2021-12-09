import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) return setToDoError("To do는 더 길어야 합니다.");
//   };

//   return (
//     <>
//       <div>
//         <form onSubmit={onSubmit}>
//           <input
//             onChange={onChange}
//             type="text"
//             value={toDo}
//             placeholder="오늘 할 일은?"
//           />
//           <button>Add</button>
//           {toDoError !== "" ? toDoError : null}
//         </form>
//       </div>
//     </>
//   );
// }

interface IForm {
  Email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "패스워드가 다릅니다." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onValid)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {" "}
          <input
            {...register("Email", {
              required: "입력해주세요",
              minLength: {
                value: 5,
                message: "5자이상입력",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: "네이버 주소만 가능합니다.",
              },
            })}
            type="text"
            placeholder="Email"
          />
          <span>{errors?.Email?.message}</span>
          <input
            {...register("firstName", { required: "입력해주세요" })}
            placeholder="First Name"
          />
          <span>{errors?.firstName?.message}</span>
          <input
            {...register("lastName", {
              required: "입력해주세요",
              validate: {
                nomin: (value) => (value.includes("min") ? "no min" : true),
                nosang: (value) => (value.includes("sang") ? "no sang" : true),
              },
            })}
            placeholder="Last Name"
          />
          <span>{errors?.lastName?.message}</span>
          <input
            {...register("username", {
              required: "입력해주세요",
              minLength: 10,
            })}
            placeholder="Username"
          />
          <span>{errors?.username?.message}</span>
          <input
            {...register("password", {
              required: "입력해주세요",
              minLength: 5,
            })}
            placeholder="Password"
          />
          <span>{errors?.password?.message}</span>
          <input
            {...register("password1", {
              required: "입력해주세요",
            })}
            placeholder="Password1"
          />
          <span>{errors?.password1?.message}</span>
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default ToDoList;

import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
        onChange={onChange}
      />
      <i className={`fi ${icon} input-icon`}></i>

      {type === "password" ? (
        <i
          className={`fi fi-rr-eye${
            !passwordVisible ? "-crossed" : ""
          } input-icon left-[auto] right-4 cursor-pointer`}
          onClick={() => setPasswordVisible((prev) => !prev)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};
export default InputBox;

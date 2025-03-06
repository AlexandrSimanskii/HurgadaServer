import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useRef, useState } from "react";

import { useContext } from "react";
import { CustomContext } from "../../utils/Context/Context";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    
    watch,
  } = useForm({ mode: "onBlur" });

  const {  registerUser, loginUser, authError } = useContext(CustomContext);

  const [visiblePwd, setVisiblePwd] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { pathname } = useLocation();
  const password = useRef({});
  password.current = watch("password", "");

  const submitForm = (data) => {
    let { confirmPwd, ...username } = data;

    if (pathname === "/login") {
      loginUser(username);
    } else {
      registerUser(username);
    }
  };
console.log(authError);
  return (
    <div className="register">
      <div className="register__left">
        {authError && <p className="register-error">{authError}</p>}
        <h2>{pathname === "/register" ? "Регистрация" : "Вход"}</h2>
        {pathname === "/login" && (
          <p>
            Если у вас нет аккаунта вы
            <br /> можете зарегестрироваться
            <Link to={"/register"}>
              <span> здесь !</span>
            </Link>
          </p>
        )}
        <form
          onSubmit={handleSubmit(submitForm)}
          noValidate
          className="form"
          action="submit"
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className=" form__box-field form__box-field_email">
              <input
                {...register("email", {
                  required: {
                    message: "Email обязателен к заполнению",
                    value: true,
                  },
                  minLength: {
                    message: "Минимум 8 символов",
                    value: true,
                  },
                  pattern: {
                    message: "Напишите корректный Email",
                    value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
                  },
                })}
                id="email"
                className="form-field"
                type="email"
                placeholder="Ввидите свой Email"
              />
            </div>
            <p className="register__label-error">{errors.email?.message}</p>
          </div>

          {pathname === "/register" && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className=" form__box-field form__box-field_username">
                  <input
                    {...register("username", {
                      required: {
                        message: "Имя обязательно к заполнению",
                        value: true,
                      },
                      minLength: {
                        message: "Минимум 3 символа",
                        value: 3,
                      },
                      pattern: {
                        message: "Используйте только буквы",
                        value: /([a-zA-Z]+|[а-яА-Я])+/,
                      },
                    })}
                    id="username"
                    className="form-field"
                    type="text"
                    placeholder="Ввидите своe имя"
                  />
                </div>
                <p className="register__label-error">
                  {errors.username?.message}
                </p>
              </div>{" "}
              <div className="form-group">
                <label htmlFor="number">TEL</label>
                <div className=" form__box-field form__box-field_tel">
                  <InputMask
                    mask={`+\\7\\(\\999)-999-99-99`}
                    {...register("number", {
                      required: {
                        message: "Обязательно к заполнению",
                        value: true,
                      },
                      minLength: {
                        message: "Минимум 11 символов",
                        value: 14,
                      },
                      pattern: {
                        message: "Введите все цифры",
                        value: /^\+7\(9\d{2}\)-\d{3}-\d{2}-\d{2}$/,
                      },
                    })}
                    id="number"
                    className="form-field"
                    type="tel"
                    placeholder="Введите номер телефона"
                  />
                </div>
                <p className="register__label-error">
                  {errors.number?.message}
                </p>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className=" form__box-field form__box-field_password">
              <input
                {...register("password", {
                  required: {
                    message: "Обязательно к заполнению",
                    value: true,
                  },
                  minLength: {
                    message: "Минимум 8 символов",
                    value: 8,
                  },
                  pattern: {
                    message:
                      "Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра",
                    value: /^[a-zA-Z0-9]+/,
                  },
                })}
                id="password"
                className="form-field"
                type={visiblePassword ? "text" : "password"}
                placeholder="Ввидите пароль"
              />
              <img
                onClick={() => {
                  setVisiblePassword((prev) => !prev);
                }}
                src={`/images/icons/${
                  visiblePassword ? "eyeInvisible" : "eye"
                }.png`}
                alt="eye"
              />
            </div>
            <p className="register__label-error">{errors.password?.message}</p>
          </div>

          {pathname === "/register" && (
            <div className="form-group">
              <label htmlFor="confirmPwd">ConfirmPassword</label>
              <div className=" form__box-field form__box-field_password">
                <input
                  {...register("confirmPwd", {
                    validate: (value) =>
                      value === password.current || "Пароли не совпадают",
                  })}
                  id="confirmPwd"
                  className="form-field"
                  type={visiblePwd ? "text" : "password"}
                  placeholder="Подтвердите пароль "
                />
                <img
                  onClick={() => {
                    setVisiblePwd((prev) => !prev);
                  }}
                  src={`/images/icons/${
                    visiblePwd ? "eyeInvisible" : "eye"
                  }.png`}
                  alt="eye"
                />
              </div>
              <p className="register__label-error">
                {errors.confirmPwd?.message}
              </p>
            </div>
          )}

          <input
            className="form-button"
            type="submit"
            value={pathname === "/register" ? "Зарегистрироваться" : "Войти"}
          />
        </form>
      </div>
      <div className="register__right">
        <img src="/images/image/Login.jpg" alt="sign in" />
        <h3>Sign in to name</h3>
      </div>
    </div>
  );
};

export default Form;

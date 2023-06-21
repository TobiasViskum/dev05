import { twJoin } from "tailwind-merge";
import { useRef, useState } from "react";
import SpinningIcon from "./SpinningIcon";

export default function Login({}: {}) {
  const [loginResponse, setLoginResponse] = useState(<></>);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const nameRef = useRef<string>("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const divTw =
    "border-solid border-2 border-inactive w-5/6 rounded-md bg-first";
  const inputTw =
    "bg-first placeholder-[var(--text-second)] text-center rounded-md w-full outline-none text-first pb-3 autofill:bg-first autofill:hover:bg-first autofill:focus:bg-first autofill:active:bg-first [transition:_background-color_9999s_ease-in-out_0s] autofill:text-first autofill:hover:text-first autofill:focus:text-first autofill:active:text-first";
  const pTw = "absolute -bottom-8";

  async function handleFormSubmit() {
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (typeof localStorage !== "undefined") {
        const response = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            mail: email,
            password: password,
          }),
        });
        const result: {
          message: "success" | "failed" | "error";
          description?: string;
          encryptedUid?: string;
          name?: string;
          uid?: string;
        } = await response.json();
        console.log(result);

        if (result.message === "error") {
          setLoginResponse(
            <p className={twJoin(pTw, "text-red-600")}>An error happened</p>
          );
        } else if (result.message === "failed") {
          setLoginResponse(
            <p className={twJoin(pTw, "text-yellow-500")}>
              {result.description}
            </p>
          );
        } else if (
          result.message === "success" &&
          result.name &&
          result.encryptedUid
        ) {
          localStorage.setItem("mail", email);
          localStorage.setItem("sessionKey", result.encryptedUid);

          nameRef.current = result.name;
          setLoginResponse(
            <p className={twJoin(pTw, "text-green-500")}>Success!</p>
          );
          setHasLoggedIn(true);
          setTimeout(() => {
            location.href = `/${result.uid}`;
          }, 2000);
        }
      }
    }
  }

  function onFocus() {
    setLoginResponse(<></>);
  }

  if (hasLoggedIn) {
    return (
      <div className="text-center place-items-center gap-y-3 grid">
        <SpinningIcon />
        <h2 className="font-medium">Welcome back, {nameRef.current}!</h2>
      </div>
    );
  } else {
    return (
      <>
        <div className="z-10 relative w-full grid place-items-center">
          <div className="flex flex-col items-center gap-y-4 w-full min-w-small max-w-[calc(var(--max-width-small)_*_1.1)]">
            <h2 className="text-3xl font-semibold">Login</h2>
            <form className="w-full grid place-items-center">
              <fieldset className={twJoin(divTw)}>
                <legend className="ml-4 px-1 text-base font-bold text-second">
                  E-mail
                </legend>
                <input
                  onFocus={onFocus}
                  name="email"
                  ref={emailRef}
                  className={inputTw}
                  spellCheck={false}
                  placeholder="example@gmail.com"
                />
              </fieldset>
              <fieldset className={twJoin(divTw)}>
                <legend className="ml-4 px-1 text-base font-bold text-second">
                  Password
                </legend>
                <input
                  onFocus={onFocus}
                  name="password"
                  ref={passwordRef}
                  autoComplete="on"
                  type="password"
                  className={inputTw}
                  spellCheck={false}
                  placeholder="..."
                />
              </fieldset>
            </form>
            <button
              onClick={handleFormSubmit}
              className="bg-[var(--text-active)] text-first font-bold w-1/2 max-w-tiny py-2 rounded-md"
            >
              Login
            </button>
          </div>
          {loginResponse}
        </div>

        <div className="flex flex-col gap-x-1 bottom-8 absolute z-10">
          <p>
            Don{"'"}t have an account{"?"}
          </p>
          <button className="text-active">Sign up now</button>
        </div>
      </>
    );
  }
}

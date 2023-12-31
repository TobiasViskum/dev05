"use client";

import { useEffect, useState } from "react";
import SpinningIcon from "./SpinningIcon";
import Login from "./Login";
import { twJoin } from "tailwind-merge";
import verifyUser from "./verifyUser";

export default function ClientHandler() {
  const [isProcessingVisible, setIsProcessingVisible] = useState(true);
  const [processingTitle, setIsProcessingTitle] = useState(
    <h2 className="font-medium">Loading...</h2>
  );
  const [mainElement, setMainElement] = useState(<></>);
  const [verifyResponse, setVerifyResponse] = useState("");

  function changeProcessingTitle(elm: JSX.Element) {
    setIsProcessingTitle(elm);
  }
  function changeIsProcessingVisible(bool: Boolean) {
    setIsProcessingVisible(false);
  }
  function changeMainElement(elm: JSX.Element) {
    setMainElement(<Login />);
  }

  useEffect(() => {
    const sessionKey = localStorage.getItem("sessionKey");
    const mail = localStorage.getItem("mail");
    setTimeout(() => {
      if (!sessionKey || !mail) {
        setIsProcessingTitle(<h2 className="font-medium">Not logged in...</h2>);
        setTimeout(() => {
          setIsProcessingVisible(false);
          setMainElement(<Login />);
        }, 2000);
      } else if (sessionKey && mail) {
        setIsProcessingTitle(<h2 className="font-medium">Verifying...</h2>);
        setTimeout(() => {
          verifyUser({
            sessionKey: sessionKey,
            mail: mail,
            changeProcessingTitle: changeProcessingTitle,
            changeIsProcessingVisible: changeIsProcessingVisible,
            changeMainElement: changeMainElement,
          });
        }, 250);
      }
    }, 250);
  }, []);

  return (
    <>
      <div
        className={twJoin(
          "grid place-items-center gap-y-3 text-center",
          isProcessingVisible ? "grid" : "hidden"
        )}
      >
        <SpinningIcon />
        {processingTitle}
      </div>
      {mainElement}
    </>
  );
}

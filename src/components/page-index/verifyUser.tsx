import Login from "./Login";

interface Props {
  sessionKey: string;
  mail: string;
  changeProcessingTitle: (elm: JSX.Element) => void;
  changeIsProcessingVisible: (bool: Boolean) => void;
  changeMainElement: (elm: JSX.Element) => void;
}

export default async function verifyUser({
  sessionKey,
  mail,
  changeProcessingTitle,
  changeIsProcessingVisible,

  changeMainElement,
}: Props) {
  const response = await fetch("/api/user/verify", {
    method: "POST",
    body: JSON.stringify({
      sessionKey: sessionKey,
      mail: mail,
    }),
  });
  const result: {
    message: "success" | "failed" | "error";
    name?: string;
    uid?: string;
  } = await response.json();

  if (result.message === "error") {
    changeProcessingTitle(
      <h2 className="font-medium text-red-600">An error happened...</h2>
    );
    setTimeout(() => {
      changeIsProcessingVisible(false);
      changeMainElement(<Login />);
    }, 1000);
  } else if (result.message === "failed") {
    changeProcessingTitle(
      <h2 className="font-medium text-yellow-500">Failed to login</h2>
    );
    setTimeout(() => {
      changeIsProcessingVisible(false);
      changeMainElement(<Login />);
    }, 1000);
  } else if (result.message === "success") {
    changeProcessingTitle(
      <h2 className="font-medium">Welcome back, {result.name}!</h2>
    );
    setTimeout(() => {
      location.href = `/${result.uid}`;
    }, 2000);
  }
}

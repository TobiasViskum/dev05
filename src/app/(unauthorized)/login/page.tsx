import { SubmitLogin } from "./SubmitLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage({ params }: ViskumAppParams) {
  return (
    <>
      <main className="grid w-full place-items-center gap-x-4 text-center">
        <h1 className="mb-4 mt-12 text-4xl font-bold">Login</h1>
        <p className="text-second">Please login with your uid:</p>
        <SubmitLogin />
      </main>
    </>
  );
}

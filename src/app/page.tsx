import Link from "next/link";

export default async function RootPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-4 text-center">
        <h1 className="my-4 text-4xl font-bold">Viskum App</h1>
        <Link
          prefetch={false}
          href={"/login"}
          className="text-active underline"
        >
          Go to Login Page
        </Link>
        <h2 className="mt-2 text-2xl font-semibold">
          You can download this website as an App! (PWA)
        </h2>
        <p className="text-second">
          But it{"'"}s recommended to wait until you have logged in
        </p>
        <h2 className="text-2xl font-semibold">How to download:</h2>
        <div>
          <h3 className="font-bold">iOS:</h3>
          <p className="text-second">Share {"→"} Add to Homescreen</p>
        </div>
        <div>
          <h3 className="text-bold">Android:</h3>
          <p className="text-second">...</p>
        </div>
      </div>
    </>
  );
}

interface Props {
  title: string;
}

export default function StartShadow({ title }: Props) {
  return (
    <>
      {title === "start" ? (
        <div className="absolute top-[-1rem] h-4 w-full shadow-[0_0_30px_45px] shadow-[var(--bg-first)]"></div>
      ) : (
        <></>
      )}
    </>
  );
}

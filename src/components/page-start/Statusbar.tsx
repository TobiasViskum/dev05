interface Props {}

export default function Statusbar(props: Props) {
  return (
    <>
      <div className="relative h-16 w-full rounded-md bg-second mb-8">
        <div className="absolute left-6 top-[-0.5rem] h-8 w-8 rotate-45 bg-second" />
        <p className="absolute left-2 top-2 text-second">
          Tell others about yourself or what you are up to!
        </p>
      </div>
    </>
  );
}

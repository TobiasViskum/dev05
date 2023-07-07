export default function GroupHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid min-w-small vsm:gap-y-2">{children}</div>;
}

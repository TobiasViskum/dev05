import Image from "next/image";
import { profileTobias } from "@/assets/images";

interface Props {
  profileData: string;
}

export default function ProfileHolder(props: Props) {
  const profileData: ProfileData = JSON.parse(props.profileData);

  return (
    <>
      <div className="h-48 w-48 min-w-[184px] rounded-full border-4 border-white shadow-circle-4xl shadow-first">
        <Image
          priority
          src={profileTobias}
          alt="profileIcon"
          className="rounded-full"
        />
      </div>
      <h1 className="my-6 min-w-small text-center text-4xl font-bold">
        {profileData.name} {profileData.last_name}
      </h1>
    </>
  );
}

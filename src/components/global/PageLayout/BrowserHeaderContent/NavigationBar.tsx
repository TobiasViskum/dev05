"use client";

import { getLinkLayout } from "@/lib/util/linkLayout";
import { useParams } from "next/navigation";
import { arrowDown } from "@/assets/images";
import Image from "next/image";
import { Fragment, useState } from "react";
import { twJoin } from "tailwind-merge";
import Link from "next/link";

export default function NavigationBar() {
  const [activeLinkGroup, setActiveLinkGroup] = useState("");

  const params = useParams();
  const uid = params.uid as string;
  const linkLayout = getLinkLayout(uid);

  function changeActiveLinkGroup(title: string) {
    setActiveLinkGroup(title);
  }

  return (
    <>
      {linkLayout.map((item, index) => {
        if (item.links.length === 0) {
          return null;
        } else {
          return (
            <Fragment key={index}>
              <button
                className={twJoin(
                  "group relative h-10 w-32 rounded-full transition-colors",
                  activeLinkGroup === item.heading ? "bg-neutral-800" : ""
                )}
                onMouseEnter={() => changeActiveLinkGroup(item.heading)}
                onMouseLeave={() => changeActiveLinkGroup("")}
                onFocus={() =>
                  activeLinkGroup === item.heading
                    ? changeActiveLinkGroup("")
                    : changeActiveLinkGroup(item.heading)
                }
              >
                <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center gap-x-2 px-2 py-1.5">
                  <p>{item.heading}</p>
                  <div
                    className={twJoin(
                      "grid place-items-center rounded-full p-2 transition-transform dt:hover:bg-neutral-700",
                      activeLinkGroup === item.heading ? "rotate-180" : "rotate-0"
                    )}
                  >
                    <Image src={arrowDown} alt="arrow" width={12} height={12} />
                  </div>
                </div>
                <div
                  className="absolute top-12 grid w-full rounded-lg transition-grid"
                  style={{
                    gridTemplateRows: activeLinkGroup === item.heading ? "1fr" : "0fr",
                  }}
                >
                  <div className="z-10 grid h-full w-full gap-y-2 overflow-hidden rounded-xl bg-neutral-800 shadow-br-md shadow-black">
                    {item.links.map((link, index2) => {
                      return (
                        <Fragment key={index2}>
                          <Link key={index2} className="first:mt-2 last:mb-2" href={link.href}>
                            {link.title}
                          </Link>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
                {/* <div class="relative h-64 w-64">
                  <img
                    class="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                    alt="Flower"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
                    <p class="text-lg font-bold text-gray-900">Blurred</p>
                  </div>
                </div> */}
              </button>
            </Fragment>
          );
        }
      })}
    </>
  );
}

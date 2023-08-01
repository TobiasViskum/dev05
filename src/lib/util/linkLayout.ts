export function getLinkLayout(uid: string) {
  const linkLayout: {
    heading: string;
    href: string;
    links: { title: string; href: string; matcher: string }[];
  }[] = [
    {
      heading: "Home",
      href: `/${uid}`,
      links: [],
    },
    {
      heading: "Fitness",
      href: `/${uid}/fitness`,
      links: [
        { title: "Reps", href: `/${uid}/fitness/reps`, matcher: "reps" },
        { title: "Max", href: `/${uid}/fitness/max`, matcher: "max" },
        {
          title: "Profiles",
          href: `/${uid}/fitness/profiles`,
          matcher: "profiles",
        },
        { title: "Search", href: `/${uid}/fitness/search`, matcher: "search" },
      ],
    },
    {
      heading: "Cardio",
      href: `/${uid}/cardio`,
      links: [
        {
          title: "Running",
          href: `/${uid}/cardio/running`,
          matcher: "running",
        },
        {
          title: "Cycling",
          href: `/${uid}/cardio/cycling`,
          matcher: "cycling",
        },
        {
          title: "Swimming",
          href: `/${uid}/cardio/swimming`,
          matcher: "swimming",
        },
        { title: "Search", href: `/${uid}/cardio/search`, matcher: "search" },
      ],
    },
    {
      heading: "Settings",
      href: `/${uid}/settings`,
      links: [],
    },
  ];
  return linkLayout;
}

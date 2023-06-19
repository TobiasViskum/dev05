import { fitness, dog, cardio, compete, chat } from "@/assets/images";
import { StaticImageData } from "next/image";

interface AppImages {
  [key: string]: {
    image: StaticImageData;
    size: Number;
  };
}

export const appImages: AppImages = {
  fitness: {
    image: fitness,
    size: 90,
  },
  dog: {
    image: dog,
    size: 90,
  },
  cardio: {
    image: cardio,
    size: 80,
  },
  compete: {
    image: compete,
    size: 80,
  },
  chat: {
    image: chat,
    size: 80,
  },
};

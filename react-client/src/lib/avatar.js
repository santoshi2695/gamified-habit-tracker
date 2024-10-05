import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const SKIN_COLOR_TYPES = [
  "614335",
  "ae5d29",
  "d08b5b",
  "d08b5b",
  "f8d25c",
  "fd9841",
  "ffdbb4",
];

export const getRandomHexColors = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

export const getRandomUniqueSkinTypes = (count) => {
  if (count > SKIN_COLOR_TYPES.length) return;
};

export const getRegisterAvatars = (email) => {
  const avatars = [];
  while (avatars.length < 6) {
    const av = createAvatar(avataaars, {
      seed: `${email}-${avatars.length}`,
      style: ["default"],
      accessoriesProbability: 0,
      backgroundColor: [getRandomHexColors()],
    }).toDataUriSync();
    avatars.push(av);
  }
  return avatars;
};

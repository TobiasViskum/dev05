import { insertFavorite, deleteFavorite, updateFromNullToObject } from ".";

interface Props {
  uid: Uid;
  newState: boolean;
  name_id: string;
  favorites: Favorites;
}

export async function updateFavorite({
  uid,
  newState,
  name_id,
  favorites,
}: Props) {
  if (favorites === undefined) return {};
  if (favorites == null) {
    await updateFromNullToObject(uid); //if favorites has to be updated from null to {}
    favorites = {};
  }

  if (newState === true) {
    const result: Favorites = await insertFavorite(name_id, uid, favorites);
    return result;
  } else if (newState === false) {
    const result: Favorites = await deleteFavorite(name_id, uid, favorites);
    return result;
  }
  return {};
}

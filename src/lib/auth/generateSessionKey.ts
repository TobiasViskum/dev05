export default function generateSessionKey(uid: string) {
  const tempSessionKey = uid
    .replace("a", "z")
    .replace("b", "1")
    .replace("c", "sf")
    .replace("d", "y")
    .replace("e", "-")
    .replace("f", "$")
    .replace("g", "æ")
    .replace("h", "j")
    .replace("i", "c")
    .replace("j", "-")
    .replace("k", "$")
    .replace("l", "g")
    .replace("m", "3-")
    .replace("n", "æ")
    .replace("o", "d")
    .replace("p", "n")
    .replace("q", "-")
    .replace("r", "æ")
    .replace("s", "5")
    .replace("t", "-")
    .replace("u", "p")
    .replace("v", "f-q-")
    .replace("w", "47h")
    .replace("x", "c")
    .replace("y", "w")
    .replace("z", "å")
    .replace("1", "ø")
    .replace("2", "9v")
    .replace("3", "ø")
    .replace("4", "-")
    .replace("5", "æ")
    .replace("6", "ø")
    .replace("7", "f$")
    .replace("8", "q")
    .replace("9", "s")
    .replace("-", "å");

  const sessionKey = tempSessionKey.split("-").reverse().join("");

  return sessionKey;
}

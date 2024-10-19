export function slugify(str) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

export function timestampToFriendlyDate(timestamp) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const d = new Date(Date.parse(timestamp));
  return d.toLocaleDateString(undefined, options);
}

const linkify = (t) => {
  const isValidHttpUrl = (s) => {
    let u;
    try {
      u = new URL(s);
    } catch (_) {
      return false;
    }
    return u.protocol.startsWith("http");
  };
  const m = t.match(
    /(?<=\s|^)[a-zA-Z0-9-:/]+\.[a-zA-Z0-9-].+?(?=[.,;:?!-]?(?:\s|$))/g
  );
  if (!m) return t;
  const a = [];
  m.forEach((x) => {
    const [t1, ...t2] = t.split(x);
    a.push(t1);
    t = t2.join(x);
    const y = (!x.match(/:\/\//) ? "https://" : "") + x;
    if (isNaN(x) && isValidHttpUrl(y))
      a.push('<a href="' + y + '" target="_blank">' + y.split("/")[2] + "</a>");
    else a.push(x);
  });
  a.push(t);
  return a.join("");
};

export function htmlizeText(text) {
  return linkify(text.replaceAll("\n", "<br>"));
}

export function chakraColorIsDark(color) {
  if (!color || color.indexOf("white") >= 0) {
    return false;
  }
  const [colorName, colorVariant] = color.split(".");

  const isDark =
    (colorName === "red" && colorVariant >= 300) ||
    (colorName === "gray" && colorVariant >= 400) ||
    (colorName === "green" && colorVariant >= 400) ||
    (colorName === "blue" && colorVariant >= 300) ||
    (colorName === "yellow" && colorVariant >= 400) ||
    (colorName === "orange" && colorVariant >= 300) ||
    (colorName === "purple" && colorVariant >= 300) ||
    (colorName === "pink" && colorVariant >= 300);

  return isDark;
}

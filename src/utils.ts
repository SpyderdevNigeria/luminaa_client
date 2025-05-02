
export const numberWithCommas = (x: number | string): string | number => {
  if (!x) return 0;
  x = x.toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

// program to convert first letter of a string to uppercase
export const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return "";
  }
  let capitalized = "";

  try {
    capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  } catch (e) {
    return "";
  }
  // converting first letter to uppercase

  return capitalized || "";
};

export const capitalizeAllFirstLetter = (str: string)  => {
  if (!str) {
    return "";
  }
  try {
    const words = str.replace(/\s+/g, " ").trim().split(" ");
    if (words.length <= 1) {
      return capitalizeFirstLetter(str);
    }
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  } catch (e) {
    return "";
  }
};
export const setCookie = (cname: any, cvalue: any, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  const domain = window.location.hostname; // Get the current domain
  document.cookie = `${cname}=${cvalue};domain=${domain};${expires};path=/;Secure;SameSite=Lax`;
};

export const setRootDomainCookie = (cname: any, cvalue: any, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/;Secure;SameSite=Lax`;
};

export const setAllCookies = (cname: any, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  const domain = window.location.hostname; // Get the current domain
  document.cookie = `${cname}=${cvalue};domain=${domain};${expires};path=/;Secure;SameSite=Lax`;
  document.cookie = `${cname}=${cvalue};${expires};path=/;Secure;SameSite=Lax`;
};

export const removeCookie = (cname: any) => {
  setAllCookies(cname, "", 0);
};

export const getCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim(); // Use trim() to remove leading spaces more cleanly
    
    if (c.indexOf(name) === 0) {
      try {
        return decodeURIComponent(c.substring(name.length, c.length));
      } catch (error) {
        console.error("Error decoding cookie:", error);
        return null;
      }
    }
  }
  
  return null; // Return null if the cookie is not found
}

export const getItemsAsString = (items: any[]) => {
  if (!items || !Array.isArray(items) || items.length == 0) return "";
  return items
    .map((item) => item.substitutesList)
    .reduce((item, next) => item.concat(next), [])
    .map((item: { name: string; }) => capitalizeFirstLetter(item.name))
    .slice(0, 3)
    .join(", ");
};

export const getFlatItemsAsString = (items: any[], customName: string | number) => {
  if (!items || !Array.isArray(items) || items.length == 0) return "";
  return (
    items
      .map((item) =>
        capitalizeFirstLetter(customName ? item[customName] : item.name)
      )
      .slice(0, 2)
      .join(", ") + "..."
  );
};
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getFlatItemsAsStringOrder = (items: any[], customName: string | number) => {
  if (!items || !Array.isArray(items) || items.length == 0) return "";
  return (
    items
      .map((item) =>
        capitalizeFirstLetter(customName ? item[customName] : item.name)
      )
      .slice(0, 3)
      .join(", ") + "..."
  );
};

export const ReplaceImage = (error: { target: { src: string; }; }) => {
  error.target.src =
    "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg";
};

export const parseJwt = (token: string) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getParameterByName = (name: any, query: any) => {
  return getParameterByNameAction(name, query);
};

const getParameterByNameAction = (name: string, query: any) => {
  if (!name || typeof window === "undefined") return "";
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(query || window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const validateToken = (token: string) => {
  try {
    const decoded = parseJwt(token); // Ensure parseJwt function is correct
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now; // Check if the token is expired
  } catch (e) {
    return false;
  }
};

export const getSecureCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};
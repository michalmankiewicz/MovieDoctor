import { MAX_FETCH_TIME } from "./config";

const timeout = async function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${MAX_FETCH_TIME} seconds`
        )
      );
    }, seconds * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(MAX_FETCH_TIME)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.status_message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

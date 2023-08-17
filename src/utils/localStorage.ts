// This function should called inside a try/catch
export function saveDataToLocalStorage(data: MyData): void {
  console.trace("maddafakka");
  console.log("data is: ", data);
  const serializedData = JSON.stringify(data.value);
  localStorage.setItem(data.key, serializedData);
}

export function getDataFromLocalStorage(key: string): unknown {
  try {
    console.log(localStorage);
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error getting data from local storage:", error);
    return null;
  }
}

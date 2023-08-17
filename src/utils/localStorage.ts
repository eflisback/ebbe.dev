// This function should called inside a try/catch
export function saveDataToLocalStorage(data: MyData): void {
  const serializedData = JSON.stringify(data.value);
  localStorage.setItem(data.key, serializedData);
}

export function getDataFromLocalStorage(key: string): unknown {
  try {
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

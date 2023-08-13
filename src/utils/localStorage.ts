// This function should called inside a try/catch
export function saveDataToLocalStorage(data: MyData): void {
  const serializedData = JSON.stringify(data.value);
  localStorage.setItem(data.key, serializedData);
}

export function getDataFromLocalStorage(key: string): any | null {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    // Handle error (e.g., invalid JSON)
    console.error("Error getting data from local storage:", error);
    return null;
  }
}

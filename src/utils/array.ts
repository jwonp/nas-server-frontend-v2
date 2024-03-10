export const addObjectElementOnArray = <T extends object>(
  array: T[],
  element: T
) => {
  // if(array.find())
  if (array.length === 0) {
    return [...array, element];
  }
  const arrayEntriesMap = array.map((item) => new Map(Object.entries(item)));
  const elementEntriesMap = new Map(Object.entries(element));
  const elementKeys = Object.keys(element);
  if (
    //if array does not include the element
    arrayEntriesMap.filter((item) =>
      elementKeys.every((key) => item.get(key) === elementEntriesMap.get(key))
    ).length === 0
  ) {
    return [...array, element];
  }

  return [...array];
};

export const deleteObjectElementOnArray = <T extends object>(
  array: T[],
  option: {
    index?: number;
    element?: T;
  }
) => {
  if (array.length === 0) {
    return [];
  }
  if (option.index) {
    return [...array].toSpliced(option.index, 1);
  }
  if (option.element) {
    const arrayEntriesMap = array.map((item) => new Map(Object.entries(item)));
    const elementEntriesMap = new Map(Object.entries(option.element));
    const elementKeys = Object.keys(option.element);
    const filteredArrayEntriesMap = arrayEntriesMap.filter((item) =>
      elementKeys.some((key) => item.get(key) !== elementEntriesMap.get(key))
    );
    const resultArray = filteredArrayEntriesMap.map((item) =>
      Object.fromEntries(item) as T
    );
    return resultArray;
  }
  return array;
};

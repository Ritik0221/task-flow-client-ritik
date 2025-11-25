export const SortTasks = (tasks, sortType) => {
  if (!sortType) return tasks;

  const priorityOrderLowHigh = { low: 1, medium: 2, high: 3 };
  const priorityOrderHighLow = { high: 1, medium: 2, low: 3 };

  return [...tasks].sort((a, b) => {
    const A = a.priority.toLowerCase();
    const B = b.priority.toLowerCase();

    if (sortType === "low-high") {
      return priorityOrderLowHigh[A] - priorityOrderLowHigh[B];
    }

    if (sortType === "high-low") {
      return priorityOrderHighLow[A] - priorityOrderHighLow[B];
    }

    return 0;
  });
};

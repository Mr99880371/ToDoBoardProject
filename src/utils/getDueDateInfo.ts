import { format, isBefore, isToday, isValid, differenceInCalendarDays } from "date-fns";

export function getDueDateInfo(dueDate: string) {
  if (!dueDate) {
    return {
      formattedDate: "Sem data",
      statusText: "Sem data",
      colorClass: "text-gray-400",
      isOverdue: false,
      daysDiff: null,
    };
  }

  const due = new Date(dueDate);
  if (!isValid(due)) {
    return {
      formattedDate: "Data inválida",
      statusText: "Data inválida",
      colorClass: "text-gray-400",
      isOverdue: false,
      daysDiff: null,
    };
  }

  const today = new Date();
  const formattedDate = format(due, "dd/MM");

  const daysDiff = differenceInCalendarDays(due, today);
  const isOverdue = isBefore(due, today) && !isToday(due);

  let statusText = "";
  let colorClass = "";

  if (isOverdue) {
    const overdueDays = Math.abs(daysDiff);
    statusText = `Atraso de ${overdueDays} dias`;
    colorClass = "text-red-500";
  } else if (daysDiff <= 5) {
    statusText = `Faltam ${daysDiff} dias`;
    colorClass = "text-yellow-500";
  } else {
    statusText = `Faltam ${daysDiff} dias`;
    colorClass = "text-green-600";
  }

  return {
    formattedDate,
    statusText,
    colorClass,
    isOverdue,
    daysDiff,
  };
}

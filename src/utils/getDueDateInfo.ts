import { format, differenceInCalendarDays, isBefore } from "date-fns";

export function getDueDateInfo(dueDate: string) {
  const today = new Date();
  const due = new Date(dueDate);
  const formattedDate = format(due, "dd/MM");

  const daysDiff = differenceInCalendarDays(due, today);
  const isOverdue = isBefore(due, today);

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

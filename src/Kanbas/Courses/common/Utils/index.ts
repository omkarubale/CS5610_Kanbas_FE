import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

export const formatSnakeCaseToTitleCase = (input: string) => {
  return input
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .reduce(
      (s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "),
      ""
    );
};

export const getCurrentHumanReadableDate = (date: Date) => {
  return format(date, "MMM d 'at' h:mmaaa");
}

export type FormField = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  disabled?: boolean;
};

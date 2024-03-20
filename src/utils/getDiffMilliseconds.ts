import DateType from "@/types/DateType";
import dayjs from "dayjs";

export default function getDiffMilliseconds(a: DateType, b: DateType): number {
  return Math.abs(dayjs(a).diff(b, "milliseconds"));
}

import DateType from "@/types/DateType";
import MaybeNull from "@/types/MaybeNull";
import dayjs from "@/utils/dayjs";

export default function formatDate(
  date: DateType,
  template = "MMMM D, YYYY h:mm A"
): MaybeNull<string> {
  const dayjsObject = dayjs.isDayjs(date) ? date : dayjs(date);
  return date == null ? null : dayjsObject.format(template);
}

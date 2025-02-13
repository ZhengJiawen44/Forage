export function format(date: Date | undefined): string {
  if (typeof date === "undefined") {
    return "Not a Date";
  }
  const month = getMonthString(date);
  return month + " " + date.getUTCDate() + ", " + date.getFullYear();
}

function getMonthString(date: Date) {
  switch (date.getMonth()) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
}

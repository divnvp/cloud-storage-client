export function compareTwoDates (date1, date2) {
  return new Date(date1).getTime() > new Date(date2).getTime();
}

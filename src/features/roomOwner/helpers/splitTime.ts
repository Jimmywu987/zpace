export const splitTime = (time: string) => {
  const part = time.split(":");
  const hour = +part[0];
  const minute = +part[1];
  const halfDay = hour >= 12 ? "P.M." : "A.M.";
  const hr = hour > 12 ? hour - 12 : hour;
  const min = minute;
  return { halfDay, hr: hr.toString(), min: min.toString() };
};

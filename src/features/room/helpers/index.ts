export const timeSlotFun = () => {
  const timeSlot = [];
  for (let i = 0; i < 24; i++) {
    let hour;
    if (i < 10) {
      hour = `0${i}`;
    } else {
      hour = `${i}`;
    }

    for (let k = 0; k < 2; k++) {
      let minute;
      if (k === 0) {
        minute = `00`;
        timeSlot.push(`${hour}:${minute}`);
      } else {
        minute = `30`;
        timeSlot.push(`${hour}:${minute}`);
      }
    }
  }
  return timeSlot;
};

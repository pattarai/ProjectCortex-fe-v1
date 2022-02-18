export function dateFormat(dat: string | null) {
  let date = new Date(`${dat}`);
  let currentDate: string | number = date.getDate();
  let currentMonth: string | number = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  return `${currentMonth}/${currentDate}/${currentYear}`;
}

export function dateTimeFormat(dat: string | null) {
  let date = new Date(`${dat}`);
  let currentDate: string | number = date.getDate();
  let currentMonth: string | number = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  let currentHour: string | number = date.getHours();
  let currentMinute: string | number = date.getMinutes();
  let currentSecond: string | number = date.getSeconds();

  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  console.log(
    `${currentMonth}/${currentDate}/${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`,
  );
  return `${currentMonth}/${currentDate}/${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`;
}

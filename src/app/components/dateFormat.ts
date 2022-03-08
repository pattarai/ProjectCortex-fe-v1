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
  return `${currentMonth}/${currentDate}/${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`;
}

export function randomString() {
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

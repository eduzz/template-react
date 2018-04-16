export const getTime = (date: any) => {
  // const oldDate = new Date('2018-04-15 00:36:56.000');
  const oldDate = new Date(date);
  const newDate = new Date();
  const milliseconds = newDate.getTime() - oldDate.getTime();

  let day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;

  if (day && day > 6) {
    return `${oldDate.getDay() + 1}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
  }

  if (day) {
    if (day > 1) {
      return getDayLabel(oldDate.getDay());
    }

    return 'Ontem';
  }

  if (hour) {
    return `${hour} Hora${hour > 1 && 's'} atrás`;
  }

  if (minute) {
    return `${minute} Minuto${minute > 1 && 's'} atrás`;
  }

  return `${seconds} Segundo${seconds > 1 && 's'} atrás`;
};

const getDayLabel = (dayNumber: number) => {
  switch (dayNumber) {
    case 0:
      return 'Domingo';
    case 1:
      return 'Segunda-feira';
    case 2:
      return 'Terça-feira';
    case 3:
      return 'Quarta-feira';
    case 4:
      return 'Quinta-feria';
    case 5:
      return 'Sexta-feira';
    case 6:
      return 'Sábado';
    default:
      return '';
  }
};
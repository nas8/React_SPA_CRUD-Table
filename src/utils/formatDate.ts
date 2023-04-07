export const formatDate = (dateStr: string) => {
  const dateParts = dateStr.split('.');
  const year = parseInt(dateParts[2]) + 2000;
  const month = dateParts[1];
  const day = dateParts[0];
  const formattedDateStr = `${year}-${month}-${day}`;
  return formattedDateStr;
};

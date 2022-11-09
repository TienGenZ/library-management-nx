export const formatDate = (value: string) => {
  const dateInput = new Date(value);

  let date: string | number = dateInput.getDate();
  let month: string | number = dateInput.getMonth() + 1;
  const year = dateInput.getFullYear();

  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');

  return `${date}/${month}/${year}`;
};

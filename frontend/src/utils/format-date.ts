export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
  
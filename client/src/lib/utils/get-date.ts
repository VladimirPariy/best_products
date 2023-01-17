export const getDate = (str: string): string => {
  const date = new Date(str)
  return date.toLocaleString('en-US', {month: 'short', day: '2-digit', year: 'numeric'})
}
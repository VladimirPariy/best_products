export const getTime = (str: string): string => {
  const date = new Date(str)
  return date.toLocaleTimeString('en-US', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit'})
}
interface formatOptions {
  type?: "date" | "time" | "datetime";
  withSeconds?: boolean;
  withMilliseconds?: boolean;
}

export function formatDate(date: Date, options?: formatOptions) {
  let result = [];

  if (options?.type?.includes('date') || !options?.type) {
    result.push(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
  }

  if (options?.type?.includes('time') || !options?.type) {
    let timeResult = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

    if (options?.withSeconds !== false) {
      timeResult += `:${date.getSeconds().toString().padStart(2, '0')}`
    }

    if (options?.withSeconds !== false && options?.withMilliseconds) {
      timeResult += `.${date.getMilliseconds().toString().padStart(3, '0')}`;
    }

    result.push(timeResult)
  }
  
  return result.join(' ');
}
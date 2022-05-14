export const tokenizer = (template: string, keys: any) => {
  let newTemplate = template

  Object.keys(keys).forEach(key => {
    newTemplate = newTemplate.replace(
      new RegExp(`{{\\s?${key}\\s?}}`, 'gi'),
      keys[key]
    )
  })

  return newTemplate
}

export const time = {
  seconds: (n: number) => n * 1000,
  minutes: (n: number) => n * 1000 * 60,
  hours: (n: number) => n * 1000 * 60 * 60,
  days: (n: number) => n * 1000 * 60 * 60 * 24,
  weeks: (n: number) => n * 1000 * 60 * 60 * 7,
}

export const switchComparator = (number: string) => {
  if (/^>/.test(number)) return 'gt'
  if (/^</.test(number)) return 'lt'
  if (/^>=/.test(number)) return 'lte'
  if (/^<=/.test(number)) return 'gte'
  return 'eq'
}

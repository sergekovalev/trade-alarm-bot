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

export const switchComparator = (number: string) => {
  if (/^>/.test(number)) return 'gt'
  if (/^</.test(number)) return 'lt'
  if (/^>=/.test(number)) return 'lte'
  if (/^<=/.test(number)) return 'gte'
  return 'eq'
}

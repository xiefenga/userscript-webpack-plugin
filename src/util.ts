import { UserScriptMetaData } from './type'

const longestMeta = (metadata: Partial<UserScriptMetaData>): number => Object.keys(metadata).reduce((len, val) => Math.max(len, val.length), 0)

const generateSingelMetaData = (key: string, value: string | string[], width: number): string | string[] => Array.isArray(value) ? value.map(val => `// @${key.padEnd(width)}${val}`) : `// @${key.padEnd(width)}${value}`

const generateMetaDataBody = (metadata: Partial<UserScriptMetaData>, padding: number): string[] => {
  const width = longestMeta(metadata) + padding
  const entries = Object.entries(metadata)
  return entries.map(([key, value]) => generateSingelMetaData(key, value, width)).flat()
}

export const generateUserScript = (metadata: Partial<UserScriptMetaData>, padding: number): string => {
  if (typeof metadata !== 'object') {
    throw new TypeError('metadata arg must be an object')
  }
  const body = generateMetaDataBody(metadata, padding)
  return `// ==UserScript==\n${body.join('\n')}\n// ==/UserScript==\n\n`
}
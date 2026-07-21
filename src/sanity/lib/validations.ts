import type {
  StringRule,
  ImageRule,
  ArrayRule,
  ObjectRule,
  UrlRule
} from 'sanity'

// Function overloads for type safety
export function _mandatoryField(Rule: StringRule): StringRule
export function _mandatoryField(Rule: ImageRule): ImageRule
export function _mandatoryField(
  Rule: ArrayRule<unknown[]>
): ArrayRule<unknown[]>
export function _mandatoryField(Rule: ObjectRule): ObjectRule
export function _mandatoryField(Rule: UrlRule): UrlRule
export function _mandatoryField(
  Rule: StringRule | ArrayRule<unknown[]> | ImageRule | ObjectRule | UrlRule
) {
  return Rule.required().error('Campo obligatorio!')
}

export function _mandatoryi18nField(Rule: ObjectRule) {
  const languages = ['ca', 'es']

  return Rule.custom((values: unknown) => {
    if (!values || typeof values !== 'object') {
      return {
        message: 'Todos los campos son obligatorios',
        paths: languages.map((lang) => [lang])
      }
    }

    const valueObj = values as Record<string, string | undefined>
    const missingLanguages = languages.filter(
      (lang) => !valueObj[lang] || valueObj[lang]?.trim() === ''
    )

    if (missingLanguages.length > 0) {
      // Generate paths for each missing language
      const emptyPaths = missingLanguages.map((lang) => [lang])

      return {
        message: 'Faltan idiomas!',
        paths: emptyPaths
      }
    }

    return true // Pass validation
  })
}

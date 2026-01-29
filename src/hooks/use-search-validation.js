import { useMemo } from 'react'

/**
 * @param {object} values - form values
 * @param {object} touched - touched map: { fieldName: true }
 * @param {(values: object) => object} validate - returns errors object: { fieldName: "msg" }
 */
export default function useValidation(values, touched, validate) {
  const errors = useMemo(() => {
    const allErrors = validate(values) || {}
    const visibleErrors = {}

    for (const key of Object.keys(allErrors)) {
      if (touched?.[key]) visibleErrors[key] = allErrors[key]
    }

    return visibleErrors
  }, [values, touched, validate])

  return errors
}

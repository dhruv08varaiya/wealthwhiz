import { useState, useCallback } from 'react';

export function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    // Validate on blur
    if (validationRules[name]) {
      const error = validationRules[name](values[name], values);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [values, validationRules]);

  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](values[field], values);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isValid = Object.keys(validationRules).every(
    (field) => !validationRules[field](values[field], values)
  );

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validate,
    reset,
    setFieldValue,
    setValues,
  };
}

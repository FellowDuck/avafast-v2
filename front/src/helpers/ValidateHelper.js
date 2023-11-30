import dot from 'dot-object';
import * as yup from 'yup';

export default class ValidateHelper {
  static async yup(data, shape) {
    const schema = yup.object().shape(shape);

    try {
      await schema.validate(dot.dot(data, {}), { abortEarly: false });
    } catch (err) {
      return Object.fromEntries(err.inner.map((item) => [item.path.replace(/^\["?/, '').replace(/"?]$/, ''), item.message]));
    }

    return null;
  }

  static getErrors(rules = {}, formRef = null) {
    const errors = {};

    for (const [attr, validation] of Object.entries(rules)) {
      for (const key in validation) {
        if (key % 2 !== 0) {
          continue;
        }
        if (!validation[key]) {
          errors[attr] = validation?.[Number(key) + 1] ?? 'Informe o campo corretamente.';
          break;
        }
      }
    }

    if (formRef?.current) {
      const fieldRef = formRef.current?.getFieldRef?.(Object.keys(errors)?.[0]);
      if (fieldRef?.focus) {
        fieldRef.focus();
      }
    }

    return Object.values(errors).length ? errors : null;
  }
}

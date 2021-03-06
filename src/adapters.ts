export interface YuppishOptions {
  abortEarly: boolean;
}

export interface Yuppish<Fields> {
  validate(fields: Fields, opts: YuppishOptions): Promise<any>;
}

/**
 * Addon support for Yup schemas.
 */
export function withYup<Fields = any>(schema: Yuppish<Fields>) {
  return function (fields: Fields) {
    return schema.validate(fields, { abortEarly: false })
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        var errors = {};

        for (var error of err.inner) {
          if (!errors[error.path]) {
            errors[error.path] = error.message;
          }
        }

        return Promise.reject(errors);
      });
  };
}

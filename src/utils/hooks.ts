import { z } from "zod";
import { useState } from "react";

export function useValidation<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const [data, setData] = useState<T>();
  const [errors, setErrors] =
    useState<
      z.ZodFormattedError<
        { [k in keyof z.baseObjectInputType<T>]: z.baseObjectInputType<T>[k] },
        string
      >
    >();

  function validate(data: unknown) {
    const result = schema.safeParse(data);

    if (result.success) {
      const resultData = result.data as unknown as T;
      setData(resultData);
      setErrors(undefined);
      return resultData;
    } else {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
    }
  }

  return { data, errors, validate };
}

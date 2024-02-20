import { z } from "zod";
import { RefObject, useEffect, useState } from "react";

/**
 * hook to validate zod schemas and parse errors
 * 
 * @param props object with validation schema, onSuccess function and onError function
 * @returns data, errors and validate function
 */
export function useValidation<T>(props: {
  schema: z.ZodType<T>;
  onSuccess?: (data: T) => void;
  onError?: () => void;
}) {
  const [data, setData] = useState<T>();
  const [errors, setErrors] = useState<z.ZodFormattedError<T, string>>();

  function validate(data: T) {
    const result = props.schema.safeParse(data);

    if (result.success) {
      setData(result.data);
      setErrors(undefined);
      !!props.onSuccess && props.onSuccess(result.data);
    } else {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      !!props.onError && props.onError();
    }
  }

  return { data, errors, validate };
}

/**
 * hook listening to screen width changes
 *
 * @param query string query in form of CSS media query e.g. (max-width: 768px)
 * @returns boolean stating if current screen size matches the media query
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    if (matches === null) {
      setMatches(window.matchMedia(query).matches);
    }

    const matchQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

/**
 * hook listening for clicks outside of ref element
 *
 * @param ref ref to an element
 * @param handler function to be called on outside click
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: Function,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { z } from "zod";

/**
 * Type definition for query parameter parsing options
 */
type QueryParseOptions<T extends Record<string, any>> = {
  /**
   * Zod schema for validating and transforming the query parameters
   */
  schema?: z.ZodType<T>;
};

/**
 * Custom hook to safely retrieve and parse multiple URL query parameters as an object
 * @template T The expected type of the query parameters object
 * @param options Optional parsing and validation options
 * @returns The parsed query parameters object
 */
export function useQuery<T extends Record<string, any>>(
  options: QueryParseOptions<T> = {},
): Partial<T> {
  const searchParams = useSearchParams();

  return useMemo((): T => {
    // If no schema is provided, convert all parameters to their raw string values
    if (!options.schema) {
      const params: Record<string, any> = {};
      for (const [key] of searchParams.entries()) {
        params[key] = searchParams.get(key) || undefined;
      }

      // Merge with default values and return
      return {
        ...params,
      } as T;
    }

    try {
      // Create an object with all current search params
      const paramsObject: Record<string, any> = {};
      for (const [key] of searchParams.entries()) {
        const value = searchParams.get(key);
        if (value !== null) {
          paramsObject[key] = value;
        }
      }

      // Parse the entire params object using the provided Zod schema
      const parsedValue = options.schema.parse(paramsObject);
      return parsedValue;
    } catch {
      // If parsing fails, return the default value or empty object
      return {} as T;
    }
  }, [searchParams, options.schema]);
}

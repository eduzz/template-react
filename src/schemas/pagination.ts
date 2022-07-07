import { z } from 'zod';

export function createPaginationSchema(resultSchema: z.Schema) {
  return z.object({
    total: z.number(),
    result: z.array(resultSchema)
  });
}

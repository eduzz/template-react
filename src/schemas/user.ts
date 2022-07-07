import { z } from 'zod';

import { createPaginationSchema } from './pagination';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().optional(),
  createdDate: z.date().optional(),
  updatedDate: z.date().optional()
});

export type User = z.infer<typeof userSchema>;

export const userListSchema = createPaginationSchema(userSchema);
export type UserList = z.infer<typeof userListSchema>;

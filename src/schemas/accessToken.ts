import { z } from 'zod';

export const accessTokenSchema = z.object({
  token: z.string(),
  refreshToken: z.string()
});

export type AccessToken = z.infer<typeof accessTokenSchema>;

export const accessTokenDecodedSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  supportId: z.number().optional(),
  isClubeBlack: z.boolean()
});

export type AccessTokenDecoded = z.infer<typeof accessTokenDecodedSchema>;

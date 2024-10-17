import { z } from "zod";

export const searchSchema = z.object({
  category: z.string().default("All"),
  query: z.string().min(1).max(255)
});

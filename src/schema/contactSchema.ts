import { z } from "zod";

export const contactSchema = z.object({
    firstName:  z.string(),
    lastName:  z.string(),
    subject:  z.string(),
    email:  z.string(),
    message:  z.string(),
});

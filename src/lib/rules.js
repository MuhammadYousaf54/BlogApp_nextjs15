import {z} from 'zod';


export const LoginFormSchema = z.object({
    email: z.string().email({message:"Please enter valid email "}),
    password: z.string().min(8).max(20)
})
export const RegisterFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20)
}).superRefine((val,ctx)=>{
    if(val.password!== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword'],
            message: 'Passwords do not match'
        });
    }
    return true;
})
export const BlogPostSchema = z.object({
    title: z.string().min(1, "Title is required").trim(),
    content: z.string().min(1, "Content is required").trim(),
});
import * as yup from "yup";

const { object, string } = yup;

export const signupSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export type signupSchemaType = yup.InferType<typeof signupSchema>;

export const signinSchema = object({
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export type signinSchemaType = yup.InferType<typeof signinSchema>;

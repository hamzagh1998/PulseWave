import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useFirebaseAuth } from "@/hooks/use-firebase-auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/error-alert";
import { Separator } from "@/components/ui/separator";

import { signupSchema, signupSchemaType } from "@/schemas/auth.schema";

import { AUTH_PATHES } from "@/routes/auth.routes";

export function SignupCard() {
  const { isPending, error, onFirebaseEmailSignup, onFirebaseGoogleSignin } =
    useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupSchemaType>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<signupSchemaType> = async ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    try {
      const data = await onFirebaseEmailSignup(email, password);
      if (data?.error) return;
      //TODO: Register user to db
      console.log(firstName, lastName, email, password);
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  const onGoogleSignup = async () => {
    try {
      const data = await onFirebaseGoogleSignin();
      if (data?.error) return;
      console.log(data.detail);
    } catch (err) {
      console.error("Google signup failed", err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Already have an account?&ensp;
          <Link
            className="text-accent-foreground underline"
            to={"/" + AUTH_PATHES.SIGNIN}
          >
            Sign In
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <ErrorAlert title="Error" description={error} />}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex justify-between items-start gap-2">
              <div className="w-full">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  className={errors.firstName && "border-destructive"}
                  id="firstName"
                  placeholder="Your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-destructive text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  className={errors.lastName && "border-destructive"}
                  id="lastName"
                  placeholder="Your last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-destructive text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                className={errors.email && "border-destructive"}
                id="email"
                placeholder="Your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                className={errors.password && "border-destructive"}
                type="password"
                id="password"
                placeholder="Your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-destructive text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Signup
          </Button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <Separator orientation="horizontal" className="flex-1" />
          <p className="text-xs text-muted-foreground">OR CONTINUE WITH</p>
          <Separator orientation="horizontal" className="flex-1" />
        </div>
        <Button
          variant="secondary"
          className="w-full text-lg font-bold max-sm:text-md"
          onClick={onGoogleSignup}
        >
          <FaGoogle />
          &ensp;Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="mt-6 text-xs">
          By continuing, you agree to PulseChat&ensp;
          <a
            href="#"
            className="text-skin-accent text-sm cursor-pointer font-bold"
          >
            Terms of Service
          </a>
          &ensp;and&ensp;
          <a
            href="#"
            className="text-skin-accent text-sm cursor-pointer font-bold"
          >
            Privacy Policy.
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

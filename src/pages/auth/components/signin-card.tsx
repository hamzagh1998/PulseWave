import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/error-alert";
import { Separator } from "@/components/ui/separator";

import { signinSchema, signinSchemaType } from "@/schemas/auth.schema";

import { useFirebaseAuth } from "@/hooks/use-firebase-auth";

import { AUTH_PATHES } from "@/routes/auth.routes";

export function SigninCard() {
  const { isPending, error, onFirebaseEmailSignup } = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinSchemaType>({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<signinSchemaType> = async ({
    email,
    password,
  }) => {
    try {
      const data = await onFirebaseEmailSignup(email, password);
      if (data?.error) return;
      //TODO: Register user to db
      console.log(email, password);
    } catch (err) {
      console.error("Signin failed", err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Don't have an account?&ensp;
          <Link
            className="text-accent-foreground underline"
            to={"/" + AUTH_PATHES.SIGNUP}
          >
            Sign In
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <ErrorAlert title="Error" description={error} />}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex justify-between items-start gap-2"></div>
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
          <Link
            className="text-accent-foreground underline text-xs"
            to={"/" + AUTH_PATHES.FORGET_PWD}
          >
            Forgot your password ?
          </Link>
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
        >
          <FaGoogle />
          &ensp;Google
        </Button>
      </CardContent>
    </Card>
  );
}

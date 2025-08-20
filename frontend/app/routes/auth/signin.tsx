import { signInSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useLoginMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useAuth } from "@/provider/auth-context";

type SigninFormData = z.infer<typeof signInSchema>;

const Signin = () => {
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: SigninFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        login(data);
        console.log(data);
        toast.success("Login successful");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        console.log(error);
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-muted/40 p-4 min-h-screen">
      <Card className="shadow-xl w-full max-w-md">
        <CardHeader className="mb-5 text-center">
          <CardTitle className="font-bold text-2xl">Welcome back</CardTitle>

          <CardDescription className="text-muted-foreground text-sm">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>

                      <Link
                        to="/forgot-password"
                        className="text-blue-600 text-sm"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 w-4 h-4" /> : "Sign in"}
              </Button>
            </form>
          </Form>

          <CardFooter className="flex justify-center items-center mt-6">
            <div className="flex justify-center items-center">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

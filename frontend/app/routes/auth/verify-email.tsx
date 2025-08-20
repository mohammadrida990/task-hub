import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { CheckCircle, Loader, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            setIsSuccess(false);
            console.log(error);

            toast.error(errorMessage);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-2xl">Verify Email</h1>
      <p className="text-gray-500 text-sm">Verifying your email...</p>

      <Card className="w-full max-w-md">
        {/* <CardHeader>
          <Link to="/signin" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Sign in
          </Link>
        </CardHeader> */}

        <CardContent>
          <div className="flex flex-col justify-center items-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 text-gray-500 animate-spin" />

                <h3 className="font-semibold text-lg">Verifying email...</h3>

                <p className="text-gray-500 text-sm">
                  Please wait while we verify your email.
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500" />

                <h3 className="font-semibold text-lg">Email Verified</h3>

                <p className="text-gray-500 text-sm">
                  Your email has been verified successfully.
                </p>

                <Link to="/signin" className="mt-6 text-blue-500 text-sm">
                  <Button variant="outline">Back to Sign in</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="w-10 h-10 text-red-500" />

                <h3 className="font-semibold text-lg">
                  Email Verification Failed
                </h3>

                <p className="text-gray-500 text-sm">
                  Your email verification failed. Please try again.
                </p>

                <Link to="/signin" className="mt-6 text-blue-500 text-sm">
                  <Button variant="outline">Back to Sign in</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;

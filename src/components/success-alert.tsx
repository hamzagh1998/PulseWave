import { IoCheckmarkCircle } from "react-icons/io5";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type ErrorAlertProps = {
  title: string;
  description: string;
};

export function SuccessAlert({ title, description }: ErrorAlertProps) {
  return (
    <Alert className="flex justify-start items-center gap-2 bg-emerald-100">
      <div>
        <IoCheckmarkCircle size={38} className="text-emerald-600" />
      </div>
      <div className="">
        <AlertTitle className="text-lg font-bold text-emerald-600">
          {title}
        </AlertTitle>
        <AlertDescription className="text-md text-emerald-600">
          {description}
        </AlertDescription>
      </div>
    </Alert>
  );
}

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Field } from "formik";

interface FormControlProps {
  placeholder: string;
  type: string;
  name: string;
  icon: IconProp;
  className?: string;
  error?: string | undefined;
  touched?: boolean;
  as?: string;
}

export const FormControl: FC<FormControlProps> = ({
  placeholder,
  type,
  name,
  icon,
  className,
  error,
  touched,
  as
}) => {
  return (
    <div
      className={`w-full h-14 bg-white border rounded-sm flex items-center pl-4 ${
        error && touched
          ? "border-danger"
          : !error && touched
          ? "border-primary"
          : "border-gray-200"
      } ${className}`}
    >
      <FontAwesomeIcon icon={icon} className="text-2xl mr-4 text-secondary" />
      <Field className="outline-none h-full w-11/12 border-none text-xl" as={as ? as : "input"} placeholder={placeholder} type={type} name={name} />
      {error && touched ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={`text-xl text-danger mr-4`}
        />
      ) : null}
      {!error && touched ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`text-xl text-primary mr-4`}
        />
      ) : null}
    </div>
  );
};

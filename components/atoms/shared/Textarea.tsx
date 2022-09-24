import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
}

export const Textarea: FC<FormControlProps> = ({
  placeholder,
  type,
  name,
  icon,
  className,
  error,
  touched,
}) => {
  return (
    <div
      className={`w-full min-h-[100px] items-start pt-4 bg-white border rounded-sm pl-4 flex ${
        error && touched
          ? "border-danger"
          : !error && touched
          ? "border-primary"
          : "border-gray-200"
      } ${className}`}
    >
      <FontAwesomeIcon icon={icon} className="text-2xl text-dark mr-4" />
      <Field as="textarea" placeholder={placeholder} type={type} name={name} className="text-xl placeholder:text-secondary resize-none w-11/12 outline-none" />
      {error && touched ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={`text-danger text-2xl mr-4`}
        />
      ) : null}
      {!error && touched ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`text-primary text-2xl mr-4`}
        />
      ) : null}
    </div>
  );
};

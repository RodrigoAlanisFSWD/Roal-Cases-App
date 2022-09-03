import { FC } from "react";
import styles from "../../../styles/atoms/shared/FormControl.module.scss";
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
}

export const FormControl: FC<FormControlProps> = ({
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
      className={`${styles["formControl"]} ${
        error && touched
          ? styles["formControl--error"]
          : !error && touched
          ? styles["formControl--success"]
          : ""
      } ${className}`}
    >
      <FontAwesomeIcon icon={icon} className={styles["formControl__icon"]} />
      <Field placeholder={placeholder} type={type} name={name} />
      {error && touched ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={`${styles["formControl__icon--error"]} ${styles["formControl__icon"]}`}
        />
      ) : null}
      {!error && touched ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`${styles["formControl__icon--success"]} ${styles["formControl__icon"]}`}
        />
      ) : null}
    </div>
  );
};

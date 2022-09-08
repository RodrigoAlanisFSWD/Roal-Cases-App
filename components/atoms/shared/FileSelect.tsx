import React, { FC, SyntheticEvent } from 'react'
import { Button } from './Button'
import styles from "../../../styles/atoms/shared/FileSelect.module.scss";
import { faCheckCircle, faFile, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FileSelectProps {
  placeholder: string;
  handleFile: (file: any) => void;
  selectedFile: any;
  className?: string;
  error: boolean;
  success: boolean;
}

export const FileSelect: FC<FileSelectProps> = ({ placeholder, handleFile, selectedFile, className, error, success }) => {

  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`${styles["fileSelect"]} ${error
          ? styles["fileSelect--error"]
          : ""
        } ${className}`}
    >
      <FontAwesomeIcon icon={faFile} className={styles["fileSelect__icon"]} />
      <span>
        {selectedFile ? selectedFile.name : placeholder}
      </span>
      <input type="file" ref={fileInput}
        onChange={handleChange}
        style={{ display: 'none' }} />
      {error ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={`${styles["fileSelect__icon--error"]} ${styles["fileSelect__icon"]}`}
        />
      ) : null}
      {success ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`${styles["fileSelect__icon--success"]} ${styles["fileSelect__icon"]}`}
        />
      ) : null}
    </div>
  )
}

import React, { FC, SyntheticEvent } from 'react'
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
      className={`w-full h-14 bg-white border rounded-sm flex items-center pl-4 cursor-pointer ${error
          ? "border-danger"
          : (success ? "border-primary" : "border-gray-200")
        } ${className}`}
    >
      <FontAwesomeIcon icon={faFile} className="text-xl text-dark mr-4" />
      <span className="text-xl w-11/12">
        {selectedFile ? selectedFile.name : placeholder}
      </span>
      <input type="file" ref={fileInput}
        onChange={handleChange}
        style={{ display: 'none' }} />
      {error ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={`text-xl text-danger mr-4`}
        />
      ) : null}
      {success ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`text-xl text-primary mr-4`}
        />
      ) : null}
    </div>
  )
}

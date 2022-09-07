import React, { FC, SyntheticEvent } from 'react'
import { Button } from './Button'

interface FileSelectProps {
    placeholder: string;
    handleFile: (file: any) => void;
    selectedFile: any;
}

export const FileSelect: FC<FileSelectProps> = ({ placeholder, handleFile, selectedFile }) => {
    
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
    <div>
        <Button onClick={() => handleClick()} text={placeholder} type="outlined" />
        <input type="file" ref={fileInput}
        onChange={handleChange}
        style={{display: 'none'}} />
        {
            selectedFile && <span style={{marginTop: 15, display: 'block'}}>
            Seleccion: { selectedFile.name }
        </span>
        }
        
    </div>
  )
}

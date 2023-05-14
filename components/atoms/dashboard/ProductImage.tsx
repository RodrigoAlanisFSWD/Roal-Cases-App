import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react'
import { useImage } from '../../../hooks/useImage';
import { ProductImage as ProductImageType } from '../../../models/product';
import { Button } from '../shared/Button';
import { IconButton } from '../shared/IconButton';

interface ProductImageProps extends ProductImageType {
    handleEdit: (file: any, id: number) => void;
    handleDelete: (id: number) => void;
}

export const ProductImage: FC<ProductImageProps> = ({ handleEdit, id, imageUrl, type, handleDelete }) => {
    const fileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        handleEdit(fileUploaded, id)
        event.target.value = null;
    };
    return (
        <div className={`flex flex-col w-[200px] h-[235px] border rounded-t-sm ${type === "MAIN" ? "border-primary" : "border-gray-200"} m-5`}>
            <input type="file" ref={fileInput}
                onChange={handleChange}
                style={{ display: 'none' }} />
            <img onClick={() =>
                handleClick()
            } className={`w-[200px] h-[200px]`} src={useImage(imageUrl)} />
            {
                type === "NORMAL" ? (
                    <span className='text-center cursor-pointer border-t border-gray-200 rounded-t-none rounded-b-sm text-dark p-1 hover:bg-danger hover:border-danger hover:text-white transition-all duration-300' onClick={() => handleDelete(id)}>
                        Eliminar
                    </span>
                ) : (
                    <span className='text-center border-t border-primary rounded-t-none rounded-b-sm text-dark p-1' onClick={() => handleDelete(id)}>
                        Imagen Principal
                    </span>
                )
            }

        </div>
    )
}

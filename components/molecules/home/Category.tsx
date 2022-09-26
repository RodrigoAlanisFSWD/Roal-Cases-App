import React, { FC } from "react";
import { Category as CategoryType } from "../../../models/category";

export const Category: FC<CategoryType> = ({ description, name, price, imageUrl }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full bg-background rounded-md flex flex-col items-center justify-center items-end p-[10px] h-[400px] bg-cover">
        <img src={imageUrl} alt={name} />
        <div className="h-[40px] w-2/4 p-[10px] rounded-md bg-white flex justify-center items-center text-xl">${ price }</div>
      </div>
      <div className="flex flex-col items-center py-6">
        <h3 className="text-2xl mb-4 text-secondary">{ name }</h3>

        <p className="text-lg text-secondary text-center max-h-[100px] overflow-hidden"> 
          { description }
        </p>
      </div>
    </div>
  );
};

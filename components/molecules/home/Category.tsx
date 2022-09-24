import React from "react";

export const Category = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full bg-background rounded-md flex justify-center items-end p-[10px] h-[400px]">
        <div className="h-[40px] w-2/4 p-[10px] rounded-xl bg-white flex justify-center items-center text-xl">$00.00</div>
      </div>
      <div className="flex flex-col items-center py-6">
        <h3 className="text-2xl mb-4 text-secondary">Category Title</h3>

        <p className="text-lg text-secondary text-center"> 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          ratione laborum quidem quod aliquid tempora exercitationem ducimus
          optio veritatis aperiam, voluptates cum, illo quae debitis minima
          distinctio? Blanditiis, iure eveniet!
        </p>
      </div>
    </div>
  );
};

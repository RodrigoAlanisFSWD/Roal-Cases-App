import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Address } from "../../../models/address";
import { CartProduct } from "../../../models/cart";
import { ProductImage } from "../../../models/product";
import { AppStore } from "../../../redux/store";
import { Main } from "../../layouts/Main";
import { Addresses } from "../../organisms/shopping/Addresses";
import { Shipment } from "../../../models/shipment";
import Image from "next/image";
import { BuyConfirmationUI } from "../../organisms/shopping/BuyConfirmationUI";

export const BuyConfirmation = () => {
  const cart = useSelector((store: AppStore) => store.cart);

  const calcTax = (): number => {
    const percent = (cart.totalCost + (shipment ? shipment.price : 0)) / 100;

    return percent * 3;
  };

  const [address, setAddress] = useState<Address | null>(null);

  const [shipment, setShipment] = useState<Shipment | null>(null);

  return (
    <Main>
      <div className="w-full max-h-full min-h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-[1fr_400px]">
        <div className="md:p-5">
          <div className="p-5">
            <h2 className="text-xl">
              Productos
            </h2>
            <div className="flex flex-wrap">
              {cart.products.map((product: CartProduct, index) => (
                <div
                  key={product.id}
                  className='flex border-b border-gray-200 p-5 w-full'
                >
                  <Image
                    width="75"
                    height="100"
                    src={
                      product.product.images.find(
                        (img: ProductImage) => img.type === "MAIN"
                      )?.imageUrl || ""
                    }
                    alt={product.product.name}
                    className="w-[60px]"
                  />
                  <div className="ml-5">
                    <h3 className="text-xl">{product.product.name}</h3>
                    <h3>${product.product.price * product.count}</h3>
                    <h3>Cantidad: {product.count}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Addresses
            selected={address}
            onChange={(newAddress: Address) => {
              if (address?.id === newAddress.id) {
                setAddress(null);
              } else {
                setAddress(newAddress);
              }
            }}
          />
        </div>
        <BuyConfirmationUI shipment={shipment} setShipment={setShipment} address={address} setAddress={setAddress} />
      </div>
    </Main>
  );
};

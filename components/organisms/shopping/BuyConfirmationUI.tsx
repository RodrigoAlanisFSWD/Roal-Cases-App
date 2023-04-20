import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { Discount } from '../../../models/discount';
import { confirmCart } from '../../../redux/states/cart';
import { setSelectedAddress, setSelectedDiscount, setSelectedShipment, setStatus } from '../../../redux/states/payment';
import { AppStore } from '../../../redux/store';
import { getDiscountFromCode } from '../../../services/discountService';
import { calcPercent } from '../../../utilities/prices';
import { Alert } from '../../atoms/shared/Alert';
import { Button } from '../../atoms/shared/Button';
import { FormControl } from '../../atoms/shared/FormControl';
import { Shipping } from './Shipping';
import * as types from "../../../redux/types/payment";
import { Shipment } from '../../../models/shipment';
import { Address } from '../../../models/address';

interface BuyConfirmationUIProps {
  shipment: Shipment | null;
  address: Address | null;
  setShipment: any;
  setAddress: any;
}

export const BuyConfirmationUI: FC<BuyConfirmationUIProps> = ({ shipment, setShipment, address, setAddress }) => {

  const cart = useSelector((store: AppStore) => store.cart);

  const [error, setError] = useState("");

  const [discountError, setDiscountError] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const discountSchema = Yup.object().shape({
    code: Yup.string()
      .min(5)
      .required()
  })

  const [discount, setDiscount] = useState<Discount | null>(null); 

  const getPrice = () => {
    const price = discount ? cart.totalCost - calcPercent(cart.totalCost, discount.percent) : cart.totalCost

    return price
  }

  const getTotalPrice = () => {
    return shipment ? getPrice() + shipment?.price : getPrice()
  }

  return (
 <div className="bg-white shadow-md border flex flex-col">
 <h2 className="text-2xl border-b border-gray-200 w-full p-5">
   Resumen Del Pedido
 </h2>
 <div className="p-5 border-b border-gray-200 w-full">
   <div className="flex justify-between mb-4">
     <h3 className="text-xl">Precio:</h3>
     <h3 className="text-xl">{
      discount ?
        (
          <>
            ${cart.totalCost + ' '}
            <span className="text-primary mr-2">
              - %{discount.percent} 
            </span>
          </>
        ) : '$' + cart.totalCost
     }</h3>
   </div>
   <div className="flex justify-between">
     <h3 className="text-xl">Envio:</h3>
     <h3 className="text-xl">${shipment?.price || 0}</h3>
   </div>
 </div>
 <div className="flex justify-between p-5 border-b border-gray-200">
   <h3 className="text-xl">Total:</h3>
   <h3 className="text-xl">
     ${getTotalPrice()}
   </h3>
 </div>
 <div className="p-5 border-b border-gray-200">
   <h3 className="text-xl mb-5">
     Codigo De Descuento
   </h3>

   <Formik
     initialValues={{
       code: ''
     }}
     validationSchema={discountSchema}
     onSubmit={async (values: any) => {
      try {
        const res = await getDiscountFromCode(values.code)

        setDiscount(res)

      } catch (error) {
        setDiscount(null)
        setDiscountError(true)
      }
       
     }}
   >
     {({ touched, errors, handleSubmit }) => (
       <Form className="flex flex-col">
         <FormControl name="code" type="text" icon={faMoneyBill} placeholder="Codigo" error={errors.code} touched={touched.code} className="mb-3" />

         <Button text="Aplicar" onClick={handleSubmit} />

         {
           discountError ? <Alert text="El Descuento Es Invalido" className="mt-3" /> : null
         }
       </Form>
     )}
   </Formik>
 </div>
 <Shipping
   selected={shipment}
   onChange={(payload) => {
     if (shipment?.id === payload.id) {
       setShipment(null);
     } else {
       setShipment(payload);
     }
   }}
 />
 <div className="p-5">

   <Button
     text="Continuar Con La Compra"
     disabled={
       !address || !shipment
     }
     onClick={async () => {
       if (cart.products.length < 1) {
         setError("No Tienes Productos En El Carrito");
         return;
       }
       if (!address) {
         setError("Selecciona Una Direccion");
         return;
       }

       if (!shipment) {
         setError("Selecciona Un Tipo De Envio");
         return;
       }

       dispatch(confirmCart());
       dispatch(setSelectedAddress(address));
       dispatch(setSelectedShipment(shipment));
       if (discount) {
         dispatch(setSelectedDiscount(discount));
       }
       dispatch(setStatus(types.IN_PROCESS));

       router.push(
         "/shopping/payment"
       )
     }}
   />
   {error.length > 1 && <Alert text={error} className="mt-5" />}
 </div>
</div> 
  )
}

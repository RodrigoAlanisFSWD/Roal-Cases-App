import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react'
import { Shipment } from '../../../../models/shipment';
import * as Yup from 'yup'
import { updateProduct } from '../../../../services/productsService';
import { createShipment, updateShipment } from '../../../../services/shipmentService';
import { Button } from '../../../atoms/shared/Button';
import { FormControl } from '../../../atoms/shared/FormControl';
import { faBox, faCalendar, faCode, faFileText, faList, faMoneyBill1, faPercent, faTextHeight } from '@fortawesome/free-solid-svg-icons';
import { Discount, DiscountType } from '../../../../models/discount';
import { DateInput } from '../../../atoms/shared/DateInput';
import { createDiscount, updateDiscount } from '../../../../services/discountService';

interface DiscountFormProps {
    edit?: boolean;
    discount?: Discount;
}

export const DiscountForm: FC<DiscountFormProps> = ({ edit, discount }) => {

    const router = useRouter();

    const createDiscountSchema = Yup.object().shape({
        code: Yup.string()
        .required(),
        percent: Yup.number()
        .required()
        .min(1),
        expirationDate: Yup.string()
        .required()
    })

    const onSubmit = async (data: any) => {
        if (!edit) {
            await createDiscount({
                ...data,
                type: DiscountType.FOR_FINAL_PRICE
            })
        } else {
            await updateDiscount({
                ...discount,
                ...data,
            })
        }

        router.push("/dashboard/discounts")
    }

    return (
        <div className="flex justify-center items-center h-full flex-col">
            <h2 className="text-4xl mb-14">
                {!edit ? 'Crear Descuento' : 'Editar Descuento'}
            </h2>

            <Formik
                initialValues={edit && discount ? {
                    code: discount.code,
                    percent: discount.percent,
                    expirationDate: discount.expirationDate
                } : {
                    code: "",
                    percent: 0,
                    expirationDate: ""
                }}
                validationSchema={createDiscountSchema}
                onSubmit={onSubmit}
            >
                {({ touched, errors, handleSubmit, values, setFieldValue }) => (
                    <Form className="w-full sm:w-[450px] h-auto">
                        <FormControl icon={faFileText} placeholder="Code" name="code" type="text" error={errors.code} touched={touched.code} className="mb-4" />
                        <FormControl icon={faPercent} placeholder="Porcentaje" name="percent" type="text" error={errors.percent} touched={touched.percent} className="mb-4" />
                        <DateInput name="expirationDate" value={values.expirationDate} onChange={setFieldValue} error={errors.expirationDate} touched={touched.expirationDate} />

                        <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
                            className="mt-14" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

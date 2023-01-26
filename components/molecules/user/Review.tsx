import React, { FC } from 'react'
import { YesOrNo } from '../../atoms/shared/YesOrNo'

interface ReviewProps {
    review: any;
    setReview?: any;
    inmutable?: boolean;
}

export const Review: FC<ReviewProps> = ({ review, setReview, inmutable }) => {
    return (
        <>
            <div className='w-full p-5 text-xl flex items-center'>
                <h3 className='mr-5'>
                    Tu pedido llego en el tiempo estimado ?
                </h3>
                <YesOrNo value={review.shipping} onChange={(payload: boolean) => {
                    if (!inmutable) {
                        setReview({
                            ...review,
                            shipping: payload
                        })
                    }
                }} />
            </div>
            <div className='w-full p-5 text-xl flex items-center'>
                <h3 className='mr-5'>
                    Tu pedido llego en buenas condiciones ?
                </h3>
                <YesOrNo value={review.condition} onChange={(payload: boolean) => {
                    if (!inmutable) {
                        setReview({
                            ...review,
                            condition: payload
                        })
                    }
                }} />
            </div>
            <div className='w-full p-5 text-xl flex items-center'>
                <h3 className='mr-5'>
                    Tu pedido es lo que esperabas ?
                </h3>
                <YesOrNo value={review.order} onChange={(payload: boolean) => {
                    if (!inmutable) {
                        setReview({
                            ...review,
                            order: payload
                        })
                    }
                }} />
            </div>
            <div className='w-full p-5 text-xl flex items-center'>
                <h3 className='mr-5'>
                    La app funciono de manera satisfactoria ?
                </h3>
                <YesOrNo value={review.app} onChange={(payload: boolean) => {
                    if (!inmutable) {
                        setReview({
                            ...review,
                            app: payload
                        })
                    }
                }} />
            </div></>
    )
}

import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { Order, OrderProduct } from '../../../models/order'
import { OrderReview, Review as ReviewType } from '../../../models/review'
import { createSell } from '../../../services/sellService'
import { Button } from '../../atoms/shared/Button'
import { YesOrNo } from '../../atoms/shared/YesOrNo'
import { OrderDetailProduct } from '../../molecules/user/OrderDetailProduct'
import { Review } from '../../molecules/user/Review'
import { ReviewProduct } from '../../molecules/user/ReviewProduct'

interface FinishOrderProps {
    order: Order
}

export const FinishOrder: FC<FinishOrderProps> = ({ order }) => {

    const { products } = order

    const [review, setReview] = useState({
        app: false,
        condition: false,
        extra: "",
        order: false,
        shipping: false
    })

    const router = useRouter()

    const [reviews, setReviews] = useState<any[]>([])

    const addReview = (product: OrderProduct, stars: number) => {
        const existIndex = reviews.findIndex((r: ReviewType) => r.product.id === product.product.id)

        if (existIndex > -1) {
            setReviews([
                ...reviews.filter((r: ReviewType) => r.product.id !== product.product.id),
                {
                    product: product.product,
                    stars,
                    count: product.count,
                }
            ])
            return
        }

        setReviews([
            ...reviews,
            {
                product: product.product,
                stars,
                count: product.count,
            }
        ])

    }

    const onSubmit = async () => {
        if (reviews.length === 0) {
            return
        }

        await createSell({
            order,
            orderReview: review,
            reviews
        })

        router.push("/user")
    }

    return (
        <div className='min-h-[calc(100vh-100px)] w-full shadow-lg grid grid-cols-12'>
            <div className='col-span-12 md:col-span-4 w-full border-r border-gray-200'>
                <h2 className='text-2xl m-5'>
                    Reseñas
                </h2>
                <div>
                    {
                        products.map((product: OrderProduct) => <ReviewProduct addReview={addReview} {...product} key={product.id} />)
                    }
                </div>
            </div>
            <div className='col-span-12 md:col-span-8'>
                <h2 className='text-2xl p-5'>
                    Finalizar Orden
                </h2>
                <Review review={review} setReview={setReview} />
                <div className='p-5 text-xl'>
                    <h3>
                        Tienes algun comentario extra ?
                    </h3>
                    <div
                        className={`w-full min-h-[100px] items-start p-2 bg-white border rounded-sm flex mt-5`}
                    >
                        <textarea onChange={(e: any) => setReview({
                            ...review,
                            extra: e.target.value
                        })} placeholder="Comentarios" name="textarea" className="text-xl placeholder:text-secondary resize-none w-11/12 outline-none" />
                    </div>
                    <Button onClick={() => onSubmit()} text='Finalizar' className="mt-5 w-full sm:w-[350px]" />
                </div>
            </div>
        </div>
    )
}

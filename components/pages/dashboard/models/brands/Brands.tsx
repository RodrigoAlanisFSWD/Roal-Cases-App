import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { Brand as BrandType } from '../../../../../models/models'
import { deleteBrand } from '../../../../../services/modelsService'
import { Button } from '../../../../atoms/shared/Button'
import { Brand } from '../../../../molecules/dashboard/models/Brand'

interface BrandsProps {
  brands: BrandType[]
}

export const Brands: FC<BrandsProps> = ({ brands }) => {

  const [list, setList] = useState(brands)

  const router = useRouter()

  return (
    <div>
        <h2 className='text-2xl sm:text-3xl mb-6'>
            Marcas
        </h2>

        <div>
          {
            list.map((brand: BrandType) => <Brand onDelete={(id: number) => {
              setList(list.filter((i: any) => i.id !== id))
              deleteBrand(id)
            }} key={brand.id} {...brand} />)
          }
        </div>

        <Button text="Crear Marca" className="w-full mt-6 sm:w-[250px]" onClick={() => router.push("/dashboard/models/brands/create")}/>
    </div>
  )
}

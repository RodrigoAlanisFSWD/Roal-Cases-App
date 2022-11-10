import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Model as ModelType } from '../../../../models/models'
import { SelectItemType } from '../../../../models/select'
import { deleteModel, getBrands, getModels } from '../../../../services/modelsService'
import { Button } from '../../../atoms/shared/Button'
import { Model } from '../../../molecules/dashboard/models/Model'
import { Select } from '../../../molecules/shared/Select'

export const Models = () => {

  const router = useRouter()

  const [models, setModels] = useState<Array<ModelType>>([])

  const [brands, setBrands] = useState<Array<SelectItemType>>([])

  const [selectedBrand, setSelectedBrand] = useState<SelectItemType | null>(null)

  useEffect(() => {
    const init = async () => {
      const brands = await getBrands()
      setBrands(brands.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.id, text: cur.name }], []))
    }

    init()
  }, [])

  const search = async () => {
    setModels(await getModels(selectedBrand?.key as number))
  }

  return (
    <div>
      <div className='flex w-full flex-col lg:flex-row lg:items-center mb-6 justify-between'>
        <h2 className='text-2xl sm:text-3xl mr-5 mb-5 lg:mb-0'>
          Modelos
        </h2>
        <div className='flex flex-col lg:flex-row justify-start'>
          <Select items={brands} selectedItem={selectedBrand} onSelect={(item: SelectItemType) => setSelectedBrand(item)} placeholder="Marca" className='w-full lg:w-[450px]' width='w-[calc(100%-98px)] lg:w-[450px]' />
          <Button text="Buscar" className="lg:w-[250px] mt-5 lg:mt-0 lg:ml-5 h-[55px]" onClick={() => search()} />
        </div>

      </div>

      {
        models.map((model: ModelType) => <Model key={model.id} {...model} onDelete={async (id: number) => {
          deleteModel(id)
          setModels(models.filter((i: any) => i.id !== id))
        }} />)
      }

      <Button text="Crear Modelo" className="w-full mt-6 sm:w-[250px] h-[55px]" onClick={() => router.push("/dashboard/models/create")} />
    </div>
  )
}

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useSearch } from '../../../hooks/search'
import { Category } from '../../../models/category'
import { setQuery } from '../../../redux/states/search'
import { AppStore } from '../../../redux/store'
import { Button } from '../../atoms/shared/Button'
import { SearchInput } from '../../atoms/shared/SearchInput'
import { Main } from '../../layouts/Main'
import { ProductsList } from '../../organisms/products/ProductsList'
import { SubCategoryFilter } from '../../organisms/products/SubCategoryFilter'

interface ProductsProps {
  category?: Category | null;
}

export const Products: FC<ProductsProps> = ({ category }) => {

  const router = useRouter();

  const dispatch = useDispatch();

  const params = router.query;

  const [searchQuery, setSearchQuery] = useState<string>(params.query ? params.query as string : "")

  useEffect(() => {
    dispatch(setQuery(searchQuery))
  }, [searchQuery])

  const [showFilters, setShowFilters] = useState(false)

  const { search } = useSearch();

  return (
    <Main>
      <div className="w-full max-h-full h-[100%] row-[2/3] grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] overflow-y-scroll">
        <div className='hidden lg:block'>
          <SubCategoryFilter />
        </div>

        <div className='grid grid-cols-1 grid-rows-[75px_1fr]'>
          <div className='flex flex-col lg:flex-row justify-between p-5 items-center bg-white'>
            <div className='flex items-center w-full justify-between'>
              <div className='lg:hidden'>
                <FontAwesomeIcon icon={faBars} className="text-2xl text-secondary block  mr-5" onClick={() => setShowFilters(!showFilters)} />
              </div>
              <h2 className='text-2xl '>
                {
                  category && (
                    <span>
                      Categoria: {category?.name}
                    </span>
                  )
                }
                {
                  params.query && !category && (
                    <span>
                      Busqueda: { params.query }
                    </span>
                  )
                }
                {
                  !category && !params.query && (
                    <span>
                      Productos
                    </span>
                  )
                }
              </h2>
              <div className='hidden lg:flex lg:w-3/5 xl:w-2/4'>
                <SearchInput value={searchQuery} onChange={(value) => setSearchQuery(value)} />
                <Button onClick={() => search()} text='Buscar' className="w-[200px] h-12 ml-5" />
              </div>
            </div>

            <AnimatePresence>
              {
                showFilters && (
                  <motion.div
                    initial={{ translateX: "-100%" }}
                    animate={{ translateX: "0%" }}
                    exit={{ translateX: "-100%" }}
                    transition={{ duration: 0.3 }} className='bg-white absolute lg:relative lg:hidden w-full mt-[50px] flex flex-col p-5'>
                    <div className='flex lg:w-3/5 xl:w-2/4'>
                      <SearchInput value={searchQuery} onChange={(value) => setSearchQuery(value)} />
                      <Button onClick={() => search()} text='Buscar' className="w-[200px] h-12 ml-5" />
                    </div>
                    <SubCategoryFilter />
                  </motion.div>
                )
              }
            </AnimatePresence>
          </div>
          <ProductsList />
        </div>
      </div>
    </Main>
  )
}

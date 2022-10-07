import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Group, SubCategory } from '../../../models/category';
import { useGroupService } from '../../../services/groupService';
import { useSearchService } from '../../../services/searchService';
import { store, StoreState } from '../../../store';
import { Button } from '../../atoms/shared/Button';
import { SubCategoryFilterGroup } from '../../molecules/products/SubCategoryFilterGroup'

export const SubCategoryFilter = () => {

    const { getGroups } = useGroupService();

    const groups = useSelector((store: StoreState) => store.groups)

    const { search } = useSearchService()

  const subCategories = useSelector((store: StoreState) => store.search.subCategories)

    useEffect(() => {
        const init = async () => {
            await getGroups()
        }

        init()
    }, [])


  return (
    <div className='w-full bg-white min-h-[200px] h-[200px] max-h-full lg:h-full lg:shadow-md p-5'>
        {
            groups.map((group: Group) => <SubCategoryFilterGroup filters={subCategories} key={group.id} {...group} />)
        }
        <Button text="Aplicar" className="mt-5" onClick={() => search()} />
    </div>
  )
}

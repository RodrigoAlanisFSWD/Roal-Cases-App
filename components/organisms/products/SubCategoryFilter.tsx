import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSearch } from '../../../hooks/search';
import { Group } from '../../../models/category';
import { setGroups } from '../../../redux/states/groups';
import { AppStore } from '../../../redux/store';
import { getGroups } from '../../../services/groupsService';
import { Button } from '../../atoms/shared/Button';
import { SubCategoryFilterGroup } from '../../molecules/products/SubCategoryFilterGroup'

export const SubCategoryFilter = () => {

    const { groups, search: { subCategories } } = useSelector((store: AppStore) => store)

  const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            const groups = await getGroups()

            dispatch(setGroups(groups))
        }

        init()
    }, [])

    const { search } = useSearch();

  return (
    <div className='w-full bg-white min-h-[200px] h-[200px] max-h-full lg:h-full lg:shadow-md p-5'>
        {
            groups.map((group: Group) => <SubCategoryFilterGroup filters={subCategories} key={group.id} {...group} />)
        }
        <Button text="Aplicar" className="mt-5" onClick={() => search()} />
    </div>
  )
}

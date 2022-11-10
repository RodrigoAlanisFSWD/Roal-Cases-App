import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div
      className="w-full h-12 bg-white border rounded-sm flex items-center pl-4"
    >
      <FontAwesomeIcon icon={faSearch} className="text-2xl mr-4 text-secondary" />
      <input value={value} onChange={({target}) => onChange(target.value)} className="outline-none h-full w-11/12 border-none text-xl" placeholder="Buscar" type={"text"} name={"search"} />
    </div>
  )
}

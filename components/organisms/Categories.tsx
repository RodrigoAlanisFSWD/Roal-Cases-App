import React, { useState } from 'react'
import { Button } from '../atoms/Button'
import { Category } from '../molecules/Category'
import styles from '../../styles/organisms/Categories.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


export const Categories = () => {

  const [showMore, setShowMore] = useState(false)

  return (
    <div className={styles['categories']}>
        <div className={`${styles['categories__articles']} ${showMore ? styles['categories__articles--more'] : ''}`}>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        </div>

        <span onClick={() => setShowMore(!showMore)}>
            { showMore ? (<span>Ver Menos <FontAwesomeIcon icon={faChevronUp} /></span>) : (<span>Ver Mas <FontAwesomeIcon icon={faChevronDown} /></span>)  }
        </span>
    </div>
  )
}

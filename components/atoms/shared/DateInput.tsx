import { faCalendar, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, forwardRef } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

registerLocale('es', es)

interface DateInputProps {
    name: string
    value: any
    onChange: any
    error?: any;
    touched?: any;
    className?: string;
}

export const DateInput: FC<DateInputProps> = ({ value, name, onChange, error, touched, className }) => {

    const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
        <div className={`w-full h-14 bg-white border rounded-sm flex items-center text-xl pl-4 ${error && !value
                ? "border-danger"
                : !error && value
                    ? "border-primary"
                    : "border-gray-200"
            } ${className}`} onClick={onClick}>
            <FontAwesomeIcon icon={faCalendar} className="text-2xl mr-4 text-secondary" />

            <span className={value ? 'w-11/12' : 'text-gray-400 w-11/12'}>
                {value ? value : "Selecciona Una Fecha De Expiracion"}
            </span>
            {error && !value ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={`text-xl text-danger mr-4`}
        />
      ) : null}
      {!error && value ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`text-xl text-primary mr-4`}
        />
      ) : null}
        </div>
    ))

    return (
        <ReactDatePicker
            selected={(value && new Date(value)) || null}
            value={value}
            locale="es"
            dateFormat="yyyy/MM/dd"
            onChange={val => {
                onChange(name, val)
            }}
            name={name}
            customInput={<CustomInput />}
        />
    )
}

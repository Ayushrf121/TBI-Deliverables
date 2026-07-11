import React from 'react'

export default function Input({className,id,placeholder,type,registerName,rules,registerField}) {
    return (
        <input className={className} type={type} placeholder={placeholder} id={id} {...registerField(registerName,rules)} />
        
    )
}

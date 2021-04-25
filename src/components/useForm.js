import React,{useState, useEffect} from 'react'

const useForm= (initialFieldValues,validateOnChange=false, validate) =>{
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    function handleInputChange(e) {
        const {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        })

        if(validateOnChange)
            validate({ [name] : value })
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({})
    }

    return {
        values,
        setValues,
        errors, 
        setErrors,
        handleInputChange,
        resetForm
    }
}

export default useForm

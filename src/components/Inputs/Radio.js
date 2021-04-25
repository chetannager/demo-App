import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@material-ui/core'
import React from 'react'

function Radio(props) {
    const { label, name, value, items, onChange } = props
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(item => (
                        <FormControlLabel control={<Radio />} label={item.label} value={item.value} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default Radio

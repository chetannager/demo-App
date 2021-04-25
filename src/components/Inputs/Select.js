import React from 'react'
import {Select as MuiSelect, FormControl, FormLabel, MenuItem, makeStyles, InputLabel} from '@material-ui/core'

const useStyle= makeStyles(theme=>({
    FormControl:{
        margin:theme.spacing(1),
        width:'100%'
    },
    selectEmpty:{
    }
}))

function Select(props) {
    const classes = useStyle()
    const {variant, label, name, value, withoutLabel=false, onChange, options, ...other} = props

    return (
        <FormControl variant={ variant || "outlined"} className={classes.FormControl}>
            {
                withoutLabel?(
                    ""
                ):(
                    <InputLabel id="select-control-label">{label}</InputLabel>
                )
            }
            <MuiSelect
            autoWidth
            labelId="select-control-label" 
            label={label}
            value={value}
            name={name}
            onChange={onChange}
            className={classes.selectEmpty}
            {...other}
            >
                {
                    options.map(item=>(
                        <MenuItem key={item.value} value={item.value}>
                            <span dangerouslySetInnerHTML={{__html:item.title}}></span>
                        </MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>
    )
}

export default Select

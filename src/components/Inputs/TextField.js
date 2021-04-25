import React from 'react'
import {makeStyles, TextField as MuiTextField} from '@material-ui/core'

const useStyle= makeStyles(theme=>({
    root:{
        width:'100%'
    },
    textField:{
        width: '100%',
    }
}))

function TextField(props) {
    const classes = useStyle()

    const {label, variant, value, id, size, error = null, onChange,...other} = props

    return (
        <MuiTextField
        style={{ margin: 8 }}
        label={label}
        fullWidth
        value={value}
        variant={variant||"outlined"}
        size={size||"Normal"}
        onChange={onChange}
        className={classes.root}
        {...other}
        {...(error && {error:true,helperText:error})}
        />
    )
}

export default TextField

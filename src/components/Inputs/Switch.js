import { createStyles, FormControl, FormControlLabel, makeStyles, Switch as MuiSwitch } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > *': {
                margin: theme.spacing(1),
                width: '100%',
            },
        },
    }),
);

function Switch(props) {
    const classes = useStyles()
    const { label, name, size, edge, checked, value, items, onChange, ...others } = props
    return (
        <FormControl
            className={classes.root}
        >
            <FormControlLabel
                control={<MuiSwitch
                    edge={edge || "start"}
                    size={size || "medium"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                />}
                label={label}
                {...others}
            />
        </FormControl>
    )
}

export default Switch

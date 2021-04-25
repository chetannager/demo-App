import { Theme, Dialog, DialogContent, DialogTitle, IconButton, makeStyles, Typography, withStyles, WithStyles, DialogActions, createStyles } from '@material-ui/core'
import React from 'react'
import { Close as CloseIcon } from '@material-ui/icons'
import { Zoom, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });


export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const CustomDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

const CustomDialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(DialogContent);

const CustomDialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(DialogActions);

function Modal(props) {
    const { title, children, actions, openModal, setOpenModal , isTitleShow = true, isActionsShow=false, ...other } = props
    return (
        <Dialog 
        open={openModal}
         fullWidth 
         {...other}>
            {isTitleShow?(<CustomDialogTitle onClose={() => setOpenModal(false)}>
                {title}
            </CustomDialogTitle>):""}
            <DialogContent dividers>
                {children}
            </DialogContent>
            {
                isActionsShow?(
                    <DialogActions>
                        {actions}
                    </DialogActions>
                ):""
            }
        </Dialog>
    )
}

export default Modal

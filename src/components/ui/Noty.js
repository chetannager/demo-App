import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = (msg, type, timeout = 1500, progressBar = false, theme = 'nest') => {
    // new Noty({ text: msg, theme, type, timeout, progressBar, }).show();
    new toast.success(msg, {
        position: toast.POSITION.TOP_CENTER
    });
}
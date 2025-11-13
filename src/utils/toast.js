/**
 * Toast Notification Utilities
 * Centralized toast notifications using react-toastify
 */

import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const showError = (message) => {
  toast.error(message, toastConfig);
};

export const showInfo = (message) => {
  toast.info(message, toastConfig);
};

export const showWarning = (message) => {
  toast.warning(message, toastConfig);
};

export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
};

// Centralized notify helper wrapping vue3-toastify
// Provides consistent defaults and easy future swapping.
import { toast } from 'vue3-toastify'

const base = {
  position: 'top-right',
  pauseOnHover: true,
  closeOnClick: true,
  draggable: true,
  newestOnTop: true,
  hideProgressBar: false,
  theme: 'colored'
}

function build(options = {}, fallbackAutoClose) {
  const { autoClose = fallbackAutoClose } = options
  return { ...base, ...options, autoClose }
}

export const notify = {
  success(message, options) { return toast.success(message, build(options, 5000)) },
  info(message, options) { return toast.info(message, build(options, 5000)) },
  warn(message, options) { return toast.warning(message, build(options, 6000)) },
  error(message, options) { return toast.error(message, build(options, 8000)) },
  // sticky: requires manual close (good for validation / blocking errors)
  sticky(message, options) { return toast(message, build({ autoClose: false, ...options }, false)) },
  raw: toast
}

export default notify

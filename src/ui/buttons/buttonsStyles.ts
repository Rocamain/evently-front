export const baseStyles =
  'py-3 px-4 text-lg font-bold rounded-lg transition-colors border-2'

export const styles = {
  contained: {
    teal: `${baseStyles} text-white bg-teal-500 hover:bg-teal-700/75`,
    red: `${baseStyles} text-white bg-red-500 hover:bg-red-800/75`,
  },
  outlined: {
    teal: `${baseStyles} text-teal-500 border-transparent hover:text-teal-800 hover:border-teal-500/75`,
    red: `${baseStyles} text-red-500 border-transparent hover:text-red-800 hover:border-red-500/75`,
  },
}

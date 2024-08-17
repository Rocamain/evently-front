export const baseStyles =
  'text-lg font-bold rounded-lg transition-colors border-2'

export const styles = {
  contained: {
    teal: {
      small: `${baseStyles}py-[5px] px-4 text-white bg-teal-500 hover:bg-teal-700/75`,
      big: `${baseStyles} py-3 px-4 text-white bg-teal-500 hover:bg-teal-700/75`,
    },
    red: {
      small: `${baseStyles}py-[5px] px-4 text-white bg-red-500 hover:bg-red-800/75`,
      big: `${baseStyles} py-3 px-4 text-white bg-red-500 hover:bg-red-800/75`,
    },
  },
  outlined: {
    teal: {
      small: `${baseStyles} py-[5px] px-4 text-teal-500 border-teal-500 hover:text-teal-800 hover:border-teal-500/70`,
      big: `${baseStyles} py-2 px-4 text-teal-500 border-teal-500 hover:text-teal-800 hover:border-teal-500/70`,
    },
    red: {
      small: `${baseStyles} py-[5px] px-4 text-red-500 border-red-500 hover:text-red-800 hover:border-red-500/70 `,
      big: `${baseStyles} py-2 px-4 text-red-500 border-red-500 hover:text-red-800 hover:border-red-500/70`,
    },
  },
}

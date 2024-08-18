import { FC } from 'react'

type ChevronProps = {
  clickHandler: (isLeft: boolean) => void
  left?: boolean
  right?: boolean
}

const ChevronBtn: FC<ChevronProps> = ({ clickHandler, left, right }) => {
  if (right) {
    return (
      <div className="h-full absolute right-[1.2rem]">
        <button
          onClick={() => clickHandler(false)}
          className="absolute h-[40px] w-[40px] bg-slate-100 rounded-full shadow-chevron hover:shadow-chevron-hover inset-y-0 my-auto z-10 border-solid-2px border- hover:bottom-1"
        >
          <div style={{ width: '16px', height: '16px', margin: '0 auto' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="injected-svg stroke-current stroke-1 text-black fill-current"
              data-icon="icon-43"
              style={{ width: '16px', height: '16px' }}
            >
              <title>icon chevron right</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.46967 21.5303C9.17678 21.2374 9.17678 20.7626 9.46967 20.4697L17.7626 12.1768C17.8602 12.0791 17.8602 11.9209 17.7626 11.8232L9.46967 3.53033C9.17678 3.23744 9.17678 2.76256 9.46967 2.46967C9.76256 2.17678 10.2374 2.17678 10.5303 2.46967L18.8232 10.7626C19.5066 11.446 19.5066 12.554 18.8232 13.2374L10.5303 21.5303C10.2374 21.8232 9.76256 21.8232 9.46967 21.5303Z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    )
  }
  if (left) {
    return (
      <div className="h-full absolute left-[-1.2rem]">
        <button
          onClick={() => clickHandler(true)}
          className="absolute h-[40px] w-[40px] bg-slate-100 rounded-full shadow-chevron hover:shadow-chevron-hover inset-y-0 my-auto z-10 border-solid-2px border- hover:bottom-1"
        >
          <div style={{ width: '16px', height: '16px', margin: '0 auto' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="injected-svg stroke-current stroke-1 text-black fill-current"
              style={{ width: '16px', height: '16px' }}
              data-icon="icon-538"
            >
              <title>icon chevron left</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5304 2.46967C16.8233 2.76256 16.8233 3.23744 16.5304 3.53033L8.23753 11.8232C8.1399 11.9209 8.1399 12.0791 8.23753 12.1768L16.5304 20.4697C16.8233 20.7626 16.8233 21.2374 16.5304 21.5303C16.2375 21.8232 15.7627 21.8232 15.4698 21.5303L7.17687 13.2374C6.49345 12.554 6.49345 11.446 7.17687 10.7626L15.4698 2.46967C15.7627 2.17678 16.2375 2.17678 16.5304 2.46967Z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    )
  }
  return null
}

export default ChevronBtn

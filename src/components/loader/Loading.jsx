

export default function Loading({fullHeightWidth}) {
  return (
    <>
    <div className={`fixed ${!fullHeightWidth?'w-dvw h-dvh top-0 left-0':'top-72px left-xl-256px left-0 bottom-0 right-0'} bg-slate-400/40 z-20`}>
      <div className={`absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-transparent top-1/2 left-1/2 z-50 `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          width="100%"
          height="100%"
          style={{shapeRendering: 'auto', display: 'block', background: 'transparent',}}
        >
          <g>
            <g>
              <circle fill="#79a33d" r="4" cy="50" cx="60">
                <animate
                  begin="-0.67s"
                  keyTimes="0;1"
                  values="95;35"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="cx"
                ></animate>
                <animate
                  begin="-0.67s"
                  keyTimes="0;0.2;1"
                  values="0;1;1"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
              <circle fill="#79a33d" r="4" cy="50" cx="60">
                <animate
                  begin="-0.33s"
                  keyTimes="0;1"
                  values="95;35"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="cx"
                ></animate>
                <animate
                  begin="-0.33s"
                  keyTimes="0;0.2;1"
                  values="0;1;1"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
              <circle fill="#79a33d" r="4" cy="50" cx="60">
                <animate
                  begin="0s"
                  keyTimes="0;1"
                  values="95;35"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="cx"
                ></animate>
                <animate
                  begin="0s"
                  keyTimes="0;0.2;1"
                  values="0;1;1"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
            <g transform="translate(-15 0)">
              <path
                transform="rotate(90 50 50)"
                fill="#cc080b"
                d="M50 50L20 50A30 30 0 0 0 80 50Z"
              ></path>
              <path fill="#cc080b" d="M50 50L20 50A30 30 0 0 0 80 50Z">
                <animateTransform
                  keyTimes="0;0.5;1"
                  values="0 50 50;45 50 50;0 50 50"
                  dur="1s"
                  repeatCount="indefinite"
                  type="rotate"
                  attributeName="transform"
                ></animateTransform>
              </path>
              <path fill="#cc080b" d="M50 50L20 50A30 30 0 0 1 80 50Z">
                <animateTransform
                  keyTimes="0;0.5;1"
                  values="0 50 50;-45 50 50;0 50 50"
                  dur="1s"
                  repeatCount="indefinite"
                  type="rotate"
                  attributeName="transform"
                ></animateTransform>
              </path>
            </g>
            <g></g>
          </g>
        </svg>
      </div>
    </div>
    </>
  );
}

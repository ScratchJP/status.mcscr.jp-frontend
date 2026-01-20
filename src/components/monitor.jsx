function timeFormat(seconds) {
  if (seconds < 0) return "(invalid arg)";

  const texts = []

  let secondsValue = seconds

  if (seconds >= 24 * 60 * 60) {
    const value = Math.floor(secondsValue / (24 * 60 * 60));
    if (value > 0) texts.push(`${value}d`)
    secondsValue %= 24 * 60 * 60
  }
  if (seconds >= 60 * 60) {
    const value = Math.floor(secondsValue / (60 * 60));
    if (value > 0) texts.push(`${value}h`)
    secondsValue %= 60 * 60
  }
  if (seconds >= 60) {
    const value = Math.floor(secondsValue / 60);
    if (value > 0) texts.push(`${value}m`)
    secondsValue %= 60
  }
  if (texts.length < 1 || secondsValue !== 0) texts.push(`${secondsValue}s`)

  return texts.join(' ')
};

export default function Monitor({ name, data }) {
  return (
    <div className="grid">
      <div className="text-lg mb-1 font-medium">
        {name}
        {typeof data?.uptimePercentage === "number" && (
          <>
            <span className="font-normal select-none"> | </span>
            <span className="text-blue-400">
              {data.uptimePercentage.toFixed(3)}%
            </span>
          </>
        )}
      </div>
      <div className="w-full h-12 flex flex-row select-none">
        {
          ( data?.data || Array.from({ length: 90 }).fill({ offlineSeconds: -1 })).map((info, idx) => {
            const color = info.offlineSeconds < 0 ? "gray-500"
                          : info.offlineSeconds > 60 ? "red-500"
                          : "green-500";

            return (
              <div key={idx} className={`flex-auto rounded-full h-full mx-[1px] bg-${color} hover:bg-${color}/60 relative group ${idx < 45 ? "hidden sm:block" : ""}`}>
                <div className="hidden group-hover:block absolute bottom-12 left-1/2 -translate-x-1/2 w-0 h-0 border-16 border-b-0 border-x-transparent border-t-[gray] pointer-events-none blur-xs" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-14 hidden p-2 group-hover:block bg-slate-100 dark:bg-slate-800 z-2 w-32 rounded-md shadow-[0_0_6px_gray]">
                  <div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-12 border-b-0 border-x-transparent border-t-slate-100 dark:border-t-slate-800 pointer-events-none" />
                  </div>
                  <div className="flex flex-col text-center align-start">
                    <p className="text-sm">{ info.date }</p>
                    <p>
                      {
                        info.offlineSeconds < 0 ? "No Data"
                        : info.offlineSeconds ? `Down for ${timeFormat(info.offlineSeconds)}`
                        : "Operational"
                      }
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};
import { useEffect, useRef, useState } from "react"
import { FiChevronDown, FiChevronUp, } from 'react-icons/fi'

export default function ({ data, filter, setFilter }) {
    const [filterdrodown, setFilterdrodown] = useState(false)
    const ref = useRef(null)
    function focuslose(event) {
        ref.current && !ref.current.contains(event.target)
            ? setFilterdrodown(false)
            : null
    }
    useEffect(() => {
        document.addEventListener('click', focuslose, true)
        return () => document.removeEventListener('click', focuslose, true)
    }, [])
    return (
        <>
            <button
                onClick={() => setFilterdrodown((prev) => !prev)}
                className='bg-gray-400/50 flex flex-row items-center rounded-xl'
            >
                <span className='max-sm:hidden p-2'>
                    {filter}
                </span>
                {filterdrodown
                    ? <FiChevronUp className='w-5 h-5 mx-2 text-gray-500' />
                    : <FiChevronDown className='w-5 h-5 mx-2 text-gray-500' />}
            </button>
            {filterdrodown &&
                <div
                    ref={ref}
                    className={`absolute top-12  bg-gray-300 rounded-xl p-2 space-y-1 min-w-40 max-h-60 overflow-scroll shadow shadow-black flex flex-col`} >
                    {data
                        .map(filterdata =>
                            <button
                                key={filterdata}
                                onClick={() => {
                                    setFilter(() => filterdata)
                                    setFilterdrodown((prev) => !prev)
                                }}
                                onAuxClick={() => setFilterdrodown((prev) => false)}

                                className='bg-gray-50 px-3 py-1 rounded-md hover:bg-amber-200'
                            >
                                {filterdata}
                            </button>
                        )}
                </div>
            }
        </>
    )
}


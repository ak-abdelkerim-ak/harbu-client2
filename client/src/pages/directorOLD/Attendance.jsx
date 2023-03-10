import { useState } from "react"
import { FiCheck, FiX } from "react-icons/fi"
import { RxDoubleArrowLeft, RxDoubleArrowRight, RxValueNone } from "react-icons/rx"
import { getJson } from "../../hooks/getData"
import { useParams } from "react-router-dom"


export default () => {
    const { id } = useParams()
    const now = new Date()
    const [month, setMonth] = useState(now.getMonth())
    const year = new Date(now.getFullYear(), month, now.getDate()).getFullYear()
    const { data: attendance, isLoading: isAttendance } = getJson('teacher', id, 'attendance', month + 1)
    const btn1 = 'bg-gray-50 text-gray-500 py-2 px-6 rounded-xl shadow-sm shadow-black/50 active:shadow-none active:bg-gray-500 active:text-white'
    const box1 = 'flex-1 flex justify-center items-center bg-gray-200 py-1  text-clip'

    return (
        <div className="flex-1 md:mx-[10%] flex flex-col space-y-0 rounded-xl overflow-hidden border border-gray-300">
            <div className="flex flex-col md:flex-row bg-gray-300 p-2 max-md:space-y-2 md:space-x-2">
                <div className="flex-1 md:basis-2/3 flex flex-row items-center">
                    <button
                        onClick={() => setMonth(prev => prev - 1)}
                        className={btn1}>
                        <RxDoubleArrowLeft className="w-5 h-5" />
                    </button>
                    <p className='flex-1 text-center'>
                        {new Date(2023, month, 1).toLocaleString('default', { month: 'long' })}{' - '}{year}
                    </p>
                    <button
                        onClick={() => setMonth(prev => month < now.getMonth() ? prev + 1 : prev)}
                        className={btn1}>
                        <RxDoubleArrowRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 basis-1/3 flex flex-row bg-gray-300 rounded-b-xl space-x-0">
                    <div className='flex-1 flex  items-center justify-evenly bg-green-100 text-green-500 rounded-l-lg p-1'>
                        <FiCheck className='w-5 h-5' />
                        <span>
                            {isAttendance
                                ? 0
                                : attendance
                                    .slice(
                                        0,
                                        month === now.getMonth()
                                            ? now.getDate() - 1
                                            : attendance.length
                                    )
                                    .filter(data => data === true).length
                            }
                        </span>
                    </div>
                    <div className='flex-1 flex  items-center justify-evenly  bg-red-100 text-red-500 p-1'>
                        <FiX className='w-5 h-5' />
                        <span>
                            {isAttendance
                                ? 0
                                : attendance
                                    .slice(
                                        0,
                                        month === now.getMonth()
                                            ? now.getDate() - 1
                                            : attendance.length
                                    )
                                    .filter(data => data === false).length
                            }
                        </span>
                    </div>
                    <div className='flex-1 flex  items-center justify-evenly bg-purple-100 text-purple-500 rounded-r-lg p-1'>
                        <RxValueNone className='w-5 h-5' />
                        <span>
                            {isAttendance
                                ? 0
                                : (
                                    month === now.getMonth()
                                        ? now.getDate() - 1
                                        : new Date(
                                            year,
                                            month + 1,
                                            0)
                                            .getDate()
                                )
                                -
                                attendance
                                    .slice(
                                        0,
                                        month === now.getMonth()
                                            ? now.getDate() - 1
                                            : attendance.length
                                    )
                                    .filter((data, index) => (
                                        data === true || data === false
                                    ))
                                    .length
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-row divide-x-2 divide-gray-300 ">
                    <div className={`${box1} before:content-['Sun'] lg:before:content-['Sunday']`}></div>
                    <div className={`${box1} before:content-['Mon'] lg:before:content-['Monday']`}></div>
                    <div className={`${box1} before:content-['Tue'] lg:before:content-['Tuesday']`}></div>
                    <div className={`${box1} before:content-['Wed'] lg:before:content-['Wednesday']`}></div>
                    <div className={`${box1} before:content-['Thu'] lg:before:content-['Thursday']`}></div>
                    <div className={`${box1} before:content-['Fri'] lg:before:content-['Friday']`}></div>
                    <div className={`${box1} before:content-['Sat'] lg:before:content-['Saturday']`}></div>
                </div>
                <div className="grid grid-flow-row grid-cols-7 grid-rows-5 gap-1 p-1 ">
                    {[...Array(new Date(year, month, 1).getDay())].map((d, i) => <div key={i}></div>)}
                    {!isAttendance && [...Array(new Date(year, month + 1, 0).getDate())].map((d, i) => (
                        <div
                            key={i}
                            className={`flex justify-center items-center py-2 md:py-5 text-2xl rounded-full 
                            ${month === now.getMonth() && (i + 1) === now.getDate()
                                    ? 'text-sky-500 bg-sky-50 border border-sky-500'
                                    : month === now.getMonth() && (i + 1) > now.getDate()
                                        ? ''
                                        : attendance[i] === true
                                            ? 'text-green-500 bg-green-50 border border-green-500'
                                            : attendance[i] === false
                                                ? 'text-red-500 bg-red-50 border border-red-500'
                                                : 'text-purple-500 bg-purple-50 border border-purple-500'

                                }
                            `}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}
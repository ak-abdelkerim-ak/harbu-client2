import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VscSearch, } from 'react-icons/vsc'
import { FaSortUp, FaSortDown, FaSort, } from 'react-icons/fa'
import DropDown from '../../components/ui/DropDown'
import { getJson, } from '../../hooks/getData'


export default function Dashboard({ user, datatype }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('All')
    const [sort, setSort] = useState({ "by": 0, "as": true })
    const navigate = useNavigate()

    const { data: teachers, isLoading } = getJson(datatype)
    const { header, list, byfilter } = !isLoading && teachers

    return (
        <div className="p-2 md:px-10 md:py-5">
            {!isLoading
                ? <div className='p-4 rounded-xl bg-gray-300 space-y-2'>
                    <div className='p-2 rounded-xl md:rounded-full bg-gray-200 flex flex-col md:flex-row max-md:space-y-2'>
                        <div className='flex-1 flex flex-row items-center md:px-[5%]'>
                            <p className='w-full'>List of {datatype}s</p>
                        </div>
                        <div className='flex-1 flex flex-row items-center md:px-[5%]'>
                            <div className='relative w-full flex flex-row p-0 rounded-xl bg-white'>
                                <span className='flex items-center'>
                                    <VscSearch className='w-5 h-5 mx-2 text-gray-500' />
                                </span>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    onChange={(e) => setSearch(() => e.target.value)}
                                    className='w-full p-2 border-none focus:ring-0 bg-white'
                                />
                                <DropDown
                                    filter={filter}
                                    setFilter={setFilter}
                                    data={[...new Set(['All', ...list.map(rdata => rdata[byfilter])])]}
                                />
                            </div> 
                        </div>
                    </div>
                    <table className='w-full rounded-lg overflow-hidden'>
                        <thead className='bg-gray-200 max-md:hidden'>
                            <tr>
                                {header.map((headerdata, index) =>
                                    <th
                                        key={index}
                                        onClick={() => setSort((prev) =>
                                            prev.by === index
                                                ? { ...prev, as: !prev.as }
                                                : { by: index, as: true })}
                                        className='text-start p-2'
                                    >
                                        <span className='flex flex-row items-center' >
                                            {sort.by === index
                                                ? sort.as
                                                    ? <FaSortDown className='w-5 h-5 text-green-500' />
                                                    : <FaSortUp className='w-5 h-5 text-green-500' />
                                                : <FaSort className='w-5 h-5 text-sky-200' />}
                                            {headerdata}
                                        </span>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-black/10'>
                            {list
                                .filter(rowdata => rowdata.join('').toLowerCase().includes(search.toLowerCase()))
                                .filter(rowdata => filter === 'All' ? true : filter === rowdata[byfilter])
                                .sort((a, b) => a[sort.by] > b[sort.by] ? sort.as ? 1 : -1 : sort.as ? -1 : 1)
                                .map((rowdata, index) =>
                                    <tr
                                        key={index}
                                        onClick={() => navigate(`${rowdata[0]}`)}
                                        className='max-md:flex max-md:flex-col'
                                        >
                                        {rowdata.map(celldata =>
                                            <td key={celldata} className='pl-7 md:py-2' >
                                                {celldata}
                                            </td>
                                        )}
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                : isLoading ?
                    <p>loading ...</p>
                    : <p>... Error ...</p>
            }
        </div >
    )
}
import { useEffect, useState } from "react"
import { FaSort } from "react-icons/fa"
import { TfiCheck } from "react-icons/tfi"
import { getJson } from "../hooks/getData"
import { Pulse } from "../components/Pulse"
import { Detail } from "./Detail"
import Filter from "./Filter"
import { Navigate } from "react-router-dom"

export default function Dashboard({ datatype }) {
    const { data, isLoading } = getJson(datatype)
    const head = data?.head
    const [body, setBody] = useState([])
    const [filterlists, setFilterlists] = useState({})
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState({ "by": '', "as": true })
    const [detailid, setDetailid] = useState(null)
    useEffect(() => {
        data?.filters
            ? setFilterlists(() => Array.isArray(data.filters)
                ? {
                    ...data.filters.reduce((obj, filter) => ({
                        ...obj,
                        [filter]: [...new Set([
                            `All ${filter}s`,
                            ...data.body.map(rowdata =>
                                rowdata[filter] && Object.keys(rowdata[filter])
                                    .filter(key => key != '_id')
                                    .map(key => rowdata[filter][key]).join(' ')
                            )
                        ].filter(f => !!f))]
                    }), {})
                }
                : {
                    [data.filters]: [...new Set([
                        `All ${data.filters}s`,
                        ...data.body.map(rowdata =>
                            rowdata[data.filters] && Object.keys(rowdata[data.filters])
                                .filter(key => key != '_id')
                                .map(key => rowdata[data.filters][key]).join(' ')
                        )].filter(f => !!f))]
                }
            )
            : setFilterlists(() => { })
    }, [data,])

    useEffect(() => {
        filterlists && setFilters(prev => ({
            ...Object.keys(filterlists).reduce((obj, filter) => ({
                ...obj,
                [filter]: [filterlists[filter][0]]
            }), {})
        }))
    }, [filterlists])
    useEffect(() => {
        setBody(prev => {
            return data?.body
                .filter(rowdata =>
                    Object.keys(rowdata)
                        .filter(key => key !== '_id')
                        .map(key => rowdata[key] &&
                            (typeof rowdata[key] === 'string' || rowdata[key] instanceof String
                                ? rowdata[key]
                                : Object.values(rowdata[key])
                                    .map(subdata =>
                                        typeof subdata === 'string' || subdata instanceof String
                                            ? subdata
                                            : Object.values(subdata).join(''))
                                    .join('')
                            )
                        )
                        .join('')
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .filter(rowdata => !Object.keys(filters)
                    .map(filter => {
                        return !!filters[filter].find(fin => fin.startsWith('All '))
                            ? true
                            : filters[filter].includes(rowdata[filter] && Object.values(rowdata[filter]).join(' '))
                    })
                    .includes(false)
                )
        })
    }, [data, filters, search, sort])
    useEffect(() => {
        !body?.find(rowdata => rowdata._id == detailid) && setDetailid(() => null)
    }, [body])
    return (
        isLoading ? null :
            <div className="px-5 flex flex-row space-x-5">
                <div className="basis-1/4 h-[calc(100vh-130px)] flex flex-col items-center bg-gray-200 rounded-xl divide-y-2 divide-white">
                    <Filter
                        datatype={datatype}
                        search={search}
                        setSearch={setSearch}
                        filterlists={filterlists}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
                <div className="basis-1/2">
                    <table className="w-full rounded-lg overflow-hidden">
                        <thead className='bg-gray-200 max-md:hidden'>
                            <tr>
                                {Object.keys(head)?.map((th, i) =>
                                    <th
                                        key={i}
                                        className="p-2 text-start"
                                    >
                                        <span className='flex flex-row items-center' >
                                            <FaSort className='w-5 h-5 text-sky-200' />
                                            {th}
                                        </span>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='bg-gray-100 divide-y divide-black/10'>
                            {body?.map((rowdata, index) =>
                                <tr
                                    key={index}
                                    onClick={() => setDetailid(prev => rowdata._id)}
                                    onDoubleClick={() => { Navigate(`/${datatype}/${rowdata._id}`) }}
                                    className='max-md:flex max-md:flex-col'
                                >
                                    {Object.values(head)
                                        .map((key, i) =>
                                            <td key={i} className="pl-7 md:py-2">
                                                {rowdata[key] &&
                                                    (typeof rowdata[key] === 'string' || rowdata[key] instanceof String
                                                        ? rowdata[key]
                                                        : Object.values(rowdata[key])
                                                            .map(subdata =>
                                                                typeof subdata === 'string' || subdata instanceof String
                                                                    ? subdata
                                                                    : Object.values(subdata).join(' '))
                                                            .join(' ')
                                                    )
                                                }
                                            </td>
                                        )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={`basis-1/4 h-[calc(100vh-130px)] flex flex-col bg-gray-200 rounded-2xl ${!detailid && 'animate-pulse'}`}>
                    {detailid ? <Detail teac={datatype} detailid={detailid} /> : <Pulse />}
                </div>
            </div >)
}


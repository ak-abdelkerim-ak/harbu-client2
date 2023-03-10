import { Navigate } from "react-router-dom"
import { Pulse } from "../components/Pulse"
import { getJson } from "../hooks/getData"

export function Detail({ teac, detailid }) {
    const { data, error, isLoading } = getJson(teac, detailid)
    return error ? <Navigate to='/login' /> : isLoading ? <Pulse /> :
        <>
            <div className="basis-1/2">
                <img src='../src/data/img.jpg' className="h-full wfull border border-gray-300 rounded-t-2xl" />
            </div>
            <div className="basis-1/2 p-1 space-y-2 bg-gray-300 rounded-b-xl overflow-scroll flex flex-col justify-center">
                {Object.keys(data).map((key, index) =>
                    <p key={index} className="flex bg-gray-200 rounded-xl py-2 divide-x-2 divide-gray-300">
                        <span className="basis-1/4 text-center text-sm">{key}</span>
                        <span className="basis-3/4 pl-2 text-sm">
                            {data[key] && Object.keys(data[key]).filter(key => key !== '_id').map(subkey => `${data[key][subkey]}  `)}
                        </span>
                    </p>
                )}
            </div>
        </>
}
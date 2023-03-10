import { useParams } from "react-router-dom"
import { getJson, getUrl } from "../../hooks/getData"

export default () => {
    const { id } = useParams()
    const { data: teacher, isLoading: isTeacher } = getJson('teacher', id)
    const { data: profile, isLoading: isProfile } = getUrl('teacher', id, 'profile')

    return (
        <div className="flex flex-col md:flex-row md:px-5" >
            {< img src={!isProfile && profile} className="md:w-[40%] max-md:rounded-t-3xl md:rounded-l-3xl" />}
            <div className="w-full bg-gray-300 flex flex-col divide-y divide-black/10 max-md:rounded-b-3xl md:rounded-r-3xl overflow-hidden">
                {isTeacher
                    ? <p>Loading ... </p>
                    : teacher[0]
                        .map((data, index) =>
                            <div className="flex flex-row flex-1 ">
                                <p className="basis-1/3  p-2 pr-5 bg-gray-100 flex items-center">
                                    <span className="flex-1 text-end">{data}</span>
                                </p>
                                <p className="basis-2/3  p-2 pl-5 bg-gray-200 flex items-center">
                                    <span>{teacher[1][index]}</span>
                                </p>
                            </div>
                        )
                }
            </div>
        </div >
    )
}

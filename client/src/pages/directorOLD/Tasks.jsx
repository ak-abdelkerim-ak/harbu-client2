import { useState } from "react"
import DropDown from "../../components/ui/DropDown"
import { getJson } from "../../hooks/getData"

export default () => {
    const section = ['ስB', '10 C', '11 F', '12 G']
    const [sectionfilter, setSectionfilter] = useState(section[0])
    const { data: students, isLoading: isStudent } = getJson('student', "section", sectionfilter)
    console.log(!isStudent ? students : '')
    return (
        <div className="h-screen p-2 md:px-[5%] flex flex-col space-y-2">
            <div className="relative flex flex-row p-2 rounded-xl bg-gray-200">
                <div className="flex-1 flex justify-center  items-center">
                    <span>Section {sectionfilter} students</span>
                </div>
                <div className="flex-1 flex justify-center items-center space-x-2">
                    <DropDown
                        data={section}
                        filter={sectionfilter}
                        setFilter={setSectionfilter}
                    />
                </div>
            </div>
            <table className="w-full rounded-xl overflow-hidden">
                <thead className="bg-gray-200">
                    <tr className="divide-x-2 divide-gray-300">
                        <th className="p-2 text-start">Name</th>
                        <th className="p-2 text-start">Quiz 10%</th>
                        <th className="p-2 text-start">Test 10%</th>
                        <th className="p-2 text-start">Indiviual Assign 10%</th>
                        <th className="p-2 text-start">Group Assign 10%</th>
                        <th className="p-2 text-start">Total 40%</th>
                        <th className="p-2 text-start">Final 60%</th>
                        <th className="p-2 text-start">Total 100%</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y-2 divide-gray-300">
                    {!isStudent && students.map(student => (
                        <tr className="divide-x-2 divide-gray-300 hover:bg-gray-200">
                            {student.map(celldata => (
                                <td className="p-2 text-center">{celldata}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
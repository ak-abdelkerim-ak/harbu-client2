
export default function ({
    datatype,
    search,
    setSearch,
    filterlists,
    filters,
    setFilters,

}) {
    return (<>
        <div className="w-full p-2">
            <p className="flex-1 pl-5 font-semibold">List of {datatype}s</p>
        </div>
        <div className="w-full p-2">
            <input
                type="search"
                value={search}
                placeholder='Search'
                onChange={(e) => setSearch(() => e.target.value)}
                className='w-full py-1 px-4 border-none focus:ring-0 bg-white rounded-2xl'
            />
        </div>
        {filterlists &&
            <div className={`w-full h-full ${Object.keys(filterlists).length > 1 ? 'grid grid-flow-row gap-1 grid-cols-2' : 'space-y-2'}  p-1`}>
                {Object.keys(filterlists)
                    .map((filterlistskey, filterlistskeyindex) =>
                        <div key={filterlistskeyindex} className="w-full py-2 px-[5%] flex flex-col items-center space-y-2 bg-gray-100 rounded-xl">
                            {filterlists[filterlistskey]
                                .map((filterlist, filterlistindex) =>
                                    <button
                                        key={filterlistindex}
                                        onClick={() => setFilters(() =>
                                            filters
                                                ? {
                                                    ...filters,
                                                    [filterlistskey]:
                                                        !filters[filterlistskey]
                                                            || filters[filterlistskey].find(filter => filter.startsWith('All '))
                                                            || filterlist.startsWith('All ')
                                                            ? [filterlist]
                                                            : filters[filterlistskey].find(filter => filter == filterlist)
                                                                ? filters[filterlistskey].length > 1
                                                                    ? [...filters[filterlistskey].filter(filter => filter != filterlist)]
                                                                    : [`All ${filterlistskey}s`]
                                                                : [...filters[filterlistskey], filterlist]

                                                }
                                                : { [filterlistskey]: [filterlist] }

                                        )}
                                        className={`w-full p-2 bg-gray-200 rounded-xl text-gray-00 ${filters[filterlistskey] && filters[filterlistskey].includes(filterlist) && 'bg-green-200 text-green-500'}`}
                                    >
                                        {filterlist}
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        }
    </>)
}
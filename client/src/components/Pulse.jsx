export function Pulse() {
    return <>
        <div className="m-auto w-52 h-52 rounded-full bg-slate-100"></div>
        <div className=" basis-1/2 m-2 p-2 space-y-5 bg-gray-300 rounded-xl">
            <div className="h-10 bg-slate-200 rounded-xl"></div>
            <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-slate-200 rounded-xl col-span-2"></div>
                <div className="h-10 bg-slate-200 rounded-xl col-span-1"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded-xl"></div>
            <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-slate-200 rounded-xl col-span-1"></div>
                <div className="h-10 bg-slate-200 rounded-xl col-span-2"></div>
            </div>
        </div>
    </>
}
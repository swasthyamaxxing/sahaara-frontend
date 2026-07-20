const PatientCard = () => {
    return(
        <>
            <div className="bg-[#FFFFFF40] border rounded-2xl p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <div className="w-16 h-16 border-2 rounded-2xl bg-brand-red"></div>
                    <div>
                        <h2 className="font-bold text-lg text-brand-red">Anand Chaudhary</h2>
                        <p className="text-sm text-[#554240]">Age: 45</p>
                    </div>
                    <div className="min-w-15 h-6 rounded-full bg-[#FFF9D7] border px-3 text-center font-bold text-[#065F46] flex items-center justify-center">Stable</div>
                </div>
                <div>
                    <div className="flex items-center border-b py-5 justify-between">
                        <span className="text-[#554240]">Last Vitals Checked</span>
                        <span className="font-bold text-[#1F1B16]">2 days ago</span>
                    </div>
                    <div className="flex items-center py-5 justify-between">
                        <span className="text-[#554240]">Next Medication</span>
                        <span className="font-bold text-[#641E21]">8 PM</span>
                    </div>
                </div>
                <button className="bg-[#e1cdaa] text-brand-red w-full font-bold text-xl py-2 px-4 rounded-full hover:cursor-pointer mt-4">
                    View Details
                </button>
            </div>
        </>
    )
}

export default PatientCard;
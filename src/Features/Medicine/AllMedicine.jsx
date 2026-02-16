import React, { useEffect, useState } from 'react'
import useMedicineStore from '../../Store/Medicine.store';
import Header from '../../Components/Header';
import useUIStore from '../../Store/UI.store';
import Loader from '../../Components/Loader';
import useFamilyStore from '../../Store/FamilyMembers.store';


const AllMedicine = () => {
    const allMedicines = useMedicineStore(state => state.AllMedicines);
    const activeMedicines = allMedicines.filter(
        (medicine) => medicine.status === 'active'
    )
    const members = useFamilyStore(state => state.members);
    const fetchMedicineById = useMedicineStore(state => state.fetchMedicinesByMember);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const fetchMembers = useFamilyStore(state => state.fetchMember);
    const isLoading = useUIStore(state => state.isLoading);
    // console.log(activeMedicines);

    const [selectedMemberId, setSelectedMemberId] = useState('all');

    const handleFilter = async (memberId) => {
        await fetchMedicineById(memberId);
        setSelectedMemberId(memberId);
    }

    const handleDefaultFilter = async () => {
        await fetchAllMedicines();
        setSelectedMemberId('all');
    }

    useEffect(() => {
        fetchAllMedicines();
        fetchMembers();
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 px-4 sm:px-6 md:px-8 py-6">
            <Header />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="max-w-6xl mx-auto mt-6 bg-white rounded-2xl shadow p-4 sm:p-6 text-black">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-6">

                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            Active Medicines
                        </h2>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 overflow-x-auto pb-2">

                            {/* All Button */}
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                ${selectedMemberId === "all"
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                    }`}
                                onClick={handleDefaultFilter}
                            >
                                All
                            </button>

                            {members.map((member) => (
                                <button
                                    key={member._id}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                  ${selectedMemberId === member._id
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                        }`}
                                    onClick={() => handleFilter(member._id)}
                                >
                                    {member.name}
                                </button>
                            ))}

                        </div>
                    </div>

                    {/* Empty State */}
                    {activeMedicines.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            No active medicines found.
                        </div>
                    ) : (
                        <div className="space-y-4">

                            {activeMedicines.map((medicine) => (
                                <div
                                    key={medicine._id}
                                    className="
                  flex flex-col sm:flex-row 
                  sm:justify-between sm:items-center 
                  gap-4 
                  p-4 
                  rounded-xl 
                  border 
                  hover:bg-blue-50 
                  transition
                "
                                >
                                    {/* Medicine Info */}
                                    <div>

                                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                            {medicine.status}
                                        </span>

                                        <p className="font-semibold mt-2">
                                            {medicine.medicineName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {medicine.remainingStock} {medicine.doseUnit} left
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            )}
        </div>
    );

}

function filterMedicinesByMember(medicines, memberId) {
    return medicines.filter((medicine) =>
        medicine.memberId === memberId
    );
}



export default AllMedicine

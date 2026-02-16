import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegCircleStop } from "react-icons/fa6";
import useMedicineStore from "../../Store/Medicine.store";
import { axiosInstance } from "../../utilities/axiosInstance";
import useUIStore from "../../Store/UI.store";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const MedicineList = ({ setSelectedMedicine, setShowEditMedicine }) => {
    const medicines = useMedicineStore(state => state.medicines);
    const fetchMedicines = useMedicineStore(state => state.fetchMedicines);
    const setShowAddMedicine = useMedicineStore(state => state.setShowAddMedicine);
    const MedicineTaker = useMedicineStore(state => state.memberNameForMedicine);
    const memberId = useMedicineStore(state => state.memberIdForMedicine);
    const fetchAllMedicine = useMedicineStore(state => state.fetchAllMedicines);


    const isLoading = useUIStore(state => state.isLoading);
    const setIsLoading = useUIStore(state => state.setIsLoading);


    const handledeleteMedicine = async (deleteMedicineId) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.delete(`/medicines/delete-medicine/${deleteMedicineId}`);
            toast.success(response.data.message || "deleted successfully");
            await fetchMedicines(memberId);
            await fetchAllMedicine();
        } catch (error) {
            toast.error("try again");
        } finally {
            setIsLoading(false);
        }
    }

    const handleEditMedicine = (editableMember) => {
        setSelectedMedicine(editableMember);
        setShowEditMedicine(true);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 text-black">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Medicines
                    </h2>
                    {MedicineTaker && (
                        <p className="text-sm text-gray-500">
                            For: <span className="font-medium">{MedicineTaker}</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={() => setShowAddMedicine(true)}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                    + Add Medicine
                </button>
            </div>

            {/* Empty State */}
            {medicines.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No medicines added yet.
                </div>
            ) : (
                <div className="space-y-4">

                    {medicines.map((medicine) => (
                        <div
                            key={medicine._id}
                            className="
              flex flex-col lg:flex-row 
              lg:justify-between lg:items-center 
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

                                {/* Status Badge */}
                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium ${medicine.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {medicine.status}
                                </span>

                                <p className="font-semibold mt-2">
                                    {medicine.medicineName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {medicine.remainingStock} {medicine.doseUnit} left
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">

                                <button
                                    className="
                  flex items-center gap-1
                  px-3 py-2 text-sm
                  rounded-full 
                  bg-yellow-400 hover:bg-yellow-500 
                  text-white transition
                "
                                    onClick={() => handleEditMedicine(medicine)}
                                >
                                    <FaEdit /> Edit
                                </button>

                                <button
                                    className="
                  flex items-center gap-1
                  px-3 py-2 text-sm
                  rounded-full 
                  bg-red-500 hover:bg-red-600 
                  text-white transition
                "
                                    onClick={() => handledeleteMedicine(medicine._id)}
                                >
                                    <MdDeleteSweep /> Delete
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}


export default MedicineList

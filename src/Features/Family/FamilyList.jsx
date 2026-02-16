import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import useFamilyStore from "../../Store/FamilyMembers.store";
import { axiosInstance } from "../../utilities/axiosInstance";
import { BsCapsule } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useUIStore from "../../Store/UI.store";
import Loader from "../../Components/Loader";
import useMedicineStore from "../../Store/Medicine.store";
import { toast } from "react-toastify";

const FamilyList = ({ setMember, setShowEditMember }) => {

    const setShowAddMember = useFamilyStore(state => state.setShowAddMember);
    const fetchMember = useFamilyStore(state => state.fetchMember);
    const members = useFamilyStore(state => state.members);
    const setMemberId = useFamilyStore(state => state.setMemberId);
    const setMemberName = useFamilyStore(state => state.setMemberName);

    const setMemberIdForMedicine = useMedicineStore(state => state.setMemberIdForMedicine);
    const setMemberNameForMedicine = useMedicineStore(state => state.setMemberNameForMedicine);

    const isLoading = useUIStore(state => state.isLoading);
    const setIsLoading = useUIStore(state => state.setIsLoading);

    const navigate = useNavigate();

    const handledeleteMember = async (deleteMemberId) => {
        try {
            const response = await axiosInstance.delete(`/family-members/delete-member/${deleteMemberId}`);
            setIsLoading(true);
            await fetchMember();
            toast.success(response.data.message || "Member deleted successfully");
        } catch (error) {
            toast.error("try again");
        } finally {
            setIsLoading(false);
        }
    }

    const handleEditMember = (editableMember) => {
        setMember(editableMember);
        setShowEditMember(true);
    }

    const handleMedicines = (memberId, memberName) => {
        setMemberId(memberId);
        setMemberIdForMedicine(memberId);
        setMemberNameForMedicine(memberName);
        // console.log("familyList",memberId);
        setMemberName(memberName);
        navigate('/medicines');
    }

    return isLoading ? (
        <Loader />
    ) : (
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 text-black">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Family Members
                </h2>

                <button
                    onClick={() => setShowAddMember(true)}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                    + Add Member
                </button>
            </div>

            {/* Empty State */}
            {members.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No family members added yet.
                </div>
            ) : (
                <div className="space-y-4">

                    {members.map((member) => (
                        <div
                            key={member._id}
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
                            {/* Member Info */}
                            <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm">{member.relation}</p>
                                <p className="text-sm text-gray-500">
                                    Age: {member.age}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">

                                <button
                                    className="
                  flex items-center gap-1
                  px-3 py-2 text-sm
                  rounded-full 
                  bg-green-500 hover:bg-green-600 
                  text-white transition
                "
                                    onClick={() =>
                                        handleMedicines(member._id, member.name)
                                    }
                                >
                                    <BsCapsule /> Medicines
                                </button>

                                <button
                                    className="
                  flex items-center gap-1
                  px-3 py-2 text-sm
                  rounded-full 
                  bg-yellow-400 hover:bg-yellow-500 
                  text-white transition
                "
                                    onClick={() => handleEditMember(member)}
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
                                    onClick={() =>
                                        handledeleteMember(member._id)
                                    }
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
};

export default FamilyList;

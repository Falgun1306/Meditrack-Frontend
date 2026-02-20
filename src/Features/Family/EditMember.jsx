import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance";
import useFamilyStore from "../../Store/FamilyMembers.store";
import { toast } from "react-toastify";

const EditMember = ({ member, setshowEditMember }) => {
    const [memberData, setMemberData] = useState({
        name: member?.name || "",
        relation: member?.relation || "self",
        age: member?.age || "",
    });

    const [loading, setLoading] = useState(false);

    const fetchMember = useFamilyStore((state) => state.fetchMember);

    const handleInputChange = (e) => {
        setMemberData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axiosInstance.patch(
                `/family-members/update-member/${member._id}`,
                {
                    name: memberData.name.trim(),
                    relation: memberData.relation,
                    age: Number(memberData.age),
                }
            );

            setshowEditMember(false);
            await fetchMember();
            toast.success(
                response.data.message || "Member Updated Successfully"
            );
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Check Member Details"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div
                className="
        relative 
        w-full 
        max-w-md 
        bg-white 
        rounded-3xl 
        shadow-2xl 
        p-8 
        animate-[fadeIn_0.2s_ease-in-out]
      "
            >
                {/* Close Button */}
                <button
                    onClick={() => setshowEditMember(false)}
                    className="
          absolute top-4 right-4
          text-gray-400 hover:text-gray-700
          text-xl transition
        "
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                    Update Family Member
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">

                    {/* Name */}
                    <p className="text-sm opacity-[0.5]">Update Member Name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={memberData.name}
                        onChange={handleInputChange}
                        className="
            w-full px-5 py-3 
            rounded-xl 
            border border-gray-300 
            focus:outline-none 
            focus:ring-2 focus:ring-blue-500
            transition
          "
                    />

                    {/* Relation */}
                    <p className="text-sm opacity-[0.5]">Relation</p>
                    <select
                        name="relation"
                        value={memberData.relation}
                        onChange={handleInputChange}
                        className="
            w-full px-5 py-3 
            rounded-xl 
            border border-gray-300 
            focus:outline-none 
            focus:ring-2 focus:ring-blue-500
            transition
          "
                    >
                        <option value="self">Self</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                    </select>

                    {/* Age */}
                    <p className="text-sm opacity-[0.5]">Update Member Age</p>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={memberData.age}
                        onChange={handleInputChange}
                        className="
            w-full px-5 py-3 
            rounded-xl 
            border border-gray-300 
            focus:outline-none 
            focus:ring-2 focus:ring-blue-500
            transition
          "
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
            w-full py-3 
            rounded-xl 
            bg-linear-to-r from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800
            text-white font-semibold 
            transition duration-200
            disabled:opacity-60
          "
                    >
                        {loading ? "Updating..." : "Update Member"}
                    </button>

                </form>
            </div>
        </div>
    );

};

export default EditMember;

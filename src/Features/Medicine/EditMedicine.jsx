import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance";
import useMedicineStore from "../../Store/Medicine.store";
import { toast } from "react-toastify";

const EditMedicine = ({ selectedMedicine, setshowEditMedicine }) => {
  const memberId = useMedicineStore(
    (state) => state.memberIdForMedicine
  );
  const memberName = useMedicineStore(
    (state) => state.memberNameForMedicine
  );
  const fetchMedicines = useMedicineStore(
    (state) => state.fetchMedicines
  );

  const [loading, setLoading] = useState(false);

  const [medicineData, setMedicineData] = useState({
    familyMemberId: memberId,
    memberName: memberName,
    medicineName: selectedMedicine?.medicineName || "",
    dosePerDay: selectedMedicine?.dosePerDay || "",
    doseUnit: selectedMedicine?.doseUnit || "",
    totalQuantity: selectedMedicine?.totalQuantity || "",
    alertBeforeDays: selectedMedicine?.alertBeforeDays || "",
  });

  const handleInputChange = (e) => {
    setMedicineData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.patch(
        `/medicines/update-medicine/${selectedMedicine._id}`,
        medicineData
      );

      setshowEditMedicine(false);
      await fetchMedicines(memberId);
      toast.success(
        response.data.message ||
          "Medicine Updated Successfully"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Check Medicine Details"
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
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setshowEditMedicine(false)}
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
          Update Medicine
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">

          {/* Medicine Name */}
          <input
            type="text"
            name="medicineName"
            placeholder="Medicine Name"
            value={medicineData.medicineName}
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

          {/* Dose Per Day */}
          <input
            type="number"
            name="dosePerDay"
            placeholder="Dose Per Day"
            value={medicineData.dosePerDay}
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

          {/* Dose Unit */}
          <select
            name="doseUnit"
            value={medicineData.doseUnit}
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
            <option value="">Select Dose Unit</option>
            <option value="mg">mg</option>
            <option value="ml">ml</option>
            <option value="tablet">tablet</option>
          </select>

          {/* Total Quantity */}
          <input
            type="number"
            name="totalQuantity"
            placeholder="Total Quantity"
            value={medicineData.totalQuantity}
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

          {/* Alert Before Days */}
          <input
            type="number"
            name="alertBeforeDays"
            placeholder="Alert Before (Days)"
            value={medicineData.alertBeforeDays}
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

          {/* Submit Button */}
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
            {loading ? "Updating..." : "Update Medicine"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditMedicine;

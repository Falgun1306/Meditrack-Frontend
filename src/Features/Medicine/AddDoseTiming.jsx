import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance.js";
import { toast } from "react-toastify";

const AddDoseTiming = ({ selectedMedicine ,onClose }) => {
  console.log(selectedMedicine);
  
  
  const dosePerDay = selectedMedicine.NumberOfDose;
  const medicineId = selectedMedicine._id;
  const [timings, setTimings] = useState(Array(dosePerDay).fill({ hour: "", minute: "", period: "" }));
  const [loading, setLoading] = useState(false);

  const handleTimingChange = (index, field, value) => {
    const newTimings = [...timings];
    newTimings[index] = { ...newTimings[index], [field]: value };
    setTimings(newTimings);
  };

  const handleAddTimings = async (e) => {
    e.preventDefault();

    // Convert to 24-hour format and validate
    const validTimings = timings.map(timing => {
      if (!timing.hour || !timing.minute || !timing.period) return null;
      
      let hour24 = parseInt(timing.hour);
      if (timing.period === 'PM' && hour24 !== 12) hour24 += 12;
      if (timing.period === 'AM' && hour24 === 12) hour24 = 0;
      
      const minute = timing.minute.padStart(2, '0');
      return `${hour24.toString().padStart(2, '0')}:${minute}`;
    }).filter(time => time !== null);

    if (validTimings.length === 0) {
      toast.error("Please enter at least one complete timing");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.patch(
        `/medicines/update-medicine/${medicineId}`,
        { doseTimings: validTimings }
      );

      toast.success("Dose timings added successfully");
      onClose(); // Close the modal or go back
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add timings"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={()=>onClose(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Set Dose Timings
        </h2>

        <form onSubmit={handleAddTimings} className="space-y-4">
          {Array.from({ length: dosePerDay }, (_, index) => (
            <div key={index} className="space-y-2">
              <p className="text-sm opacity-[0.5]">Dose {index + 1} Time</p>
              <div className="flex space-x-2">
                <select
                  value={timings[index].hour}
                  onChange={(e) => handleTimingChange(index, 'hour', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Hour</option>
                  {Array.from({ length: 12 }, (_, h) => (
                    <option key={h + 1} value={h + 1}>{h + 1}</option>
                  ))}
                </select>
                <select
                  value={timings[index].minute}
                  onChange={(e) => handleTimingChange(index, 'minute', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Minute</option>
                  {Array.from({ length: 60 }, (_, m) => (
                    <option key={m} value={m.toString().padStart(2, '0')}>{m.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  value={timings[index].period}
                  onChange={(e) => handleTimingChange(index, 'period', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition duration-200 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Timings"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoseTiming;
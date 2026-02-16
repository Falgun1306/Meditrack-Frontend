import React from 'react'
import { useNavigate } from 'react-router-dom'
import useMedicineStore from '../Store/Medicine.store.js';

const Medicine_overview = () => {
    const navigate = useNavigate();
    const allMedicines = useMedicineStore(state=>state.AllMedicines);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const activeMedicines = allMedicines.filter(
        (medicine) => medicine.status === 'active'
    )
    
    
    const handleMedicineOverView = ()=>{
        fetchAllMedicines();
        navigate('/all-medicines');
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Active Medicines</h2>
            <p className="text-gray-500 mb-6">
                Medicines currently in use
            </p>

            <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-green-600">{activeMedicines.length}</span>
                <button 
                  className="text-blue-600 font-medium"
                  onClick={handleMedicineOverView}
                >
                    View all →
                </button>
            </div>
        </div>
    )
}

export default Medicine_overview

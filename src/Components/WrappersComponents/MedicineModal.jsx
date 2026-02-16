import React from 'react'
import useFamilyStore from '../../Store/FamilyMembers.store'
import useMedicineStore from '../../Store/Medicine.store'

const MedicineModal = ({children}) => {
    const setShowAddMedicine = useMedicineStore(state=>state.setShowAddMedicine)
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative">
                {/* Close button */}
                <button
                    onClick={() => setShowAddMedicine(false)}
                    className="absolute -top-65 -right-58 bg-white text-black rounded-full px-3 py-1 shadow z-51"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    )
}

export default MedicineModal

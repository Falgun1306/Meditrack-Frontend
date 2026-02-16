import { useNavigate } from 'react-router-dom'
import useFamilyStore from '../Store/FamilyMembers.store.js';

const Family_overview = () => {
    const navigate = useNavigate();
    const members = useFamilyStore(state=>state.members);
    
    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Family Members</h2>
            <p className="text-gray-500 mb-6">
                Manage people taking medicines
            </p>

            <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-blue-600">{members.length}</span>
                <button 
                   className="text-blue-600 font-medium"
                   onClick={()=>navigate('/family')}
                >
                    View all →
                </button>
            </div>
        </div>
    )
}

export default Family_overview

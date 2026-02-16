import React from 'react'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '../Store/Notification.store';

const Notification_overview = () => {
    const navigate = useNavigate();
    const fetchAllNotifications = useNotificationStore(state=>state.fetchAllNotifications);
    const notifications = useNotificationStore(state=>state.notifications);

    const handleViewNotification = ()=>{
        fetchAllNotifications();
        navigate('/all-notifications');
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Notifications List</h2>
            <p className="text-gray-500 mb-6">
                See Notifocations
            </p>

            <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-green-600">{notifications.length}</span>
                <button 
                  className="text-blue-600 font-medium"
                  onClick={handleViewNotification}
                >
                    View all →
                </button>
            </div>
        </div>
    )
}

export default Notification_overview

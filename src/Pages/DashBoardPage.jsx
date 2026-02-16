import Family_overview from "../Components/Family_overview";
import TodayMedicineCard from "../Components/TodayMedicineCard";
import Medicine_overview from "../Components/Medicine_overview";
import Header from "../Components/Header";
import useFamilyStore from "../Store/FamilyMembers.store";
import { useEffect } from "react";
import Notification_overview from "../Components/Notification_overview";

const DashboardPage = () => {
  const members = useFamilyStore((state) => state.members);
  const fetchMember = useFamilyStore((state) => state.fetchMember);

  useEffect(() => {
    if (members.length === 0) {
      fetchMember();
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 px-4 sm:px-6 md:px-8 py-6 select-none text-black">

      {/* Header */}
      <Header />

      {/* Overview Section */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6 
        mt-6
      ">
        <Family_overview />
        <Medicine_overview />
        <Notification_overview />
      </div>

      {/* Medicine List Preview */}
      <div className="mt-8">
        <TodayMedicineCard />
      </div>

    </div>
  );
};

export default DashboardPage;

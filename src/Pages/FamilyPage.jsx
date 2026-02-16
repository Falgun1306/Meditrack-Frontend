import AddMember from "../Features/Family/AddMember";
import FamilyList from "../Features/Family/FamilyList";
import Modal from "../Components/WrappersComponents/Modal";
import useFamilyStore from "../Store/FamilyMembers.store";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import EditMember from "../Features/Family/EditMember";

const FamilyPage = () => {
  const showAddMember = useFamilyStore((state) => state.showAddMember);
  const fetchMember = useFamilyStore((state) => state.fetchMember);

  const [member, setMember] = useState(null);
  const [showEditMember, setShowEditMember] = useState(false);

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 px-4 sm:px-6 md:px-8 py-6">

      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="max-w-6xl mx-auto mt-6">
        <FamilyList
          setMember={setMember}
          setShowEditMember={setShowEditMember}
        />
      </div>

      {/* Add Member Modal */}
      {showAddMember && !showEditMember && (
        <Modal>
          <AddMember />
        </Modal>
      )}

      {/* Edit Member Modal */}
      {showEditMember && !showAddMember && (
        <EditMember
          member={member}
          setshowEditMember={setShowEditMember}
        />
      )}
    </div>
  );
};

export default FamilyPage;

import useFamilyStore from "../../Store/FamilyMembers.store";

const Modal = ({ children }) => {
  const {setShowAddMember} = useFamilyStore();
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={()=>setShowAddMember(false)}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full px-3 py-1 shadow"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

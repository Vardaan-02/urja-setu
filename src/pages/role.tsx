import { useState } from "react";
import { useHistory } from "react-router-dom"; 
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase"; 


const RoleSelectionPage = ({ user }: { user: User }) => {
  const [selectedRole, setSelectedRole] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        role: selectedRole,
        updatedAt: new Date().toISOString(),
      });

      console.log("Role updated successfully:", selectedRole);
      history.push(`/dashboard/${selectedRole}`);
    } catch (error : any) {
      console.error("Error updating role:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-selection-container">
      <h2>Choose Your Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="role">Select Role: </label>
          <select
            id="role"
            value={selectedRole}
            onChange={handleRoleChange}
            required
          >
            <option value="">Select a role</option>
            <option value="User">User</option>
            <option value="Organization">Organization</option>
            <option value="DeliveryPerson">Delivery Person</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Role"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleSelectionPage;

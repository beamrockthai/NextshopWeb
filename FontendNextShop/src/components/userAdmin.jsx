import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllUsers, deleteUser } from "../api/userapi";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        alert("ลบไม่สำเร็จ กรุณาลองใหม่");
      }
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500">
            View and manage all registered users
          </p>
        </div>

        {/* Search */}
        <div className="form-control w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search users"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow border">
        <table className="table table-zebra w-full min-w-[800px]">
          <thead className="bg-base-200">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Role</th>
              <th>Password</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users
                .filter((user) => user.role?.toLowerCase() !== "admin")
                .map((user) => {
                  const fullName = `${user.firstName || ""} ${
                    user.lastName || ""
                  }`.trim();
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                fullName || "User"
                              )}`}
                              alt="avatar"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        {fullName || user.name || "-"}
                      </td>
                      <td>
                        <div className="badge badge-info capitalize">
                          {user.role || "N/A"}
                        </div>
                      </td>
                      <td className="text-xs break-all max-w-[200px] text-gray-500">
                        {user.password || "-"}
                      </td>
                      <td className="whitespace-nowrap">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserAdmin;

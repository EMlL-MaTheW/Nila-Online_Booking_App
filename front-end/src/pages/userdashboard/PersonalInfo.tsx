import { useEffect, useState } from "react";
import API from "../../services/api";

const PersonalInfo = () => {

  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(true);

  // FETCH PROFILE
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get("/profile/");

      setProfile(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  // SAVE PROFILE
  const saveProfile = async () => {

    try {

      await API.put("/profile/", {
        mobile: profile.mobile,
      });

      setEdit(false);

      alert("Profile updated successfully");

    } catch (err) {

      console.error(err);

      alert("Failed to update profile");

    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <h3 className="text-xl font-semibold mb-4">
        Personal Information
      </h3>

      <div className="bg-white rounded-xl p-4 shadow space-y-4">
        {/* Username */}
        <div>
          <label className="text-sm text-gray-500">
            Username
          </label>

          <input
            disabled
            className="w-full bg-gray-200 rounded-lg p-2"
            value={profile.username}
          />
        </div>
        {/* Email */}
        <div>
          <label className="text-sm text-gray-500">
            Email
          </label>

          <input
            disabled
            className="w-full bg-gray-200 rounded-lg p-2"
            value={profile.email}
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-gray-500">
            Mobile Number
          </label>

          <input
            disabled={!edit}
            className={`w-full rounded-lg p-2 ${
              edit
                ? "bg-white border"
                : "bg-gray-200"
            }`}
            value={profile.mobile || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                mobile: e.target.value,
              })
            }
          />
        </div>

        {/* BUTTON */}
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={saveProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        )}

      </div>
    </div>
  );
};

export default PersonalInfo;

// import React, { useState } from "react";
// import API from "../../services/api"

// const PersonalInfo = () => {
//   const [edit, setEdit] = useState(false);

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
//       <div className="bg-white rounded-xl p-4 shadow space-y-3">
//         <input
//           disabled={!edit}
//           className="w-full bg-gray-200 rounded-lg p-2"
//           defaultValue="John Doe"
//         />
//         <input
//           disabled={!edit}
//           className="w-full bg-gray-200 rounded-lg p-2"
//           defaultValue="+91 9999999999"
//         />
//         <button
//           onClick={() => setEdit(!edit)}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg"
//         >
//           {edit ? "Save" : "Edit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;
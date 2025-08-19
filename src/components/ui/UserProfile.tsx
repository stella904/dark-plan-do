import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const defaultIcon = "https://www.svgrepo.com/show/382106/user-default.svg"; // Replace with your default icon URL

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={user?.photoURL || defaultIcon}
        alt="User"
        style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 8 }}
      />
      <span>
        {user ? user.displayName : "Guest"}
      </span>
    </div>
  );
}

export default UserProfile;
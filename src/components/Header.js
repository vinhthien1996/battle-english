import { getAuth, signOut } from "firebase/auth";
import React from "react";
import {
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { app } from "../firebase";

const Header = () => {
  const auth = getAuth(app);

  const onSignOut = () => {
    signOut(auth);
  };

  return (
    <header>
      <nav class="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <div>{auth.currentUser.displayName}</div>
          </div>
          <div class="flex items-center lg:order-2 cursor-pointer">
            <span>Sign out</span>
            <ArrowRightStartOnRectangleIcon
              onClick={onSignOut}
              className="pl-1 size-6"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

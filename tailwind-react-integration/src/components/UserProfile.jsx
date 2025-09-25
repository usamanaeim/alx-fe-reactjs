// src/components/UserProfile.jsx
import React from 'react';

function UserProfile() {
  return (
    <div
      className="
        user-profile
        bg-gray-100
        sm:p-4 md:p-8
        max-w-xs md:max-w-sm
        mx-auto my-12 md:my-20
        rounded-lg
        shadow-lg
        hover:shadow-xl
        transition-shadow duration-300 ease-in-out
      "
      aria-label="User profile card"
    >
      <img
        src="https://via.placeholder.com/150"
        alt="User avatar"
        className="
          rounded-full
          sm:w-24 sm:h-24
          md:w-36 md:h-36
          mx-auto
          transform
          transition-transform duration-300 ease-in-out
          hover:scale-110
        "
        aria-hidden="false"
      />

      <h1
        tabIndex="0"
        className="
          text-lg md:text-xl
          text-blue-800
          my-4
          text-center
          hover:text-blue-500
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-200
          cursor-pointer
        "
      >
        Osama Naeim
      </h1>

      <p className="text-sm md:text-base text-gray-600 text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;

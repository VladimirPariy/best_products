import React, { FC } from "react";

const Shape: FC = () => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 20H4V8H0V20ZM22 9C22 7.9 21.1 7 20 7H13.7L14.7 2.4V2.1C14.7 1.7 14.5 1.3 14.3 1L13.2 0L6.6 6.6C6.2 6.9 6 7.4 6 8V18C6 19.1 6.9 20 8 20H17C17.8 20 18.5 19.5 18.8 18.8L21.8 11.7C21.9 11.5 21.9 11.2 21.9 11V9H22C22 9.1 22 9 22 9Z"
        fill="#52FF00"
      />
    </svg>
  );
};

export default Shape;

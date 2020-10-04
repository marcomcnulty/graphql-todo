import React from "react";

const ListHeader = () => {
  return (
    <div className="p-10">
      <h1 className="font-mono text-4xl text-gray-800">
        GraphQL Checklist{" "}
        <span role="img" aria-label="Checkmark">
          📖 ✅
        </span>
      </h1>
    </div>
  );
};

export default ListHeader;

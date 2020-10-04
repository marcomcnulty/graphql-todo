import React, { Fragment } from "react";

export const Warning = ({ showWarning, setShowWarning, handleDeleteTodo }) => {
  return (
    <Fragment>
      {showWarning ? (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mt-2"
          role="alert"
        >
          <p className="font-bold">Delete Todo?</p>

          <div className="flex justify-center items-center">
              <p className="mr-2">Are you sure you didn't mean to mark it off as done?</p>
              <button
                className="border-2 border-orange-400 pt-3/4 pb-3/4 pl-1 pr-1 ml-1 rounded"
                onClick={() => setShowWarning(false)}>Cancel</button>
              <button
                className="border-2 border-orange-400 pt-3/4 pb-3/4 pl-1 pr-1 ml-1 rounded"
                onClick={() => handleDeleteTodo()}>Continue</button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

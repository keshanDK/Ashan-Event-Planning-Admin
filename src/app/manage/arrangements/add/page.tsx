"use client";

import AddArrangementForm from "./components/add-arrangement-form/add-arrangement-form";

function AddArrangementPage() {
  return (
    <div>
      <h2 className="p-2">
        Add Arrangement
      </h2>
      <div className="p-4">
        <AddArrangementForm />
      </div>
    </div>
  );
}

export default AddArrangementPage;

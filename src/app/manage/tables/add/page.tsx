"use client";

import AddTableForm from "./components/add-table-form/add-table-form";

function AddTablePage() {
  return (
    <div>
      <h2 className="p-2">
        Add Table
      </h2>
      <div className="p-4">
        <AddTableForm />
      </div>
    </div>
  );
}

export default AddTablePage;

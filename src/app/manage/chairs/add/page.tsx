"use client";

import AddChairForm from "./components/add-chair-form/add-chair-form";

function AddChairPage() {
  return (
    <div>
      <h2 className="p-2">
        Add Chair
      </h2>
      <div className="p-4">
        <AddChairForm />
      </div>
    </div>
  );
}

export default AddChairPage;

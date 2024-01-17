import React, { useState } from 'react';
import { FaStarOfLife } from "react-icons/fa";

const categoriesData = [
  { name: 'Masters', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'Inbound', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'Outbound', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'PartStudy', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'sales', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'Tickets', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'Expences', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'Lifecycle management', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  { name: 'Reports', permissions: ['Read', 'Write', 'Update', 'Delete'] },
  // Add other categories as needed
];

const AccessRights = () => {
  const [formData, setFormData] = useState({});

  const handleCheckboxChange = (category, permission) => {
    setFormData((prevData) => {
      const categoryData = prevData[category] || {};
      let updatedData;

      if (permission === 'All') {
        const allChecked = !categoryData.All;

        updatedData = {
          ...prevData,
          [category]: {
            ...categoryData,
            All: allChecked,
            Read: allChecked,
            Write: allChecked,
            Update: allChecked,
            Delete: allChecked,
          },
        };
      } else {
        updatedData = {
          ...prevData,
          [category]: {
            ...categoryData,
            [permission]: !categoryData[permission],
          },
        };
      }

      return updatedData;
    });
  };

  const getSelectedData = () => {
    const selectedData = [];

    for (const category in formData) {
      const categoryData = formData[category];
      const permissions = [];

      for (const permission in categoryData) {
        if (permission !== 'All' && categoryData[permission]) {
          permissions.push(permission);
        }
      }

      if (categoryData.All || permissions.length > 0) {
        selectedData.push({
          category,
          permissions: categoryData.All ? ['All'] : permissions,
        });
      }
    }

    return selectedData;
  };

  const handleSave = () => {
    const selectedData = getSelectedData();
    console.log('Selected Data:', selectedData);
    // You can use selectedData as needed (e.g., send it to an API, update state, etc.)
  };

  return (
    <div>

<div className="col-lg-2 col-md-2">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
             Roles
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <select
            name="Select Item"
            style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
            className="input mb-4 input-bordered ps-2"
          >
            <option value="">Admin</option>
            <option value="">Manager</option>
            <option value="">Supervisor</option>
          </select>
        </div>
      <br></br>
      {categoriesData.map((category) => (
        <div key={category.name} className="row mb-3">
          <div className="col-lg-2 col-md-2 col-sm-2">
            <div className="d-flex flex-column align-items-start">
              <label
                className="label label-text label-font-size text-base-content"
                htmlFor={category.name}
              >
                {category.name}
              </label>
              <input
                style={{ marginTop: 10 }}
                className="form-check-input me-1"
                type="checkbox"
                id={category.name}
                checked={formData[category.name]?.All}
                onChange={() => handleCheckboxChange(category.name, 'All')}
              />
            </div>
          </div>
          {category.permissions.map((permission) => (
            <div key={permission} className="col-lg-2 col-md-2 col-sm-2">
              <div className="d-flex flex-column align-items-start">
                <label
                  className="label label-text label-font-size text-base-content"
                  htmlFor={`${category.name}-${permission}`}
                >
                  {permission}
                </label>
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  type="checkbox"
                  id={`${category.name}-${permission}`}
                  checked={formData[category.name]?.[permission]}
                  onChange={() => handleCheckboxChange(category.name, permission)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="d-flex flex-row mt-1">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          </div>
    </div>
  );
};

export default AccessRights;

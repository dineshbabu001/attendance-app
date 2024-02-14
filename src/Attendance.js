import React, { useState } from "react";
import studentsData from "./studentsData";
import "./Attendance.css";

const Attendance = () => {
  const [attendance, setAttendance] = useState(studentsData);
  const [filter, setFilter] = useState("all");

  const handleToggle = (id) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleSaveAttendance = () => {
    console.log("Attendance record saved:", attendance);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredAttendance = () => {
    if (filter === "present") {
      return attendance.filter((student) => student.present);
    } else if (filter === "absent") {
      return attendance.filter((student) => !student.present);
    }
    return attendance;
  };

  return (
    <div className="attendance-container">
      <h2>Student Attendance</h2>
      <div className="filter-options">
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={() => handleFilterChange("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="present"
            checked={filter === "present"}
            onChange={() => handleFilterChange("present")}
          />
          Present
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="absent"
            checked={filter === "absent"}
            onChange={() => handleFilterChange("absent")}
          />
          Absent
        </label>
      </div>
      {filteredAttendance().map((student) => (
        <div
          key={student.id}
          className={`student-item ${student.present ? "present" : "absent"}`}
        >
          <span>{student.name}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => handleToggle(student.id)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      ))}
      <button onClick={handleSaveAttendance}>Save Attendance</button>
    </div>
  );
};

export default Attendance;

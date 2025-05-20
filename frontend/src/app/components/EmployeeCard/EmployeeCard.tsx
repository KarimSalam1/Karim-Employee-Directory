import React, { useState } from "react";
import "./EmployeeCard.css";
import {
  User,
  Mail,
  IdCard,
  Building,
  MapPin,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";

type EmployeeCardProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
  location: string;
  avatar?: string;
  onDelete: (id: string) => void;
  viewMode: "grid" | "list"; // Add viewMode prop
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  firstName,
  lastName,
  email,
  title,
  department,
  location,
  avatar,
  onDelete,
  viewMode, // Use viewMode prop
}) => {
  const [headline, setHeadline] = useState("Name");
  const [value, setValue] = useState(`${firstName} ${lastName}`);

  const infoMap = {
    name: {
      label: "Name",
      value: `${firstName} ${lastName}`,
      icon: <User color="#249851" />,
    },
    email: {
      label: "Email",
      value: email,
      icon: <Mail color="#249851" />,
    },
    title: {
      label: "Title",
      value: title,
      icon: <IdCard color="#249851" />,
    },
    department: {
      label: "Department",
      value: department,
      icon: <Building color="#249851" />,
    },
    location: {
      label: "Location",
      value: location,
      icon: <MapPin color="#249851" />,
    },
  };

  const handleHover = (key: keyof typeof infoMap) => {
    if (viewMode === "grid") {
      setHeadline(infoMap[key].label);
      setValue(infoMap[key].value);
    }
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  // Grid view (original card)
  if (viewMode === "grid") {
    return (
      <div className="employee-card">
        <img
          src={avatar || "/user.png"}
          alt={`${firstName}'s avatar`}
          className="employee-avatar"
        />

        <div className="employee-details">
          <div className="employee-info">
            <p className="employee-headline">{headline}</p>
            <p className="employee-value">{value}</p>
          </div>

          <div className="employee-icons">
            <div className="icon" onMouseEnter={() => handleHover("name")}>
              <User color="#249851" />
            </div>
            <div className="icon" onMouseEnter={() => handleHover("email")}>
              <Mail color="#249851" />
            </div>
            <div className="icon" onMouseEnter={() => handleHover("title")}>
              <IdCard color="#249851" />
            </div>
            <div
              className="icon"
              onMouseEnter={() => handleHover("department")}
            >
              <Building color="#249851" />
            </div>
            <div className="icon" onMouseEnter={() => handleHover("location")}>
              <MapPin color="#249851" />
            </div>
          </div>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <Link href={`/edit/${id}`}>
              <button
                className="edit-button"
                type="button"
                title="Edit Employee"
              >
                <Pencil size={16} /> Edit
              </button>
            </Link>
            <button
              className="delete-button"
              onClick={handleDeleteClick}
              title="Delete Employee"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List view (horizontal layout)
  return (
    <div className="employee-card-list">
      <div className="employee-list-content">
        <img
          src={avatar || "/user.png"}
          alt={`${firstName}'s avatar`}
          className="employee-avatar-list"
        />

        <div className="employee-info-list">
          <div className="employee-info-section">
            <div className="employee-info-item">
              <div className="info-icon">{infoMap.name.icon}</div>
              <div className="info-data">
                <span className="info-label">{infoMap.name.label}</span>
                <span className="info-value">{infoMap.name.value}</span>
              </div>
            </div>

            <div className="employee-info-item">
              <div className="info-icon">{infoMap.email.icon}</div>
              <div className="info-data">
                <span className="info-label">{infoMap.email.label}</span>
                <span className="info-value">{infoMap.email.value}</span>
              </div>
            </div>
          </div>

          <div className="employee-info-section">
            <div className="employee-info-item">
              <div className="info-icon">{infoMap.title.icon}</div>
              <div className="info-data">
                <span className="info-label">{infoMap.title.label}</span>
                <span className="info-value">{infoMap.title.value}</span>
              </div>
            </div>

            <div className="employee-info-item">
              <div className="info-icon">{infoMap.department.icon}</div>
              <div className="info-data">
                <span className="info-label">{infoMap.department.label}</span>
                <span className="info-value">{infoMap.department.value}</span>
              </div>
            </div>

            <div className="employee-info-item">
              <div className="info-icon">{infoMap.location.icon}</div>
              <div className="info-data">
                <span className="info-label">{infoMap.location.label}</span>
                <span className="info-value">{infoMap.location.value}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="employee-actions-list">
          <Link href={`/edit/${id}`}>
            <button className="edit-button" type="button" title="Edit Employee">
              <Pencil size={16} /> Edit
            </button>
          </Link>
          <button
            className="delete-button"
            onClick={handleDeleteClick}
            title="Delete Employee"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;

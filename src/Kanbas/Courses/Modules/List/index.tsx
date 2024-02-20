import React, { useState } from "react";
import "./index.css";
import { modules } from "../../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
} from "react-icons/fa";
import { useParams } from "react-router";
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModuleId, setSelectedModule] = useState(modulesList[0]._id);

  return (
    <>
      <ul className="list-group wd-modules">
        {modulesList.map((module) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedModule(module._id)}
          >
            <div className="wd-modules-section">
              <FaGripVertical className="me-2" />
              {module.name}
              <span className="float-end wd-modules-content-actions">
                <FaCheckCircle className="text-success" />
                <FaPlus className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>

            {selectedModuleId === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item">
                    <FaGripVertical className="me-2" />
                    <div className="wd-modules-content-text">{lesson.name}</div>
                    <span className="float-end wd-modules-content-actions">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;

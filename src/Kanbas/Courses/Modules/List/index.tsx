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
            <div className="wd-modules-section d-flex align-items-center">
              <FaGripVertical className="me-2" />
              <div className="me-auto">{module.name}</div>
              <span className="float-end wd-modules-content-actions d-flex">
                <FaCheckCircle className="wd-icon-green" />
                <FaPlus className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>

            {selectedModuleId === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item d-flex align-items-center">
                    <FaGripVertical className="me-2" />
                    <div className="wd-modules-content-text me-auto">
                      {lesson.name}
                    </div>
                    <span className="float-end wd-modules-content-actions d-flex">
                      <FaCheckCircle className="wd-icon-green" />
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

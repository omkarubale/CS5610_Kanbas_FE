import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  removeModule,
  updateModule,
  setModule,
  setAddModuleDrawerOpen,
  setModules,
} from "./../reducer";
import { KanbasState } from "../../../store";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
  FaPen,
  FaTrash,
  FaCaretDown,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Button, Card, Collapse } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  findModulesForCourse,
  createModule,
  deleteModule,
  putModule,
} from "../client";
import { IKanbasModule } from "../../../store/interfaces/modules";
import { ISectionExpanded } from "../../common/interfaces/sectionExpanded";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const [moduleExpandedList, setModuleExpandedList] = useState(
    [] as ISectionExpanded[]
  );
  const addModuleDrawerOpen = useSelector(
    (state: KanbasState) => state.modulesReducer.addModuleDrawerOpen
  );
  const handleAddModule = () => {
    if (courseId !== undefined)
      createModule(courseId, module).then((module) => {
        dispatch(addModule(module));
        const moduleExpanded: ISectionExpanded = {
          _id: module._id,
          expanded: false,
        };

        setModuleExpandedList([...moduleExpandedList, moduleExpanded]);
      });
  };

  const handleDeleteModule = (moduleId: string) => {
    if (moduleId !== undefined)
      deleteModule(moduleId).then(() => {
        dispatch(removeModule(moduleId));
      });
  };

  const handleUpdateModule = async () => {
    const status = await putModule(module);
    dispatch(updateModule(module));
  };

  useEffect(() => {
    if (courseId !== undefined)
      findModulesForCourse(courseId).then((modules) => {
        dispatch(setModules(modules));

        const _modulesExpandedList = modules.map((m: IKanbasModule) => {
          const moduleExpanded: ISectionExpanded = {
            _id: m._id,
            expanded: false,
          };
          return moduleExpanded;
        });

        setModuleExpandedList(_modulesExpandedList);
      });
  }, [courseId]);

  const isModuleExpanded = (moduleId: string) => {
    return (
      moduleExpandedList.find((me) => me._id == moduleId)?.expanded ?? false
    );
  };
  const toggleModuleExpanded = (moduleId: string) => {
    const _expanded = moduleExpandedList.find(
      (me) => me._id == moduleId
    )?.expanded;
    setModuleExpandedList(
      moduleExpandedList.map((me, index) => {
        if (me._id == moduleId) {
          const moduleExpanded: ISectionExpanded = {
            _id: me._id,
            expanded: !_expanded,
          };
          return moduleExpanded;
        } else {
          return me;
        }
      })
    );
  };

  return (
    <>
      <h5>
        Add Module
        <FaCaretDown
          onClick={() => dispatch(setAddModuleDrawerOpen(!addModuleDrawerOpen))}
          aria-controls="add-module-drawer-controls"
          aria-expanded={addModuleDrawerOpen}
          style={{ transform: addModuleDrawerOpen ? "" : "rotate(-90deg)" }}
        />
      </h5>
      <Collapse in={addModuleDrawerOpen}>
        <div>
          <Card className="p-3 mb-3 rounded-0">
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(setModule({ ...module, name: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  className="mb-3"
                  value={module.description}
                  onChange={(e) =>
                    dispatch(
                      setModule({ ...module, description: e.target.value })
                    )
                  }
                />
              </Form.Group>
              <Form.Group className="d-flex">
                <Button
                  className="wd-button-standard my-1 ms-auto px-2"
                  onClick={handleAddModule}
                >
                  Add
                </Button>
                <Button
                  className="wd-button-standard my-1 me-0 px-2"
                  onClick={handleUpdateModule}
                >
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </div>
      </Collapse>
      <ul className="list-group wd-modules">
        {modulesList.map((module, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => toggleModuleExpanded(module._id)}
            aria-controls={"module-collapse-" + module._id}
            aria-expanded={isModuleExpanded(module._id)}
          >
            <div className="wd-modules-section d-flex align-items-center">
              <FaGripVertical className="me-2" />
              <div className="me-auto d-flex justify-content-center align-items-center">
                {module.name}{" "}
                <Button
                  className="d-contents"
                  onClick={() => {
                    dispatch(setModule(module));
                    dispatch(setAddModuleDrawerOpen(true));
                  }}
                >
                  <FaPen className="ms-2" />
                </Button>
                <Button
                  className="d-contents"
                  onClick={() => handleDeleteModule(module._id)}
                >
                  <FaTrash className="ms-2" />
                </Button>
              </div>
              <span className="float-end wd-modules-content-actions d-flex">
                <FaCheckCircle className="wd-icon-green" />
                <FaPlus className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>

            <Collapse in={isModuleExpanded(module._id)}>
              <div
                id={"module-collapse-" + module._id}
                className="wd-module-collapse"
              >
                <ul className="list-group">
                  {module.lessons?.map((lesson, subIndex) => (
                    <li
                      key={subIndex}
                      className="list-group-item d-flex align-items-center"
                    >
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
              </div>
            </Collapse>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;

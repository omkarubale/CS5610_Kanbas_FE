import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuiz, addQuiz, resetQuiz, updateQuiz } from "../../reducer";
import { eQuizType } from "../../../../store/enums/eQuizType";
import { eAssignmentGroup } from "../../../../store/enums/eAssignmentGroup";
import { formatDate, formatSnakeCaseToTitleCase } from "../../../common/Utils";
import TinyMCEEditor from "../../../common/Editor/TinyMCEEditor";
import { createQuiz, putQuiz } from "../../client";
import { eQuizEditCheckedOptions } from "../../../../store/enums/eQuizEditCheckedOptions";

function QuizDetailsEditor({ isCreate }: { isCreate: boolean }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();

  const quizDetails = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );

  const quizTypes = Object.keys(eQuizType).filter((key) => isNaN(Number(key)));
  const assignmentGroup = Object.keys(eAssignmentGroup).filter((key) =>
    isNaN(Number(key))
  );

  // Use for updating quiz instructions
  const [description, setDescription] = useState(quizDetails?.description);

  const handleCancel = () => {
    if (quizId !== undefined) {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
    } else {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }
    dispatch(resetQuiz());
  };

  const handleSave = (isPublish: boolean) => {
    if (isPublish) {
      dispatch(setQuiz({ ...quizDetails, isPublish: isPublish }));
    }

    if (courseId !== undefined) {
      if (isCreate) {
        createQuiz(courseId, quizDetails).then(() => {
          dispatch(addQuiz(courseId));
        });
      } else {
        putQuiz(quizDetails).then(() => {
          dispatch(updateQuiz());
        });
      }

      handleCancel();
    }
  };

  const handleGetEditorContent = (content: string) => {
    setDescription(content);
    dispatch(setQuiz({ ...quizDetails, description: content }));
  };

  const handleOptionChange = (option: eQuizEditCheckedOptions) => {
    switch (option) {
      case eQuizEditCheckedOptions.SHUFFLE_ANSWERS:
        dispatch(
          setQuiz({
            ...quizDetails,
            isShuffleAnswers: !quizDetails.isShuffleAnswers,
          })
        );
        break;
      case eQuizEditCheckedOptions.MULTIPLE_ATTEMPS:
        dispatch(
          setQuiz({
            ...quizDetails,
            isMultipleAttempts: !quizDetails.isMultipleAttempts,
          })
        );
        break;
      case eQuizEditCheckedOptions.TIME_LIMIT:
        dispatch(
          setQuiz({
            ...quizDetails,
            timeLimit: quizDetails.timeLimit ? undefined : 20,
          })
        );
        break;
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3 w-50" controlId="formQuizName">
        <Form.Control
          type="text"
          className="form-control"
          value={quizDetails.title}
          placeholder="Quiz Name"
          onChange={(e) =>
            dispatch(
              setQuiz({
                ...quizDetails,
                title: e.target.value,
              })
            )
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formQuizDescription">
        <div className="d-flex flex-column">
          <Form.Label className="ms-1">Quiz Instructions</Form.Label>
          <TinyMCEEditor
            initialValue={description}
            onGetContent={handleGetEditorContent}
          />
        </div>
      </Form.Group>
      <div>
        <Form.Group className="row mb-3" controlId="formQuizType">
          <div className="col-3">
            <Form.Label className="float-end mt-1">Quiz Type</Form.Label>
          </div>
          <div className="col-6 mr-auto">
            <Form.Select
              aria-label="Quiz Type"
              value={quizDetails.quizType}
              onChange={(e) =>
                dispatch(
                  setQuiz({
                    ...quizDetails,
                    quizType: e.target.value,
                  })
                )
              }
            >
              {quizTypes.map((key, index) => (
                <option
                  key={index}
                  value={eQuizType[key as keyof typeof eQuizType]}
                >
                  {formatSnakeCaseToTitleCase(key)}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formQuizType">
          <div className="col-3">
            <Form.Label className="float-end mt-1">Points</Form.Label>
          </div>
          <div className="col-6 mr-auto">
            <Form.Control
              type="text"
              className="form-control"
              value={quizDetails.points}
              placeholder="Quiz Points"
              onChange={(e) =>
                dispatch(
                  setQuiz({
                    ...quizDetails,
                    points: e.target.value,
                  })
                )
              }
              disabled
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formAssignmentGroup">
          <div className="col-3">
            <Form.Label className="float-end mt-1">Assignment Group</Form.Label>
          </div>
          <div className="col-6 mr-auto">
            <Form.Select
              aria-label="Assignment Group"
              value={quizDetails.assignmentGroup}
              onChange={(e) =>
                dispatch(
                  setQuiz({
                    ...quizDetails,
                    assignmentGroup: e.target.value,
                  })
                )
              }
            >
              {assignmentGroup.map((key, index) => (
                <option
                  key={index}
                  value={eAssignmentGroup[key as keyof typeof eAssignmentGroup]}
                >
                  {key}
                </option>
              ))}
            </Form.Select>
            <div className="mt-4 col-6 mr-auto">
              <h6 className="fw-bold">Options</h6>
              <Form.Check
                label="Shuffle Answers"
                checked={quizDetails.isShuffleAnswers}
                onChange={() =>
                  handleOptionChange(eQuizEditCheckedOptions.SHUFFLE_ANSWERS)
                }
              />
              <Form.Check
                label={
                  <div>
                    Time Limit
                    <input
                      type="text"
                      className="form-control"
                      value={quizDetails.timeLimit}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quizDetails,
                            timeLimit: e.target.value,
                          })
                        )
                      }
                      min="0"
                    />
                  </div>
                }
                checked={quizDetails.timeLimit !== undefined}
                onChange={() =>
                  handleOptionChange(eQuizEditCheckedOptions.TIME_LIMIT)
                }
              />
              <Form.Check
                label="Allow Multiple Attempts"
                checked={quizDetails.isMultipleAttempts}
                onChange={() =>
                  handleOptionChange(eQuizEditCheckedOptions.MULTIPLE_ATTEMPS)
                }
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formQuizAssignList">
          <div className="col-3">
            <Form.Label className="float-end mt-1">Assign</Form.Label>
          </div>
          <div className="col-6 mr-auto">
            <Card>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formQuizAssignTo">
                  <Form.Label className="fw-bold">Assign to</Form.Label>
                  <Form.Control type="text" value="Everyone" disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuizDueDate">
                  <Form.Label className="fw-bold">Due</Form.Label>
                  <Form.Control
                    type="date"
                    value={formatDate(quizDetails?.dueDate)}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quizDetails,
                          dueDate: e.target.value,
                        })
                      )
                    }
                  />
                </Form.Group>
                <div className="mb-3 row">
                  <Form.Group
                    className="col-6 pe-1"
                    controlId="formQuizAvailableFromDate"
                  >
                    <Form.Label className="fw-bold">Available From</Form.Label>
                    <Form.Control
                      type="date"
                      value={formatDate(quizDetails?.availableDate)}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quizDetails,
                            availableDate: e.target.value,
                          })
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="col-6 ps-1"
                    controlId="formQuizAvailableUntilDate"
                  >
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control
                      type="date"
                      value={formatDate(quizDetails?.availableUntilDate)}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quizDetails,
                            availableUntilDate: e.target.value,
                          })
                        )
                      }
                    />
                  </Form.Group>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-center align-items-center">
                  <FaPlus className="me-1" /> Add
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Form.Group>
      </div>
      <hr />

      <div className="d-flex">
        <div className="form-check float-start ms-2 mt-2 d-block flex-fill">
          <Form.Check
            type="checkbox"
            label="Notify users that this content has changed"
            id="formNotifyChangeCb"
            className="ps-0"
          />
        </div>
        <div className="float-end me-2">
          <Button className="wd-button-standard" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button
            className="wd-button-standard"
            onClick={() => handleSave(true)}
          >
            Save & Publish
          </Button>
          <Button className="wd-button-red" onClick={() => handleSave(false)}>
            Save
          </Button>
        </div>
      </div>
      <hr />
    </Form>
  );
}

export default QuizDetailsEditor;

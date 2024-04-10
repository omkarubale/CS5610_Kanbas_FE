import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Form } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import "./index.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KanbasState } from '../../../../store';
import { setQuiz, addQuiz, resetQuiz, updateQuiz, fetchQuizzes } from '../../reducer';
import { eQuizType } from '../../../../store/enums/eQuizType';
import { eAssignmentGroup } from '../../../../store/enums/eAssignmentGroup';
import { formatDate, formatToTitleCase } from '../../../common/Utils';
import TinyMCEEditor from '../../../common/Editor/TinyMCEEditor';

function QuizDetailsEditor({ isCreate }: { isCreate: boolean }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    const quizDetails = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );

    const quizTypes = Object.keys(eQuizType).filter(key => isNaN(Number(key)));
    const assignmentGroup = Object.keys(eAssignmentGroup).filter(key => isNaN(Number(key)));

    // Use for updating quiz instructions
    const [value, setValue] = useState("");

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        dispatch(resetQuiz());
    }

    const handleSave = (isPublish: boolean) => {
        if (isPublish) {
            dispatch(setQuiz({ ...quizDetails, isPublish: isPublish }));
        }

        if (isCreate) {
            dispatch(addQuiz({ course: courseId }));
        } else {
            dispatch(updateQuiz());
        }

        handleCancel();
    }

    const handleGetEditorContent = (content: string) => {
        setValue(content);
        dispatch(setQuiz({ ...quizDetails, description: content }));
    }

    return (
        <Form>
            <Form.Group className='mb-3 w-50' controlId="formQuizName">
                <Form.Control
                    type="text"
                    className="form-control"
                    value={quizDetails.title}
                    placeholder="Quiz Name"
                    onChange={(e) => dispatch(setQuiz({
                        ...quizDetails, title: e.target.value
                    }))}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formQuizDescription'>
                <div className='d-flex flex-column'>
                    <Form.Label className="ms-1">Quiz Instructions</Form.Label>
                    <TinyMCEEditor
                        initialValue={quizDetails.description}
                        onGetContent={handleGetEditorContent}
                    />
                </div>
            </Form.Group>
            <div>
                <Form.Group className="row mb-3" controlId="formQuizType">
                    <div className="col-3">
                        <Form.Label className="float-end mt-1">
                            Quiz Type
                        </Form.Label>
                    </div>
                    <div className="col-6 mr-auto">
                        <Form.Select
                            aria-label="Quiz Type"
                            value={quizDetails.quizType}
                            onChange={(e) => dispatch(setQuiz({
                                ...quizDetails, quizType: e.target.value
                            }))}
                        >
                            {quizTypes.map((key, index) => (
                                <option key={index} value={eQuizType[key as keyof typeof eQuizType]}>
                                    {formatToTitleCase(key.replace(/_/g, ' '))}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="formAssignmentGroup">
                    <div className="col-3">
                        <Form.Label className="float-end mt-1">
                            Assignment Group
                        </Form.Label>
                    </div>
                    <div className="col-6 mr-auto">
                        <Form.Select
                            aria-label="Assignment Group"
                            value={quizDetails.assignmentGroup}
                            onChange={(e) => dispatch(setQuiz({
                                ...quizDetails, assignmentGroup: e.target.value
                            }))}
                        >
                            {assignmentGroup.map((key, index) => (
                                <option key={index} value={eAssignmentGroup[key as keyof typeof eAssignmentGroup]}>
                                    {key}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>

                <Form.Group
                    className="row mb-3"
                    controlId="formAssignmentAssignList"
                >
                    <div className="col-3">
                        <Form.Label className="float-end mt-1">Assign</Form.Label>
                    </div>
                    <div className="col-6 mr-auto">
                        <Card>
                            <Card.Body>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formAssignmentAssignTo"
                                >
                                    <Form.Label className="fw-bold">Assign to</Form.Label>
                                    <Form.Control type="text" value="Everyone" disabled />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formAssignmentDueDate"
                                >
                                    <Form.Label className="fw-bold">Due</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formatDate(quizDetails?.dueDate)}
                                        onChange={(e) => dispatch(setQuiz({
                                            ...quizDetails, dueDate: e.target.value
                                        }))}
                                    />
                                </Form.Group>
                                <div className="mb-3 row">
                                    <Form.Group
                                        className="col-6 pe-1"
                                        controlId="formAssignmentAvailableFromDate"
                                    >
                                        <Form.Label className="fw-bold">
                                            Available From
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={formatDate(quizDetails?.availableDate)}
                                            onChange={(e) => dispatch(setQuiz({
                                                ...quizDetails, availableDate: e.target.value
                                            }))}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="col-6 ps-1"
                                        controlId="formAssignmentAvailableUntilDate"
                                    >
                                        <Form.Label className="fw-bold">Until</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={formatDate(quizDetails?.availableUntilDate)}
                                            onChange={(e) => dispatch(setQuiz({
                                                ...quizDetails, availableUntilDate: e.target.value
                                            }))}
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
            </div >
            <hr />

            <div className='form-check-buttons-container'>
                <div className="form-check float-start mt-2">
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
                    <Button className="wd-button-standard" onClick={() => handleSave(true)}>
                        Save & Publish
                    </Button>
                    <Button className="wd-button-red" onClick={() => handleSave(false)}>
                        Save
                    </Button>
                </div>
            </div>
            <hr />
        </Form >
    );
}

export default QuizDetailsEditor; 
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import "./index.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KanbasState } from '../../../../store';
import { setQuiz, addQuiz, resetQuiz, updateQuiz, fetchQuizzes } from '../../reducer';
import { eQuizType } from '../../../../store/enums/eQuizType';
import { eAssignmentGroup } from '../../../../store/enums/eAssignmentGroup';

function QuizDetailsEditor({ isCreate }: { isCreate: boolean }) {
    // TODO move this later to env file
    const API_KEY = "mhgsbn0hpoxglrhp0i5yksi6m4rk8nkutj2fn8qxn9cn7s9i";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    const quizDetails = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );

    const quizTypes = Object.keys(eQuizType).filter(key => isNaN(Number(key)));
    const assignmentGroup = Object.keys(eAssignmentGroup).filter(key => isNaN(Number(key)));

    const [value, setValue] = useState("");
    const [text, setText] = useState("");

    const onEditorInputChange = (newValue: any, editor: any) => {
        setValue(newValue);
        setText(editor.getContent({ format: "text" }));
        dispatch(setQuiz({ ...quizDetails, description: newValue }));
    }

    const formatDate = (date: Date) => {
        return date ? new Date(date).toISOString().split('T')[0] : '';
    }

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
                    onFocus={(e) => e.target.style.textAlign = 'left'}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formQuizDescription'>
                <Editor
                    apiKey={API_KEY}
                    onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
                    onInit={(evt, editor) => setText(editor.getContent({ format: "text" }))}
                    value={value}
                    initialValue={quizDetails.description === null || quizDetails.description === ""
                        ? "Write quiz instructions here..."
                        : quizDetails.description}
                    init={{
                        height: 500,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
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
                                    {key}
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
                        <div className="card">
                            <div className="card-body">
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
                            </div>
                            <div className="card-footer text-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <FaPlus className="me-1" /> Add
                                </div>
                            </div>
                        </div>
                    </div>
                </Form.Group>
            </div>
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
                <div className="float-end">
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
        </Form>
    );
}

export default QuizDetailsEditor; 
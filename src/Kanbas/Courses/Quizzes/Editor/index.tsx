import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import QuizDetailsEditor from "./Details";
import QuizQuestionsEditor from "./Questions";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import "./index.css";

function QuizEditor() {

    const [key, setKey] = useState<string>("Details")

    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <div className="d-inline-flex align-center">
                        <span className="fs-5">
                            Points 100
                        </span>
                        <div className="text-success ms-2 p-1">
                            <FaCheckCircle className="pe-1" />
                            <span className="fw-bold pe-1">Published</span>
                        </div>
                        <Button className="wd-button-standard me-0">
                            <div className="d-flex justify-content-center align-items-center">
                                <FaEllipsisV className="my-1" />
                            </div>
                        </Button>
                    </div>
                </MiddleContentActions>
                <hr />
                <MiddleContentData>
                    <Tabs
                        className="wd-tabs mb-3"
                        activeKey={key}
                        onSelect={(k) => setKey(k as string)}
                    >
                        <Tab eventKey="Details" title="Details">
                            {key == "Details" && <QuizDetailsEditor isCreate={true} />}
                        </Tab>
                        <Tab eventKey="Questions" title="Questions">
                            {key == "Questions" && <QuizQuestionsEditor />}
                        </Tab>
                    </Tabs>
                </MiddleContentData>
            </MiddleContent>
        </>
    );
}

export default QuizEditor; 

function ShortAnswers({ question }: { question: any }) {
    return (
        <div className="text">
            <div className="question-text">
                <p>{question.questionText}</p>
            </div>
            <div className="answers">
                {question.correctAnswers.map((choice: any, index: number) => (
                    <div className="answer" key={index}>
                        <label className="d-flex justify-content-start">
                            <span className="answer-input">
                                <input
                                    type="text"
                                    className="form-control"
                                ></input>
                            </span>

                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShortAnswers; 
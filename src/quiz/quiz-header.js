export default function QuizHeader(props) {
    let currentQuestion = props.questions.results[0];
    return (
        <header className="header">
            <h1>Trivia quiz</h1>
            {currentQuestion ? <p>{currentQuestion.category}</p> : null}
            {currentQuestion ? <p>{currentQuestion.difficulty}</p> : null}
            <button className="main-button" id="quiz-header-start-new-quiz-button" onClick={props.handleClick}>start new quiz</button>
        </header>
    );
}
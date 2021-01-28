export default function QuizHeader(props) {
    return (
        <header className="header">
            <h1>Trivia quiz</h1>
            {props.currentQuestion.category ? <p>{props.currentQuestion.category}</p> : null}
            {props.currentQuestion.difficulty ? <p>{props.currentQuestion.difficulty}</p> : null}
            <button className="main-button" id="quiz-header-start-new-quiz-button" onClick={props.handleClick}>start new quiz</button>
        </header>
    );
}
import React, { useState } from 'react';

const MakeQuestion = () => {
    const [questionText, setQuestionText] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('A');
    const [questionsList, setQuestionsList] = useState([]);

    const handleSubmit = () => {
        if (questionText && optionA && optionB && optionC && optionD && correctAnswer) {
            // Add question to the questions list
            const newQuestion = {
                questionText,
                options: {
                    A: optionA,
                    B: optionB,
                    C: optionC,
                    D: optionD
                },
                correctAnswer
            };
            setQuestionsList([...questionsList, newQuestion]);

            // Clear form fields
            setQuestionText('');
            setOptionA('');
            setOptionB('');
            setOptionC('');
            setOptionD('');
            setCorrectAnswer('A');
        } else {
            alert('Please fill in all the fields.');
        }
    };

    return (
        <div>
            <h2>Create Question</h2>
            <div>
                <label htmlFor="question-text">Question Text</label>
                <input
                    type="text"
                    id="question-text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="option-a">Option A</label>
                <input
                    type="text"
                    id="option-a"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="option-b">Option B</label>
                <input
                    type="text"
                    id="option-b"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="option-c">Option C</label>
                <input
                    type="text"
                    id="option-c"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="option-d">Option D</label>
                <input
                    type="text"
                    id="option-d"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="correct-answer">Correct Answer</label>
                <select
                    id="correct-answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                </select>
            </div>

            <button type="button" onClick={handleSubmit}>Add Question</button>

            <div id="question-list">
                <h3>Added Questions</h3>
                {questionsList.length === 0 ? (
                    <p>No questions added yet.</p>
                ) : (
                    questionsList.map((question, index) => (
                        <div key={index} className="question-item">
                            <p><strong>Question:</strong> {question.questionText}</p>
                            <ul>
                                <li>A) {question.options.A}</li>
                                <li>B) {question.options.B}</li>
                                <li>C) {question.options.C}</li>
                                <li>D) {question.options.D}</li>
                            </ul>
                            <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MakeQuestion;

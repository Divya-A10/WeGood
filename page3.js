import React, { useState } from 'react';

const MentalHealthSurvey = () => {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = () => {
    console.log('Survey Answers:', answers);
    // Here, you can implement logic to store the answers, send to a server, etc.
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#9CCB7A', borderRadius: 10, width: '50%', margin: '0 auto' }}>
      <h2>Mental Health Survey</h2>
      
      <div>
        <h3>1. How would you describe your overall mental health in the past month?</h3>
        <div>
          <input
            type="radio"
            name="question1"
            value="Good"
            onChange={() => handleAnswerChange('question1', 'Good')}
          /> Good
          <input
            type="radio"
            name="question1"
            value="Average"
            onChange={() => handleAnswerChange('question1', 'Average')}
          /> Average
          <input
            type="radio"
            name="question1"
            value="Poor"
            onChange={() => handleAnswerChange('question1', 'Poor')}
          /> Poor
        </div>
      </div>
      
      <div>
        <h3>2. Have you experienced difficulty in sleeping or eating?</h3>
        <div>
          <input
            type="radio"
            name="question2"
            value="Yes"
            onChange={() => handleAnswerChange('question2', 'Yes')}
          /> Yes
          <input
            type="radio"
            name="question2"
            value="No"
            onChange={() => handleAnswerChange('question2', 'No')}
          /> No
        </div>
      </div>
      
      <div>
        <h3>3. Have you been experiencing persistent sadness or hopelessness?</h3>
        <div>
          <input
            type="radio"
            name="question3"
            value="No"
            onChange={() => handleAnswerChange('question3', 'No')}
          /> No, not at all
          <input
            type="radio"
            name="question3"
            value="Occasionally"
            onChange={() => handleAnswerChange('question3', 'Occasionally')}
          /> Occasionally
          <input
            type="radio"
            name="question3"
            value="Yes"
            onChange={() => handleAnswerChange('question3', 'Yes')}
          /> Yes, almost every day
        </div>
      </div>

      <div>
        <h3>4. Do you feel isolated or disconnected from others?</h3>
        <div>
          <input
            type="radio"
            name="question4"
            value="Yes"
            onChange={() => handleAnswerChange('question4', 'Yes')}
          /> Yes
          <input
            type="radio"
            name="question4"
            value="No"
            onChange={() => handleAnswerChange('question4', 'No')}
          /> No
        </div>
      </div>

      <div>
        <h3>5. Do you experience mood swings that are difficult to control?</h3>
        <div>
          <input
            type="radio"
            name="question5"
            value="Yes"
            onChange={() => handleAnswerChange('question5', 'Yes')}
          /> Yes
          <input
            type="radio"
            name="question5"
            value="No"
            onChange={() => handleAnswerChange('question5', 'No')}
          /> No
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#5a9e56', color: 'white', border: 'none', borderRadius: 5 }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MentalHealthSurvey;

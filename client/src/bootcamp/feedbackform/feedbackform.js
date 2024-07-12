import React, { useState } from 'react';
import './feedbackform.css';

export const FeedbackForm = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const Submit = async () => {
      try {
          setLoad(true);
          const res = await axios.post(process.env.REACT_APP_Server + "/feedback/" + selectedOption + "/" + feedback );
          if (res.data.message) {
              toast({
                title: 'Submitted Successfully!',
                status: 'success',
                position: 'top-right',
                isClosable: true,
            });
        } else {
              console.log(res);
              alert("Try again");
          }
      } catch (e) {
          setLoad(false);
          alert("Please Fill the details");
          console.log(e);
      }
  };

    return (
        <div className="feedback-form">
            <h2>Feedback Form</h2>
            <label onSubmit={Submit}>
                <div>
                    <h6>Your Feedback</h6>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="Tech"
                                checked={selectedOption === 'Tech'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                required
                            />
                            Tech
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Website"
                                checked={selectedOption === 'Website'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                required
                            />
                            Website
                        </label>
                    </div>
                </div>
                {selectedOption && (
                    <div><br/>
                        <h6>Feedback</h6>
                        <textarea
                            required
                            placeholder="Your Feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                    </div>
                )}<br/>
                <button type="submit">Submit</button>
            </label>
        </div>
    );
};




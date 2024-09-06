import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import './style.css';

const StepperForm = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState('4ovpsx23fphykh');
  const [selectionHistoryIds, setSelectionHistoryIds] = useState([
    'cpr3oi5mjqzgar',
    'n7yc7kdj95rlgu',
    'catp1rt2f5a9ql',
    '4ovpsx23fphykh',
  ]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [optionNumbers, setOptionNumbers] = useState([]);
  const optionNumbersBase = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "9️⃣"];
  const chatEndRef = useRef(null);

  const generateEmojiNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 50; i++) {
      let numberStr = i.toString();
      let emojiNumber = "";
      for (let char of numberStr) {
        emojiNumber += optionNumbersBase[parseInt(char)];
      }
      numbers.push(emojiNumber);
    }
    setOptionNumbers(numbers);
  };

  useEffect(() => {
    generateEmojiNumbers();

  }, []);
  useEffect(() => {
    const storedData = localStorage.getItem('flowchart');
    if (storedData) {
      const JSONData = parseShapesToFlow(JSON.parse(storedData));
      setFormData(JSONData);
      const firstStep = Object.keys(JSONData)[0];
      setCurrentStep(firstStep);

      const initialMessages = []

      initialMessages.push({
        agentMessage: {
          timestamp: new Date().toISOString(),
          text: JSONData[firstStep].title,
        },
      });

      initialMessages.push({
        agentMessage: {
          timestamp: new Date().toISOString(),
          text: Object.keys(JSONData[firstStep].options)
            .map((optionKey, index) => {
              const optionData = JSONData[firstStep].options[optionKey];
              return `${optionNumbers[index]} - ${optionData.label}`;
            })
            .join("<br/>"),
        },
      });

      setMessages(initialMessages);
    }
    setLoading(false);
  }, [optionNumbers]);

  const parseShapesToFlow = (json) => {
    const result = {};
    json.forEach((node) => {
      if (node.options.length > 0) {
        const options = {};
        node.options.forEach((option) => {
          options[option.key] = {
            label: option.name,
            value: option.target,
          };
        });
        result[node.key] = {
          title: node.title,
          options,
        };
      } else {
        result[node.key] = {
          title: node.title,
        };
      }
    });
    return result;
  };

  const handleOptionChange = (selectedOption, selectedText) => {
    console.log(formData[selectedOption])

    const agentMessages = [];

    if (formData[selectedOption] === undefined) {
      agentMessages.push({
        systemMessage: {
          timestamp: new Date().toISOString(),
          text: "🤖 Nuestro bot se ha perdido, por favor revisa la configuración",
        },
      });
      agentMessages.push({
        systemMessage: {
          timestamp: new Date().toISOString(),
          text: "------------------ CHAT FINALIZADO ------------------",
        },
      });
    } else {
      formData[selectedOption].title.split("\n").forEach((el) => {
        if (el !== "") {
          agentMessages.push({
            agentMessage: {
              timestamp: new Date().toISOString(),
              text: el,
            },
          });
        }
      });

      if (formData[selectedOption].options) {
        agentMessages.push({
          agentMessage: {
            timestamp: new Date().toISOString(),
            text: Object.keys(formData[selectedOption].options)
              .map((optionKey, index) => {
                const optionData = formData[selectedOption].options[optionKey];
                return `${optionNumbers[index]} - ${optionData.label}`;
              })
              .join("<br/>"),
          },
        });
      } else {
        agentMessages.push({
          agentMessage: {
            timestamp: new Date().toISOString(),
            text: formData[selectedOption].title,
          },
        });
        agentMessages.push({
          systemMessage: {
            timestamp: new Date().toISOString(),
            text: "------------------ CHAT FINALIZADO ------------------",
          },
        });
      }

    }

    setMessages((prev) => [...prev, ...agentMessages]);
    setCurrentStep(selectedOption);
    setSelectionHistoryIds((prev) => [...prev, selectedOption]);
  };

  const handleSubmit = () => {
    const inputAsNumber = parseInt(inputValue, 10);
    const optionsArray = Object.keys(formData[currentStep]?.options || {});
    const userMessage = {
      userMessage: {
        timestamp: new Date().toISOString(),
        text: inputValue,
      },
    };
    setMessages((prev) => [...prev, userMessage]);

    if (!isNaN(inputAsNumber) && inputAsNumber > 0 && inputAsNumber <= optionsArray.length) {
      const selectedOptionKey = optionsArray[inputAsNumber - 1]; // <- radio
      const selectedOption = formData[currentStep].options[selectedOptionKey];
      handleOptionChange(selectedOption.value, inputValue);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          agentMessage: {
            timestamp: new Date().toISOString(),
            text: "Por favor ingresa una de las opciones válidas.",
          },
        },
      ]);
    }

    setInputValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const reset = () => {
    const firstStep = Object.keys(formData)[0];
    setCurrentStep(firstStep);
    setSelectionHistoryIds([firstStep]);
    setMessages([
      {
        agentMessage: {
          timestamp: new Date().toISOString(),
          text: formData[firstStep].title,
        },
      },
    ]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card variant="outlined" className="formBody">
      <div className="imgBg">
        <>
          <div className="chatWindow">
            {messages.map((message, index) => (
              message.agentMessage ? (
                message.agentMessage.text.split("\n").map((el, idx) => (
                  el !== "" && (
                    <div key={idx} className="agentMessage">
                      <p dangerouslySetInnerHTML={{ __html: el }}></p>
                      <span className='timeMessage'>{new Date(message.agentMessage.timestamp).toLocaleTimeString()}</span>
                    </div>
                  )
                ))
              ) : (message.userMessage) ? (
                <div className="userMessage" key={index}>
                  <p>{message.userMessage.text}</p>
                  <span className='timeMessage'>{new Date(message.userMessage.timestamp).toLocaleTimeString()}</span>
                </div>
              ) : <>
                <div className="systemMessage" key={index}>
                  <p>{message.systemMessage.text}</p>
                </div>
              </>
            ))}
            {/* Dummy div to act as an anchor for scrolling */}
            <div ref={chatEndRef}></div>
          </div>

          <div>
            <div className='chatInpputContainer'>
              <span className='chatInpputIcons'>
                <span>😀</span>
                <span>➕</span>
              </span>
              <input
                className='chatInpput'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                min="1"
                max={Object.keys(formData[currentStep]?.options || {}).length}
              />
              <span className='chatInpputSend' onClick={handleSubmit}>ENVIAR</span>
            </div>

          </div>
        </>
      </div>
    </Card>
  );
};

export default StepperForm;

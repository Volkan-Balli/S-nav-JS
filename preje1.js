
        document.addEventListener('DOMContentLoaded', function () {
            const nextButton = document.getElementById('next');
            const previousButton = document.getElementById('previous');
            const timerElement = document.getElementById('timer');
            const quizForm = document.getElementById('quizForm');

            let currentQuestion = 1;
            const totalQuestions = 5;
            let timeLeft = 5 * 60;

          
            function showQuestion(questionNumber) {
                for (let i = 1; i <= totalQuestions; i++) {
                    const question = document.getElementById(`question-${i}`);
                    question.style.display = (i === questionNumber) ? 'block' : 'none';
                }
            }

            
            const timerInterval = setInterval(function () {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    /*Sınavı Bitirdiğinde Mesaj Bırakır Hocam*/
                    alert("Süreniz doldu. Sınav tamamlandı!");
                    calculateScore();
                    quizForm.style.display = 'none';
                } else {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    timerElement.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
                    timeLeft--;
                }
            }, 1000);

            
            function calculateScore() {
                let correctAnswers = 0;
                let wrongAnswers = 0;
                // CEVAPLAR HOCAM
                const answers = {
                    'question-1': 'd',
                    'question-2': 'b',
                    'question-3': 'c',
                    'question-4': 'c',
                    'question-5': 'a'
                };

                for (let i = 1; i <= totalQuestions; i++) {
                    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
                    if (selectedOption) {
                        if (selectedOption.value === answers[`question-${i}`]) {
                            correctAnswers++;
                        } else {
                            wrongAnswers++;
                        }
                    }
                }

                const totalScore = correctAnswers * 20; 
                alert(`Sınav Tamamlandı! \nDoğru: ${correctAnswers} \nYanlış: ${wrongAnswers} \nPuanınız: ${totalScore}`);
            }

            
            showQuestion(currentQuestion);

            
            nextButton.addEventListener('click', function () {
                if (currentQuestion < totalQuestions) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                } else {
                    calculateScore();
                    quizForm.style.display = 'none';
                }
            });

            
            previousButton.addEventListener('click', function () {
                if (currentQuestion > 1) {
                    currentQuestion--;
                    showQuestion(currentQuestion);
                }
            });
        });
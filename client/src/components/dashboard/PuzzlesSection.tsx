import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  Stethoscope, 
  Pill, 
  Activity, 
  Trophy, 
  Clock, 
  Users, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Star,
  Target,
  Zap,
  Award
} from "lucide-react";

type QuizType = "multiple-choice" | "true-false" | "fill-blank" | "matching";

type Quiz = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  questions: number;
  completions: number;
  category: string;
  points: number;
  type: QuizType;
  isNew?: boolean;
  isTrending?: boolean;
};

type Question = {
  id: number;
  question: string;
  type: QuizType;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
};

type QuizSession = {
  quizId: number;
  currentQuestion: number;
  score: number;
  answers: (string | number)[];
  timeLeft: number;
  isCompleted: boolean;
};

const HealthcareQuizSection = () => {
  const [quizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: "Medical Terminology Mastery",
      description: "Test your knowledge of essential medical terms and abbreviations",
      icon: <Brain className="w-5 h-5" />,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
      difficulty: "Intermediate",
      duration: 15,
      questions: 20,
      completions: 1247,
      category: "General Medicine",
      points: 150,
      type: "multiple-choice",
      isNew: true
    },
    {
      id: 2,
      title: "Cardiology Essentials",
      description: "Heart conditions, treatments, and diagnostic procedures",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400",
      difficulty: "Advanced",
      duration: 20,
      questions: 25,
      completions: 892,
      category: "Cardiology",
      points: 200,
      type: "multiple-choice",
      isTrending: true
    },
    {
      id: 3,
      title: "Physical Examination Skills",
      description: "Clinical examination techniques and diagnostic methods",
      icon: <Stethoscope className="w-5 h-5" />,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400",
      difficulty: "Intermediate",
      duration: 12,
      questions: 15,
      completions: 2341,
      category: "Clinical Skills",
      points: 120,
      type: "true-false"
    },
    {
      id: 4,
      title: "Pharmacology Quick Quiz",
      description: "Drug classifications, mechanisms, and interactions",
      icon: <Pill className="w-5 h-5" />,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400",
      difficulty: "Advanced",
      duration: 18,
      questions: 30,
      completions: 567,
      category: "Pharmacology",
      points: 250,
      type: "multiple-choice",
      isNew: true
    },
    {
      id: 5,
      title: "Emergency Medicine Scenarios",
      description: "Critical care situations and emergency protocols",
      icon: <Activity className="w-5 h-5" />,
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400",
      difficulty: "Advanced",
      duration: 25,
      questions: 20,
      completions: 734,
      category: "Emergency Medicine",
      points: 300,
      type: "multiple-choice",
      isTrending: true
    },
    {
      id: 6,
      title: "Anatomy & Physiology",
      description: "Human body systems and their functions",
      icon: <Target className="w-5 h-5" />,
      color: "text-teal-600 bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400",
      difficulty: "Beginner",
      duration: 10,
      questions: 15,
      completions: 3892,
      category: "Basic Sciences",
      points: 100,
      type: "fill-blank"
    }
  ]);

  // Sample questions for demo
  const sampleQuestions: Question[] = [
    {
      id: 1,
      question: "What does the abbreviation 'MI' stand for in medical terminology?",
      type: "multiple-choice",
      options: ["Myocardial Infarction", "Multiple Injuries", "Medical Intervention", "Muscular Inflammation"],
      correctAnswer: 0,
      explanation: "MI stands for Myocardial Infarction, commonly known as a heart attack.",
      points: 10
    },
    {
      id: 2,
      question: "The normal resting heart rate for adults is typically between 60-100 beats per minute.",
      type: "true-false",
      correctAnswer: "true",
      explanation: "Yes, the normal resting heart rate for healthy adults ranges from 60 to 100 beats per minute.",
      points: 5
    }
  ];

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  // Timer effect
  useEffect(() => {
    if (quizSession && !quizSession.isCompleted && quizSession.timeLeft > 0) {
      const timer = setTimeout(() => {
        setQuizSession(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [quizSession?.timeLeft]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setQuizSession({
      quizId: quiz.id,
      currentQuestion: 0,
      score: 0,
      answers: [],
      timeLeft: quiz.duration * 60,
      isCompleted: false
    });
    setCurrentQuestion(sampleQuestions[0]);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const submitAnswer = () => {
    if (!quizSession || !currentQuestion || selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? quizSession.score + currentQuestion.points : quizSession.score;
    
    setQuizSession(prev => prev ? {
      ...prev,
      score: newScore,
      answers: [...prev.answers, selectedAnswer]
    } : null);

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!quizSession) return;

    if (quizSession.currentQuestion < sampleQuestions.length - 1) {
      const nextQ = quizSession.currentQuestion + 1;
      setQuizSession(prev => prev ? { ...prev, currentQuestion: nextQ } : null);
      setCurrentQuestion(sampleQuestions[nextQ]);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizSession(prev => prev ? { ...prev, isCompleted: true } : null);
    }
  };

  const restartQuiz = () => {
    setActiveQuiz(null);
    setQuizSession(null);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";
      case "Intermediate": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Advanced": return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const categories = ["all", "General Medicine", "Cardiology", "Clinical Skills", "Pharmacology", "Emergency Medicine", "Basic Sciences"];
  const filteredQuizzes = filter === "all" ? quizzes : quizzes.filter(quiz => quiz.category === filter);
  const visibleQuizzes = showMore ? filteredQuizzes : filteredQuizzes.slice(0, 3);

  // Quiz completion screen
  if (quizSession?.isCompleted) {
    const percentage = Math.round((quizSession.score / (sampleQuestions.length * 10)) * 100);
    
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h2>
            <p className="text-gray-600 dark:text-slate-300">Great job on completing "{activeQuiz?.title}"</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{quizSession.score}</div>
              <div className="text-sm text-gray-500 dark:text-slate-400">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{percentage}%</div>
              <div className="text-sm text-gray-500 dark:text-slate-400">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.floor((activeQuiz?.duration! * 60 - quizSession.timeLeft) / 60)}m
              </div>
              <div className="text-sm text-gray-500 dark:text-slate-400">Time Taken</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={restartQuiz} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Another Quiz
            </Button>
            <Button onClick={() => startQuiz(activeQuiz!)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Play className="w-4 h-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Active quiz screen
  if (activeQuiz && quizSession && currentQuestion) {
    const progress = ((quizSession.currentQuestion + 1) / sampleQuestions.length) * 100;
    
    return (
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{activeQuiz.title}</CardTitle>
              <p className="text-blue-100 text-sm">Question {quizSession.currentQuestion + 1} of {sampleQuestions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(quizSession.timeLeft)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{quizSession.score} pts</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {currentQuestion.question}
            </h3>
            
            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
                    } ${showExplanation && index === currentQuestion.correctAnswer ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
                    ${showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-slate-600"
                      }`}>
                        {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-gray-900 dark:text-white">{option}</span>
                      {showExplanation && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                      {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div className="flex gap-4">
                {["true", "false"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedAnswer(option)}
                    disabled={showExplanation}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === option 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-slate-600"
                      }`}>
                        {selectedAnswer === option && <div className="w-3 h-3 bg-white rounded-full" />}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {showExplanation && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explanation:</h4>
              <p className="text-gray-600 dark:text-slate-300">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={restartQuiz} variant="outline" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Exit Quiz
            </Button>
            {!showExplanation ? (
              <Button 
                onClick={submitAnswer} 
                disabled={selectedAnswer === null}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={nextQuestion}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {quizSession.currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main quiz selection screen
  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Healthcare Knowledge Quiz</CardTitle>
              <p className="text-indigo-100">Test and improve your medical expertise</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{quizzes.length}</div>
            <div className="text-sm text-indigo-200">Available Quizzes</div>
          </div>
        </div>
      </CardHeader>

      <div className="p-4 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(category)}
              className={`text-xs ${
                filter === category
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </Button>
          ))}
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {visibleQuizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="p-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
              onClick={() => startQuiz(quiz)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${quiz.color} group-hover:scale-105 transition-transform`}>
                    {quiz.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer">
                        {quiz.title}
                      </h3>
                      {quiz.isNew && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                          NEW
                        </span>
                      )}
                      {quiz.isTrending && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          TRENDING
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">{quiz.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{quiz.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>{quiz.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{quiz.completions.toLocaleString()} completed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>{quiz.points} points</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300 rounded-full">
                        {quiz.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    startQuiz(quiz);
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center gap-2 group-hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4" />
                  Start Quiz
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredQuizzes.length > 3 && (
          <div className="p-4 bg-gray-50 dark:bg-slate-800 text-center border-t border-gray-200 dark:border-slate-700">
            <Button 
              variant="ghost" 
              onClick={() => setShowMore(!showMore)}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-2 mx-auto"
            >
              {showMore ? "Show Less" : `Show ${filteredQuizzes.length - 3} More Quizzes`}
              <ChevronRight className={`w-4 h-4 transition-transform ${showMore ? "rotate-90" : ""}`} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthcareQuizSection;
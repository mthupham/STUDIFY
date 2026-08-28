import React, { useState, useEffect, useRef } from 'react';
import {
  getRandomQuestion,
  analyzeSpeaking,
} from './services/speakingApi';
import type {
  SpeakingQuestion,
  SpeakingAnalysisResponse,
} from './services/speakingApi';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface ChatTurn {
  question: SpeakingQuestion;
  answer?: string;
  analysis?: SpeakingAnalysisResponse;
}

// ==========================================
// SVG ICONS & UI METADATA
// ==========================================
const TerminalIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const LightBulbIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const MicIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const StopIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

const AlertCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckSparkleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LoadingSpinner: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

interface ScenarioMetadata {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SCENARIOS_METADATA: ScenarioMetadata[] = [
  {
    id: 'technical',
    title: 'Technical English',
    description: 'Master system architecture, code reviews, and tech lead syncs.',
    icon: <TerminalIcon />,
  },
  {
    id: 'daily',
    title: 'Daily Tech Sync',
    description: 'Practice standups, async Slack updates, and peer developer discussions.',
    icon: <SunIcon />,
  },
  {
    id: 'interview',
    title: 'Tech Interviews',
    description: 'Prepare for System Design, Coding interviews, and Tech Lead questions.',
    icon: <UserGroupIcon />,
  },
];

export const VoiceLearningDashboard: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('technical');
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [analysis, setAnalysis] = useState<SpeakingAnalysisResponse | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isQuestionLoading, setIsQuestionLoading] = useState<boolean>(false);

  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const finalTranscriptRef = useRef<string>('');
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentQuestion = turns.length > 0 ? turns[turns.length - 1].question : null;

  // Auto-scroll chat to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, liveTranscript, isProcessing]);

  // Load initial question when scenario changes
  useEffect(() => {
    let isMounted = true;

    const fetchInitialQuestion = async () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }

      finalTranscriptRef.current = '';
      setLiveTranscript('');
      setAnalysis(null);
      setErrorMessage(null);
      setIsQuestionLoading(true);

      try {
        const questionData = await getRandomQuestion(selectedScenario);
        if (isMounted) {
          setTurns([{ question: questionData }]);
        }
      } catch (error) {
        console.error('Failed to fetch question:', error);
        if (isMounted) {
          setErrorMessage('Unable to load question. Please check backend connection.');
        }
      } finally {
        if (isMounted) {
          setIsQuestionLoading(false);
        }
      }
    };

    fetchInitialQuestion();

    return () => {
      isMounted = false;
    };
  }, [selectedScenario]);

  // Web Speech API Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscriptRef.current += (finalTranscriptRef.current ? ' ' : '') + result[0].transcript.trim();
          } else {
            interimText += result[0].transcript;
          }
        }

        const combinedTranscript = (finalTranscriptRef.current + (interimText ? ' ' + interimText : '')).trim();
        setLiveTranscript(combinedTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions.');
        } else if (event.error !== 'no-speech') {
          setErrorMessage(`Speech recognition error: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setErrorMessage('Browser does not support Web Speech API. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleStartListening = async () => {
    setErrorMessage(null);
    finalTranscriptRef.current = '';
    setLiveTranscript('');

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
      }
    } catch (err) {
      setErrorMessage('Microphone access was denied. Please allow microphone permissions.');
    }
  };

  const handleStopPractice = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);

    const transcript = finalTranscriptRef.current.trim() || liveTranscript.trim();

    if (!transcript) {
      setErrorMessage('No speech was detected. Please try again.');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);

      // 1. Gửi backend phân tích
      const result = await analyzeSpeaking(transcript, selectedScenario);
      setAnalysis(result);

      // 2. Lấy câu hỏi mới tiếp theo
      const nextQuestion = await getRandomQuestion(selectedScenario);

      // 3. Cập nhật lượt hội thoại: lưu lại câu trả lời + result của lượt hiện tại, đẩy câu hỏi mới xuống dưới
      setTurns((prevTurns) => {
        const updated = [...prevTurns];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            answer: result.transcript || transcript,
            analysis: result,
          };
        }
        return [...updated, { question: nextQuestion }];
      });

      setLiveTranscript('');
      finalTranscriptRef.current = '';
    } catch (error) {
      console.error('Speaking analysis failed:', error);
      setErrorMessage('Unable to analyze your speech. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 text-slate-800 font-sans flex justify-center items-center">
      <main className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Scenarios Panel */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="p-5 bg-slate-50 rounded-xl shadow-sm border border-slate-300 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Tech Scenarios</h2>
            
            <div className="flex flex-col gap-3">
              {SCENARIOS_METADATA.map((item) => {
                const isActive = selectedScenario === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isProcessing}
                    onClick={() => setSelectedScenario(item.id)}
                    className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      isActive
                        ? 'bg-indigo-50 border-2 border-sky-700 shadow-sm'
                        : 'bg-white border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={isActive ? 'text-sky-700' : 'text-gray-500'}>
                        {item.icon}
                      </div>
                      <span className={`text-sm font-semibold ${isActive ? 'text-sky-700' : 'text-gray-900'}`}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 bg-blue-600 rounded-xl shadow-sm text-white flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5 text-yellow-300" />
              <h3 className="text-sm font-semibold">Pro Tip for Devs</h3>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Incorporate architectural terminology (e.g., 'idempotency', 'CI/CD pipeline', 'loose coupling') to raise your technical precision score.
            </p>
          </div>
        </aside>

        {/* Audio Practice Center */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative p-6 bg-slate-50 rounded-xl shadow-sm border border-slate-300 flex flex-col items-center justify-between min-h-[460px] overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col items-center gap-4 mt-4 w-full">
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <div className="absolute w-36 h-36 bg-blue-200 rounded-full animate-ping opacity-75" />
                )}
                <div
                  className={`relative w-28 h-28 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white transition-all ${
                    isRecording ? 'bg-emerald-600 scale-105' : 'bg-sky-700'
                  }`}
                >
                  <MicIcon className="w-12 h-12" />
                </div>
              </div>

              {isQuestionLoading ? (
                <div className="flex items-center gap-2 py-4 text-slate-500 text-sm font-medium">
                  <LoadingSpinner className="w-5 h-5 text-sky-700" />
                  <span>Loading question...</span>
                </div>
              ) : (
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mt-2 px-4 leading-tight">
                  {currentQuestion?.question ? `"${currentQuestion.question}"` : 'Select a scenario to start'}
                </h2>
              )}
              
              <p className="text-sm text-gray-600 text-center">
                {isRecording
                  ? 'Recording active... Speak clearly into your microphone.'
                  : 'Click "Start Talking" to speak your answer.'}
              </p>

              {errorMessage && (
                <p className="text-xs text-red-600 font-medium text-center bg-red-50 p-2 rounded border border-red-200">
                  {errorMessage}
                </p>
              )}

              {/* Waveform Visualizer */}
              <div className="flex items-end gap-1 h-8 mt-2">
                {[24, 12, 16, 12, 36, 24, 24, 24, 20, 32, 16].map((height, idx) => (
                  <span
                    key={idx}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isRecording ? 'bg-emerald-600 animate-pulse' : 'bg-slate-300'
                    }`}
                    style={{
                      height: isRecording ? `${height}px` : '8px',
                      animationDelay: isRecording ? `${idx * 100}ms` : '0ms',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="relative z-10 flex gap-4 mt-6 w-full justify-center">
              <button
                onClick={handleStopPractice}
                disabled={!isRecording || isProcessing}
                className={`px-6 py-3 font-medium text-sm rounded-full transition-colors flex items-center gap-2 shadow-sm ${
                  isRecording && !isProcessing
                    ? 'bg-red-700 hover:bg-red-800 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <StopIcon />
                <span>Stop Practice</span>
              </button>

              <button
                onClick={handleStartListening}
                disabled={isRecording || isProcessing || isQuestionLoading}
                className={`px-6 py-3 font-medium text-sm rounded-full transition-colors flex items-center gap-2 shadow-md ${
                  isRecording || isProcessing || isQuestionLoading
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-sky-700 hover:bg-sky-800 text-white cursor-pointer'
                }`}
              >
                <MicIcon className="w-4 h-4" />
                <span>Start Listening</span>
              </button>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="grid grid-cols-3 gap-3">
            <ScoreCard 
              label="Grammar" 
              score={analysis ? analysis.grammar?.score ?? null : null} 
              colorClass="text-sky-700" 
              progressBgClass="bg-sky-700" 
            />
            <ScoreCard 
              label="Tech Vocabulary" 
              score={analysis ? analysis.technicalVocabulary?.score ?? null : null} 
              colorClass="text-emerald-700" 
              progressBgClass="bg-emerald-700" 
            />
            <ScoreCard 
              label="Clarity & Precision" 
              score={analysis ? analysis.clarity?.score ?? null : null} 
              colorClass="text-amber-700" 
              progressBgClass="bg-amber-700" 
            />
          </div>
        </section>

        {/* Real-time Conversation History & Dynamic Feedback Panel */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Conversation History Scroll Box */}
          <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-300 overflow-hidden flex flex-col h-[340px] relative">
            <div className="p-4 bg-indigo-50/50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Conversation History</h3>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                  isRecording
                    ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                    : isProcessing
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isRecording ? 'Listening' : isProcessing ? 'Processing' : 'Idle'}
              </span>
            </div>

            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3 bg-white/80 backdrop-blur-sm z-20">
                <LoadingSpinner className="w-8 h-8 text-sky-700" />
                <p className="text-xs font-medium text-slate-700">Analyzing speech syntax & tech terms...</p>
              </div>
            ) : (
              <div className="p-4 overflow-y-auto flex flex-col gap-4 text-xs flex-1">
                {turns.map((turn, index) => {
                  const isLastTurn = index === turns.length - 1;
                  const currentSpeech = isLastTurn && (isRecording || liveTranscript) ? liveTranscript : turn.answer;

                  return (
                    <React.Fragment key={turn.question.id + '-' + index}>
                      {/* AI Question */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-sky-700 tracking-wider">AI TECH LEAD</span>
                        <div className="p-3 bg-indigo-50 text-gray-800 rounded-lg max-w-[90%] leading-relaxed">
                          {turn.question.question}
                        </div>
                      </div>

                      {/* User Answer */}
                      {(currentSpeech || isLastTurn) && (
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[10px] font-bold text-gray-500 tracking-wider">YOU (DEV)</span>
                          <div className="p-3 bg-white border border-slate-200 text-gray-800 rounded-lg max-w-[95%] leading-relaxed shadow-sm">
                            {currentSpeech ? (
                              currentSpeech
                            ) : (
                              <span className="text-slate-400 italic">
                                Your spoken speech will appear here in real-time...
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Dynamic Analysis Cards (Generated directly from Backend) */}
          <div className="p-5 bg-slate-50 rounded-xl shadow-sm border border-slate-300 flex flex-col gap-4">
            {/* Technical Grammar Review */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-red-700 font-semibold text-sm">
                <AlertCircleIcon />
                <span>Technical Grammar & Explanation</span>
              </div>

              {analysis ? (
                <div className="flex flex-col gap-2 text-xs">
                  {/* Grammatical Errors list if any */}
                  {analysis.grammar.hasErrors && analysis.grammar.errors.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {analysis.grammar.errors.map((err, index) => (
                        <div key={index} className="p-3 bg-rose-50/60 border-l-4 border-red-600 rounded flex flex-col gap-1">
                          <span className="font-bold text-red-700">Error: "{err.text}"</span>
                          <p className="text-gray-700 leading-normal">{err.message}</p>
                          <span className="font-medium text-emerald-800">Suggestion: {err.suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Backend Explanation & Rules */}
                  {analysis.grammar.explanation && (
                    <div className="p-3 bg-blue-50/60 border-l-4 border-sky-600 rounded flex flex-col gap-1">
                      <span className="font-bold text-sky-800">Backend Explanation</span>
                      <p className="text-gray-700 leading-normal">{analysis.grammar.explanation}</p>
                    </div>
                  )}

                  {analysis.grammar.grammarRule && (
                    <div className="p-2.5 bg-slate-100 rounded border border-slate-200 text-gray-700">
                      <span className="font-bold text-slate-800">Rule: </span>
                      {analysis.grammar.grammarRule}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Complete practice to see grammar review.
                </p>
              )}
            </div>

            <hr className="border-slate-200 my-1" />

            {/* Better Expressions & Recommendations */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <CheckSparkleIcon />
                <span>Better Expressions & Feedback</span>
              </div>

              {analysis ? (
                <div className="p-3 bg-emerald-50/60 border-l-4 border-emerald-600 rounded flex flex-col gap-2 text-xs">
                  {analysis.grammar.example && (
                    <div>
                      <span className="font-bold text-emerald-800">Better Example</span>
                      <p className="text-gray-800 italic leading-normal mt-0.5">
                        "{analysis.grammar.example}"
                      </p>
                    </div>
                  )}

                  {analysis.grammar.improvementTip && (
                    <div>
                      <span className="font-bold text-emerald-800">Improvement Tip</span>
                      <p className="text-gray-700 leading-normal mt-0.5">
                        {analysis.grammar.improvementTip}
                      </p>
                    </div>
                  )}

                  {analysis.technicalVocabulary?.feedback && (
                    <div className="mt-1 pt-2 border-t border-emerald-200/60">
                      <span className="font-bold text-emerald-800">Vocabulary Feedback</span>
                      <p className="text-gray-700 leading-normal mt-0.5">
                        {analysis.technicalVocabulary.feedback}
                      </p>
                    </div>
                  )}

                  {analysis.clarity?.feedback && (
                    <div className="mt-1 pt-2 border-t border-emerald-200/60">
                      <span className="font-bold text-emerald-800">Clarity Feedback</span>
                      <p className="text-gray-700 leading-normal mt-0.5">
                        {analysis.clarity.feedback}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Complete practice to see recommendations.
                </p>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

interface ScoreCardProps {
  label: string;
  score: number | null;
  colorClass: string;
  progressBgClass: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  label,
  score,
  colorClass,
  progressBgClass,
}) => {
  return (
    <div className="p-3 bg-slate-50 rounded-xl border border-slate-300 flex flex-col items-center gap-2">
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider text-center">{label}</span>
      <div className="flex items-baseline gap-0.5">
        <span className={`text-2xl font-bold ${colorClass}`}>
          {score !== null ? score : '--'}
        </span>
        {score !== null && <span className="text-xs text-gray-400">/100</span>}
      </div>
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressBgClass} rounded-full transition-all duration-500`}
          style={{ width: `${score === null ? 0 : score}%` }}
        />
      </div>
    </div>
  );
};

export default VoiceLearningDashboard;
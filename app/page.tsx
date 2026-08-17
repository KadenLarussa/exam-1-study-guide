"use client";

import { useMemo, useState } from "react";
import { allQuestions, chapterNames, drugCards, Question, studyTerms } from "./studyData";

type View = "setup" | "quiz" | "glossary" | "drugs";
type Weights = { pharm: number; research: number; foundation: number };

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const effectiveWeights = (weights: Weights) => {
  const total = weights.pharm + weights.research + weights.foundation || 1;
  return {
    pharm: Math.round((weights.pharm / total) * 100),
    research: Math.round((weights.research / total) * 100),
    foundation: Math.round((weights.foundation / total) * 100),
  };
};

const buildQuiz = (count: number, weights: Weights) => {
  const total = weights.pharm + weights.research + weights.foundation || 1;
  const requested = {
    pharm: Math.round(count * weights.pharm / total),
    research: Math.round(count * weights.research / total),
    foundation: 0,
  };
  requested.foundation = count - requested.pharm - requested.research;

  const pools = {
    pharm: shuffle(allQuestions.filter((q) => q.chapter === "20")),
    research: shuffle(allQuestions.filter((q) => q.chapter === "5")),
    foundation: shuffle(allQuestions.filter((q) => ["1", "2", "3", "4"].includes(q.chapter))),
  };

  const chosen = [
    ...pools.pharm.slice(0, requested.pharm),
    ...pools.research.slice(0, requested.research),
    ...pools.foundation.slice(0, requested.foundation),
  ];
  const used = new Set(chosen.map((q) => q.id));
  if (chosen.length < count) {
    chosen.push(...shuffle(allQuestions.filter((q) => !used.has(q.id))).slice(0, count - chosen.length));
  }
  return shuffle(chosen).map((q) => ({ ...q, options: shuffle(q.options) }));
};

export default function Home() {
  const [view, setView] = useState<View>("setup");
  const [questionCount, setQuestionCount] = useState(50);
  const [weights, setWeights] = useState<Weights>({ pharm: 50, research: 30, foundation: 20 });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [answers, setAnswers] = useState<{ question: Question; selected: string; correct: boolean }[]>([]);
  const [search, setSearch] = useState("");
  const [chapterFilter, setChapterFilter] = useState("all");
  const effective = effectiveWeights(weights);

  const startQuiz = () => {
    setQuestions(buildQuiz(questionCount, weights));
    setCurrent(0);
    setSelected(null);
    setHintOpen(false);
    setAnswers([]);
    setView("quiz");
  };

  const chooseAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[current];
    setAnswers((old) => [...old, { question: q, selected: option, correct: option === q.answer }]);
  };

  const nextQuestion = () => {
    setCurrent((old) => old + 1);
    setSelected(null);
    setHintOpen(false);
  };

  const filteredTerms = useMemo(() => {
    const query = search.toLowerCase().trim();
    return studyTerms.filter((item) =>
      (chapterFilter === "all" || item.chapter === chapterFilter) &&
      (!query || item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query))
    );
  }, [search, chapterFilter]);

  const filteredDrugs = useMemo(() => {
    const query = search.toLowerCase().trim();
    return drugCards.filter((drug) => !query || Object.values(drug).some((value) => value.toLowerCase().includes(query)));
  }, [search]);

  const resetTo = (nextView: View) => {
    setView(nextView);
    setSearch("");
    setChapterFilter("all");
  };

  const score = answers.filter((answer) => answer.correct).length;
  const finished = view === "quiz" && questions.length > 0 && current >= questions.length;

  return (
    <main>
      <header className="header">
        <button className="site-title" onClick={() => resetTo("setup")}>Paramedic Exam 1 Practice</button>
        <nav>
          <button onClick={() => resetTo("setup")} className={view === "setup" ? "active" : ""}>New test</button>
          <button onClick={() => resetTo("glossary")} className={view === "glossary" ? "active" : ""}>Key terms</button>
          <button onClick={() => resetTo("drugs")} className={view === "drugs" ? "active" : ""}>Medication sheet</button>
        </nav>
      </header>

      {view === "setup" && (
        <div className="container setup-page">
          <h1>Exam 1 practice test</h1>
          <p className="intro">Questions from Chapters 1-5 and 20, the 2011 study guide, and Medication Sheet 1. Every test reshuffles the questions and answer order.</p>

          <section className="card settings-card">
            <h2>Make a test</h2>
            <div className="setting-block">
              <div className="setting-label"><label htmlFor="question-count">Number of questions</label><b>{questionCount}</b></div>
              <input id="question-count" type="range" min="10" max="100" step="5" value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} />
              <div className="quick-counts">
                {[20, 40, 50, 75, 100].map((count) => <button key={count} onClick={() => setQuestionCount(count)} className={questionCount === count ? "selected" : ""}>{count}</button>)}
              </div>
            </div>

            <div className="setting-block">
              <div className="setting-label"><span>Question weights</span><small>effective: {effective.pharm}% / {effective.research}% / {effective.foundation}%</small></div>
              <WeightSlider label="Chapter 20 - Pharmacology" value={weights.pharm} onChange={(value) => setWeights({ ...weights, pharm: value })} />
              <WeightSlider label="Chapter 5 - Research" value={weights.research} onChange={(value) => setWeights({ ...weights, research: value })} />
              <WeightSlider label="Chapters 1-4" value={weights.foundation} onChange={(value) => setWeights({ ...weights, foundation: value })} />
              <p className="help-text">The sliders are relative. They do not have to add up to 100.</p>
            </div>

            <button className="primary-button" onClick={startQuiz}>Start {questionCount}-question test</button>
          </section>

          <section className="plain-section">
            <h2>What is included</h2>
            <div className="stats-row">
              <div><b>{allQuestions.length}</b><span>base questions</span></div>
              <div><b>{studyTerms.length}</b><span>key terms</span></div>
              <div><b>{drugCards.length}</b><span>medications</span></div>
              <div><b>6</b><span>chapters</span></div>
            </div>
            <ul>
              <li>Hint available on every question</li>
              <li>Instant answer and explanation after each response</li>
              <li>Medication names, brands, classes, actions, uses, contraindications, doses, routes, and adverse effects</li>
              <li>Roles of EMS practitioners, ambulance types, medication routes, and every listed chapter term</li>
            </ul>
            <p className="note">Dose questions follow the provided 2021 course medication sheet. Actual EMS protocols can differ by service and medical director.</p>
          </section>
        </div>
      )}

      {view === "quiz" && !finished && questions[current] && (
        <div className="container quiz-page">
          <div className="quiz-topline">
            <button className="text-button" onClick={() => resetTo("setup")}>← Quit test</button>
            <span>Score: {score}/{answers.length}</span>
          </div>
          <div className="progress"><span style={{ width: `${(current / questions.length) * 100}%` }} /></div>
          <section className="card question-card">
            <div className="question-info">
              <span>Question {current + 1} of {questions.length}</span>
              <span>Chapter {questions[current].chapter}: {chapterNames[questions[current].chapter]}</span>
            </div>
            <h2>{questions[current].prompt}</h2>
            <div className="options">
              {questions[current].options.map((option, index) => {
                const answered = Boolean(selected);
                const isCorrect = answered && option === questions[current].answer;
                const isWrong = answered && option === selected && option !== questions[current].answer;
                return (
                  <button key={option} onClick={() => chooseAnswer(option)} disabled={answered} className={`${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}>
                    <span>{index + 1}</span>{option}
                  </button>
                );
              })}
            </div>

            {!selected && (
              <div className="question-actions">
                <button className="secondary-button" onClick={() => setHintOpen(!hintOpen)}>{hintOpen ? "Hide hint" : "Show hint"}</button>
                {hintOpen && <p className="hint"><b>Hint:</b> {questions[current].hint}</p>}
              </div>
            )}

            {selected && (
              <div className={`feedback ${selected === questions[current].answer ? "right-feedback" : "wrong-feedback"}`}>
                <h3>{selected === questions[current].answer ? "Correct" : "Not quite"}</h3>
                {selected !== questions[current].answer && <p><b>Correct answer:</b> {questions[current].answer}</p>}
                <p>{questions[current].explanation}</p>
                <button className="primary-button" onClick={nextQuestion}>{current === questions.length - 1 ? "See results" : "Next question"}</button>
              </div>
            )}
          </section>
        </div>
      )}

      {finished && (
        <div className="container results-page">
          <section className="card results-card">
            <h1>Finished</h1>
            <div className="big-score">{Math.round((score / questions.length) * 100)}%</div>
            <p>You got {score} out of {questions.length} correct.</p>
            <div className="result-buttons">
              <button className="primary-button" onClick={startQuiz}>Retake with new questions</button>
              <button className="secondary-button" onClick={() => resetTo("setup")}>Change test settings</button>
            </div>
          </section>
          {answers.some((answer) => !answer.correct) && (
            <section className="plain-section review-section">
              <h2>Questions to review</h2>
              {answers.filter((answer) => !answer.correct).map((answer, index) => (
                <details key={`${answer.question.id}-${index}`}>
                  <summary>{answer.question.prompt}</summary>
                  <p><b>Your answer:</b> {answer.selected}</p>
                  <p><b>Correct answer:</b> {answer.question.answer}</p>
                  <p>{answer.question.explanation}</p>
                </details>
              ))}
            </section>
          )}
        </div>
      )}

      {view === "glossary" && (
        <div className="container reference-page">
          <h1>Key terms</h1>
          <p className="intro">All {studyTerms.length} listed terms. Search by term or definition.</p>
          <div className="filters">
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search key terms..." />
            <select value={chapterFilter} onChange={(event) => setChapterFilter(event.target.value)}>
              <option value="all">All chapters</option>
              {["1","2","3","4","5","20"].map((chapter) => <option key={chapter} value={chapter}>Chapter {chapter}</option>)}
            </select>
          </div>
          <p className="result-count">Showing {filteredTerms.length} terms</p>
          <div className="term-list">
            {filteredTerms.map((item) => (
              <article key={`${item.chapter}-${item.term}`}>
                <div><b>{item.term}</b><span>Ch. {item.chapter}</span></div>
                <p>{item.definition}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {view === "drugs" && (
        <div className="container reference-page">
          <h1>Medication Sheet 1</h1>
          <p className="intro">Opioids, nonopioids, antagonists, sedatives, and related agents from the attached course sheet.</p>
          <div className="filters"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search medications..." /></div>
          <p className="note">For studying only. The values below reproduce the course sheet and are not a substitute for your current local protocol.</p>
          <div className="drug-list">
            {filteredDrugs.map((drug) => (
              <details key={drug.generic}>
                <summary><b>{drug.generic}</b><span>{drug.brand} · {drug.classification}</span></summary>
                <div className="drug-grid">
                  <DrugField label="Action" value={drug.action} />
                  <DrugField label="Indications" value={drug.indications} />
                  <DrugField label="Contraindications" value={drug.contraindications} />
                  <DrugField label="Dose" value={drug.dose} />
                  <DrugField label="Routes" value={drug.routes} />
                  <DrugField label="Adverse effects" value={drug.adverse} />
                  <DrugField label="Course note" value={drug.note} />
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function WeightSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="weight-slider">
      <label><span>{label}</span><b>{value}</b></label>
      <input type="range" min="0" max="100" step="5" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  );
}

function DrugField({ label, value }: { label: string; value: string }) {
  return <div><b>{label}</b><p>{value}</p></div>;
}


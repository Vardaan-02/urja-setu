import { useState } from "react";
export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === "") {
      setAnswer("Please ask a valid question!");
      return;
    }
    setAnswer(`That's an interesting question`);
    setQuestion(""); 
  };

  return (
    <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 ">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight">
              Ask Urja AI
            </h2>
            <p className="mt-4 text-lg">
              Urja AI: Igniting insights, powering possibilities, and always
              here to help!
            </p>
            <form onSubmit={handleQuestionSubmit} className="mt-6 flex gap-x-4">
              <label htmlFor="ask-question" className="sr-only">
                Ask a question
              </label>
              <input
                id="ask-question"
                name="question"
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-black"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-[#94C973] px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#2F5233] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5233]"
              >
                Get Answer
              </button>
            </form>
          </div>
          {answer && (
            <div className="flex items-center justify-center mt-6 lg:mt-0">
              <div className="border border-black rounded-md p-4 w-full max-w-md">
                <p className="text-gray-800">{answer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#B1D8B7] to-[#94C973] opacity-30"
        />
      </div>
    </div>
  );
}

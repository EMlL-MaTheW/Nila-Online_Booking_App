// Question section
import { useState } from "react";

const faqs = [
  "What is online counselling, and how does it work?",
  "What types of issues can I seek help for through online counselling?",
  "What should I expect during an online counselling session?",
  "How do I schedule an appointment?",
  "When can I understand it's time to see a therapist?",
  "How can I access online counselling in Kerala?",
  "Is online counselling in Kerala available worldwide?"
];

const Question: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="section-questionnaire" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12">
        Any Questions?
      </h2>
      
      <div className="space-y-4">
        {faqs.map((question, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-4 last:border-b-0 hover:bg-gray-50 rounded-lg p-2 -mx-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between py-4 px-6 text-left group"
            >
              <span className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                {question}
              </span>
              <i 
                className={`fa-solid fa-chevron-down text-gray-500 text-xl group-hover:text-green-600 transition-all ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Question;

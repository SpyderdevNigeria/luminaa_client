import { useState } from "react";

const helpTopics = [
  {
    category: "Appointments",
    items: [
      {
        question: "How do I book an appointment?",
        answer: "Go to the 'Appointments' tab, select a doctor and time slot, and click 'Book'.",
      },
      {
        question: "Can I cancel a scheduled appointment?",
        answer: "Yes, go to your 'My Appointments' page and click the 'Cancel' button next to the appointment.",
      },
    ],
  },
  {
    category: "Medical Records",
    items: [
      {
        question: "How do I view my diagnosis report?",
        answer: "Navigate to 'Medical History' under your profile to view all past reports.",
      },
      {
        question: "Can I download my reports?",
        answer: "Yes, in the diagnosis view modal, click 'Download' to get a PDF copy.",
      },
    ],
  },
  {
    category: "Profile",
    items: [
      {
        question: "How do I update my personal details?",
        answer: "Go to 'Profile Settings', update your information, and click 'Save Changes'.",
      },
    ],
  },
];

function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = helpTopics.map((topic) => ({
    ...topic,
    items: topic.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((topic) => topic.items.length > 0);

  return (
    <div className="p-6 max-w-4xl mx-auto container-bd">
      <h2 className="text-2xl font-semibold mb-4">Help Center</h2>

      <input
        type="text"
        placeholder="Search for help..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-primary"
      />

      <div className="space-y-6">
        {filteredTopics.length === 0 && (
          <p className="text-gray-500">No results found for "{searchTerm}"</p>
        )}

        {filteredTopics.map((topic) => (
          <div key={topic.category}>
            <h3 className="text-lg font-bold mb-2">{topic.category}</h3>
            <ul className="space-y-3 border border-gray-300 rounded-md p-4 bg-white  shadow-sm">
              {topic.items.map((item, index) => (
                <li key={index}>
                  <p className="font-medium">{item.question}</p>
                  <p className="text-sm text-gray-700">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenter;

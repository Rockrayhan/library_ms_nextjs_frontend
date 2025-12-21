
const FaqSection = () => {
  const faqs = [
    {
      q: "How does the subscription system work?",
      a: "Users can choose a subscription plan based on their reading needs. Each plan determines the number of books they can borrow at a time, borrowing duration, and access to premium library features.",
    },
    {
      q: "What is my borrow limit?",
      a: "Your borrow limit depends on the subscription package you purchased. For example, a Basic plan will allow 3 active borrows, while the Premium plan may allow up to 5.",
    },
    {
      q: "How do I upgrade or change my subscription?",
      a: "You can upgrade directly from your dashboard. Once upgraded, your new borrowing limit and features will apply immediately after the payment is processed.",
    },
    {
      q: "What happens if I return a book late?",
      a: "Late returns may temporarily reduce your borrowing limit until the overdue book is returned. Some plans include a 'grace period' that offers extra flexibility.",
    },
    {
      q: "Do I get access to my borrow history?",
      a: "Yes. Every user can view their full borrow history, including past books, due dates, return status, and subscription-based borrowing stats.",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6 text-center">
      
        Frequently Asked Questions
      </h2>

      <div className="space-y-2">
        {faqs.map((item, idx) => (
          <details
            key={idx}
            className="group [&_summary::-webkit-details-marker]:hidden border border-gray-200 rounded-lg bg-gray-800"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 font-medium text-gray-100">
              <span>{item.q}</span>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="p-4">
              <p className="text-gray-200">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;

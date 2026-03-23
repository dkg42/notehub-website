import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is NoteHub?",
    answer:
      "NoteHub is a Chrome extension that enhances Google NotebookLM with additional capabilities — including exporting chats, sources, and artifacts, saving and reusing prompts, a full dashboard for notebook management, audio summaries, and a central hub for all your AI conversations across ChatGPT, Claude, Gemini, and more.",
  },
  {
    question: "Does NoteHub work with the free version of NotebookLM?",
    answer:
      "Yes! NoteHub works seamlessly with all versions of NotebookLM, including the free tier. You don't need a NotebookLM Plus subscription to use NoteHub's features.",
  },
  {
    question: "What AI chat platforms does NoteHub support?",
    answer:
      "NoteHub currently supports ChatGPT, Claude (Anthropic), and Google Gemini as chat hub integrations. We're actively working on adding more platforms including Perplexity, Mistral, and others. Premium plans unlock all integrations.",
  },
  {
    question: "What formats can I export my chats and sources in?",
    answer:
      "NoteHub supports exporting to Markdown, plain text, and PDF. Artifacts and sources can also be exported as structured data (JSON/CSV) for further processing. More formats are on the roadmap.",
  },
  {
    question: "Is my data stored on your servers?",
    answer:
      "NoteHub prioritizes your privacy. By default, your prompts and settings are stored locally in your browser. Cloud sync (for accessing your data across devices) is an optional Pro feature. We never sell your data or use your notebook contents for training AI models.",
  },
  {
    question: "Can I use NoteHub for free forever?",
    answer:
      "Absolutely. The Free plan is genuinely free with no time limit. It includes core features like basic exports (up to 10/month), 15 saved prompts, dashboard access, and one AI chat integration. You only need to upgrade if you want unlimited usage or advanced features.",
  },
  {
    question: "What's the difference between monthly and yearly pricing?",
    answer:
      "The yearly plan gives you all Pro features at roughly 30% less than paying month-to-month — effectively getting 2 months free. You're billed once a year and can cancel anytime before renewal.",
  },
  {
    question: "What does the Lifetime plan include?",
    answer:
      "The Lifetime plan is a one-time payment that gives you access to all current and future Pro features forever — no recurring charges. It also includes founding member status, early beta access to new features, and lifetime priority support.",
  },
  {
    question: "How do I install NoteHub?",
    answer:
      "Install NoteHub from the Chrome Web Store with one click. After installation, navigate to NotebookLM and you'll see the NoteHub panel appear automatically. No account is required to start using the free features.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes. You can cancel your Pro subscription at any time from your account settings. You'll retain Pro access until the end of your current billing period, and then automatically move to the Free plan — no questions asked.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="ambient-blob w-[500px] h-[500px] -top-32 -left-32 bg-violet-600/8" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Frequently asked{" "}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Reach out via our{" "}
            <a
              href="mailto:support@notehub.app"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-150"
            >
              support email
            </a>
            .
          </p>
        </div>

        {/* Accordion */}
        <Accordion multiple={false} className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={i}
              className="glass-card border border-white/[0.07] rounded-xl px-6 aria-expanded:border-blue-500/25 aria-expanded:bg-blue-600/5 transition-colors duration-200"
            >
              <AccordionTrigger className="text-left text-base font-medium text-white hover:text-blue-300 hover:no-underline py-5 transition-colors duration-150 cursor-pointer">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

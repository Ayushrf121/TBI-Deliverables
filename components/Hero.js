import Card from "./Card";

const FEATURES = [
  {
    title: "Idea Definition",
    description:
      "This is to make the understanding of what actually the developer wants to deliver.",
  },
  {
    title: "Problem Submission",
    description:
      "Once the whole project gets completed, students can submit their work here.",
  },
  {
    title: "UI/UX Prototyping",
    description:
      "Focusing on user-centered design principles to architect intuitive, clean, and highly responsive digital interfaces.",
  },
  {
    title: "Full-Stack Integration",
    description:
      "Connecting modern frontend skeletons with robust backend runtime architectures and relational databases.",
  },
  {
    title: "Version Control & CI/CD",
    description:
      "Maintaining clean repository health with strictly prefixed commits and automated deployment pipelines.",
  },
  {
    title: "PoC Review & Evaluation",
    description:
      "Demonstrating operational milestones to Proof of Concept evaluators for weekly progress checks.",
  },
];

export default function Hero() {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-16 px-6 text-center border-b border-slate-200 dark:border-slate-800 transition-colors">
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        TBI SIP-2026
      </h1>
      <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
        This program is initialized to make students fully AI-assisted programmers.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {FEATURES.map((feature) => (
          <Card key={feature.title} title={feature.title} description={feature.description} />
        ))}
      </div>
    </section>
  );
}

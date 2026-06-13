import Card from "./Card";

export default function Hero() {
    return (
        <section className="w-full bg-gray-50 py-16 px-6 text-center border-b border-gray-200">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                    TBI SIP-2026
                </h1>
                <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                    This program is initialized to make the student fully AI assisted programmers.
                </p>
            <div className="max-w-2xl mx-auto grid grid-cols-2 gap-2">
                <Card
                    title="Idea Definition"
                    description="This is to make the understamding of what actually the developer wants to deliver."
                />
                <Card
                    title="Problem Submission"
                    description="Once the whole project get completed student can submit their here."
                />
                <Card
                    title="UI/UX Prototyping"
                    description="Focusing on user-centered design principles to architect intuitive, clean, and highly responsive digital interfaces."
                />

                <Card
                    title="Full-Stack Integration"
                    description="Connecting modern frontend skeletons with robust backend runtime architectures and relational databases."
                />

                <Card
                    title="Version Control & CI/CD"
                    description="Maintaining clean repository health with strictly prefixed commits and automated deployment pipelines."
                />

                <Card
                    title="PoC Review & Evaluation"
                    description="Demonstrating operational milestones to Proof of Concept evaluators for weekly progress checks."
                />
            </div>
        </section>
    );
}
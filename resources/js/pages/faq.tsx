import { Head } from '@inertiajs/react';
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: '/faq',
    },
];

interface Faq {
    id: number;
    question: string;
    answer: string;
    order: number;
}

interface FaqCategory {
    id: number;
    name: string;
    order: number;
    faqs: Faq[];
}

export default function FaqIndex({
    categories,
}: {
    categories: FaqCategory[];
}) {
    const totalQuestions = categories.reduce((acc, cat) => acc + cat.faqs.length, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Frequently Asked Questions" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-10 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/20 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="relative">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
                            <HelpCircle className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white">
                            Frequently Asked Questions
                        </h1>
                        <p className="mt-2 max-w-xl text-lg text-zinc-400">
                            Find answers to common questions about Pitstop and how to get the most out of the community.
                        </p>
                        {totalQuestions > 0 && (
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-2 text-sm text-zinc-400">
                                <MessageCircleQuestion className="h-4 w-4 text-amber-500" />
                                {totalQuestions} questions answered
                            </div>
                        )}
                    </div>
                </div>

                {categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
                        <HelpCircle className="mb-4 h-16 w-16 text-zinc-600" />
                        <p className="text-xl font-medium text-zinc-400">
                            No FAQs available yet
                        </p>
                        <p className="mt-2 text-zinc-500">
                            Check back soon for answers to common questions!
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
                            >
                                {/* Category Header */}
                                <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                            index % 3 === 0 ? 'bg-red-500/20 text-red-400' :
                                            index % 3 === 1 ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                            <span className="text-sm font-bold">{category.faqs.length}</span>
                                        </div>
                                        <h2 className="text-lg font-bold text-white">
                                            {category.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* Questions */}
                                <div className="p-4">
                                    {category.faqs.length === 0 ? (
                                        <p className="py-4 text-center text-zinc-500">
                                            No questions in this category yet.
                                        </p>
                                    ) : (
                                        <Accordion type="single" collapsible className="w-full">
                                            {category.faqs.map((faq) => (
                                                <AccordionItem
                                                    key={faq.id}
                                                    value={`faq-${faq.id}`}
                                                    className="border-b border-zinc-800 last:border-0"
                                                >
                                                    <AccordionTrigger className="py-4 text-left text-white hover:text-red-400 hover:no-underline [&[data-state=open]]:text-red-400">
                                                        <span className="pr-4">{faq.question}</span>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="rounded-lg bg-zinc-800/50 p-4 text-zinc-300">
                                                            <p className="whitespace-pre-wrap leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

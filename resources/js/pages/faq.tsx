import { Head } from '@inertiajs/react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Frequently Asked Questions" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Find answers to common questions about our platform
                    </p>
                </div>

                {categories.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-lg text-muted-foreground">
                                No FAQs available yet. Check back soon!
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {categories.map((category) => (
                            <Card key={category.id}>
                                <CardHeader>
                                    <CardTitle>{category.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {category.faqs.length === 0 ? (
                                        <p className="text-muted-foreground">
                                            No questions in this category yet.
                                        </p>
                                    ) : (
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                        >
                                            {category.faqs.map((faq) => (
                                                <AccordionItem
                                                    key={faq.id}
                                                    value={`faq-${faq.id}`}
                                                >
                                                    <AccordionTrigger className="text-left">
                                                        {faq.question}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                                                            <p className="whitespace-pre-wrap">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

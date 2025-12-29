import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'FAQs',
        href: '/admin/faqs',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface FaqCategory {
    id: number;
    name: string;
}

interface Faq {
    id: number;
    faq_category_id: number;
    question: string;
    answer: string;
    order: number;
}

export default function AdminFaqsEdit({
    faq,
    categories,
}: {
    faq: Faq;
    categories: FaqCategory[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        faq_category_id: faq.faq_category_id.toString(),
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/faqs/${faq.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit FAQ" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <a href="/admin/faqs">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit FAQ
                        </h1>
                        <p className="text-muted-foreground">
                            Update the question and answer
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>FAQ Details</CardTitle>
                        <CardDescription>
                            Edit the question and answer for this FAQ
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="faq_category_id">
                                    Category *
                                </Label>
                                <Select
                                    value={data.faq_category_id}
                                    onValueChange={(value) =>
                                        setData('faq_category_id', value)
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.faq_category_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="question">Question *</Label>
                                <Input
                                    id="question"
                                    value={data.question}
                                    onChange={(e) =>
                                        setData('question', e.target.value)
                                    }
                                    required
                                    placeholder="e.g., How do I reset my password?"
                                />
                                <InputError message={errors.question} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="answer">Answer *</Label>
                                <Textarea
                                    id="answer"
                                    value={data.answer}
                                    onChange={(e) =>
                                        setData('answer', e.target.value)
                                    }
                                    required
                                    rows={6}
                                    placeholder="Provide a detailed answer to the question..."
                                />
                                <InputError message={errors.answer} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    min="0"
                                    value={data.order}
                                    onChange={(e) =>
                                        setData(
                                            'order',
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    placeholder="0"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Lower numbers appear first within the
                                    category
                                </p>
                                <InputError message={errors.order} />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    Update FAQ
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <a href="/admin/faqs">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

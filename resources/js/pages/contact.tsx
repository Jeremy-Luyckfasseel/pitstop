import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { type BreadcrumbItem, type SharedData } from '@/types';
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
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contact',
        href: '/contact',
    },
];

interface PageProps extends SharedData {
    flash: {
        success?: string;
    };
}

export default function Contact() {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Us" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Have a question? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {flash?.success && (
                            <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertTitle className="text-green-800 dark:text-green-200">
                                    Message Sent!
                                </AlertTitle>
                                <AlertDescription className="text-green-700 dark:text-green-300">
                                    {flash.success}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a message</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back
                                    to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="Your name"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                Email *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="your@email.com"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="subject">
                                            Subject *
                                        </Label>
                                        <Input
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    'subject',
                                                    e.target.value
                                                )
                                            }
                                            required
                                            placeholder="What is this regarding?"
                                        />
                                        <InputError message={errors.subject} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="message">
                                            Message *
                                        </Label>
                                        <Textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value
                                                )
                                            }
                                            required
                                            rows={6}
                                            placeholder="Tell us how we can help..."
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        {processing
                                            ? 'Sending...'
                                            : 'Send Message'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a
                                            href="mailto:info@pitstop.com"
                                            className="text-muted-foreground hover:underline"
                                        >
                                            info@pitstop.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-muted-foreground">
                                            +32 2 123 45 67
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Address</p>
                                        <p className="text-muted-foreground">
                                            Nijverheidskaai 170
                                            <br />
                                            1070 Anderlecht
                                            <br />
                                            Belgium
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Office Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="text-muted-foreground">
                                            9:00 - 18:00
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="text-muted-foreground">
                                            10:00 - 14:00
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="text-muted-foreground">
                                            Closed
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

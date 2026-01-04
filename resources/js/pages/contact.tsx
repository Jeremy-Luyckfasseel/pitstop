import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { type BreadcrumbItem, type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { CheckCircle, Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';

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

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-10 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-green-950/20 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
                    <div className="relative">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/20">
                            <MessageSquare className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white">
                            Get in Touch
                        </h1>
                        <p className="mt-2 max-w-xl text-lg text-zinc-400">
                            Have a question, suggestion, or just want to say hi? We'd love to hear from you!
                        </p>
                    </div>
                </div>

                {/* Success Message */}
                {flash?.success && (
                    <div className="mb-8 flex items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-green-400">Message Sent!</p>
                            <p className="text-sm text-green-300/80">{flash.success}</p>
                        </div>
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Contact Form - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-white">Send us a message</h2>
                                <p className="mt-1 text-zinc-400">We'll get back to you within 24 hours.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-zinc-300">Your Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Lewis Hamilton"
                                            className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            placeholder="lewis@racing.com"
                                            className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-zinc-300">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                        placeholder="What's this about?"
                                        className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20"
                                    />
                                    <InputError message={errors.subject} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-zinc-300">Message</Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        required
                                        rows={6}
                                        placeholder="Tell us what's on your mind..."
                                        className="resize-none border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20"
                                    />
                                    <InputError message={errors.message} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-green-600 font-semibold uppercase tracking-wide hover:bg-green-500 sm:w-auto"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {processing ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Details Card */}
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                                        <Mail className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Email</p>
                                        <a href="mailto:info@pitstop.com" className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                                            info@pitstop.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                        <Phone className="h-5 w-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Phone</p>
                                        <p className="text-sm text-zinc-400">+32 2 123 45 67</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                                        <MapPin className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Address</p>
                                        <p className="text-sm text-zinc-400">
                                            Nijverheidskaai 170<br />
                                            1070 Anderlecht<br />
                                            Belgium
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours Card */}
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                                    <Clock className="h-5 w-5 text-zinc-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Office Hours</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-300">Monday - Friday</span>
                                    <span className="font-mono text-green-400">9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-300">Saturday</span>
                                    <span className="font-mono text-amber-400">10:00 - 14:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-300">Sunday</span>
                                    <span className="font-mono text-red-400">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

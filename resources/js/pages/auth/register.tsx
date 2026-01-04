import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Join the Grid"
            description="Create your Pitstop account to join the community"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Lewis Hamilton"
                                    className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-red-500 focus:ring-red-500/20"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="username" className="text-zinc-300">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="username"
                                    name="username"
                                    placeholder="speedracer44"
                                    className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-red-500 focus:ring-red-500/20"
                                />
                                <p className="text-xs text-zinc-500">
                                    Letters, numbers, hyphens and underscores only.
                                </p>
                                <InputError message={errors.username} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-red-500 focus:ring-red-500/20"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-red-500 focus:ring-red-500/20"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-zinc-300">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="••••••••"
                                    className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-red-500 focus:ring-red-500/20"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-red-600 font-semibold uppercase tracking-wide hover:bg-red-500"
                                tabIndex={6}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create Account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-zinc-500">
                            Already have an account?{' '}
                            <TextLink 
                                href={login()} 
                                tabIndex={7}
                                className="text-red-400 hover:text-red-300"
                            >
                                Sign in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de perfil',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
    majors,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    majors?: { id: number, name: string }[];
}) {
    const { auth } = usePage<SharedData>().props;
    const [preview, setPreview] = useState<string | null>(null);
    const [major_id, setMajorId] = useState<string>(auth.user.major_id ? String(auth.user.major_id) : '');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
            
            // Assign file to the input element programmatically
            const input = document.getElementById('picture') as HTMLInputElement;
            if (input) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                input.files = dataTransfer.files;
                
                // Disparar evento change (requerido por el Form de inertia si escucha onchange del input nativo)
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Información de perfil</h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Actualiza tu nombre, número de control, correo electrónico y foto de perfil</p>
                    </div>

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-[-10px]"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-300"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-[-10px]"
                                >
                                    <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-4 shadow-sm dark:bg-green-900/50">
                                        <div className="flex">
                                            <div className="shrink-0">
                                                <svg className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                                    ¡Tus datos de perfil han sido actualizados correctamente!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Transition>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombre completo</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Nombre completo"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="control_number">Número de control</Label>

                                    <Input
                                        id="control_number"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\d{8}"
                                        maxLength={8}
                                        minLength={8}
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.control_number}
                                        name="control_number"
                                        required
                                        placeholder="Ej. 20320001"
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 8);
                                        }}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.control_number}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="major_id">Carrera</Label>
                                    <Select
                                        name="major_id"
                                        value={major_id ? String(major_id) : undefined}
                                        onValueChange={(value) => setMajorId(value)}
                                    >
                                        <SelectTrigger className="mt-1 w-full bg-background border-input focus:ring-ring">
                                            <SelectValue placeholder="Selecciona una carrera" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {majors?.map((m) => (
                                                <SelectItem key={m.id} value={String(m.id)}>
                                                    {m.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="major_id" value={major_id} />
                                    <InputError className="mt-2" message={errors.major_id as string} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="picture">Foto de perfil</Label>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        {(preview || auth.user.picture) && (
                                            <div className="shrink-0 flex justify-center">
                                                <img 
                                                    src={preview || `/storage/${auth.user.picture}`} 
                                                    alt="Foto de perfil actual" 
                                                    className="h-24 w-24 rounded-full object-cover border-4 border-gray-100 shadow-sm dark:border-gray-800"
                                                />
                                            </div>
                                        )}
                                        <div className="flex w-full items-center justify-center">
                                            <label
                                                htmlFor="picture"
                                                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={handleDrop}
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Haz clic para subir</span> o arrastra un archivo
                                                    </p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                                        PNG, JPG o WEBP (MAX. 5MB)
                                                    </p>
                                                </div>
                                                <Input
                                                    id="picture"
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                                    className="hidden"
                                                    name="picture"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <InputError className="mt-2" message={errors.picture} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Correo electrónico</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Guardar
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Guardado
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}

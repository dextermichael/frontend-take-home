"use client"
import React from 'react'
import { Button, Card, CardBody, CardHeader, Form, Input, Spinner } from '@heroui/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [errors, setErrors] = React.useState({});
    const [loading , setLoading] = React.useState(false);
    const router = useRouter();
    const onSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        if (!data.name) {
            setLoading(false);
            setErrors({ name: "Name is required" });
            return;
        }
        const result = await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            ...data,
        });
        if (result?.status == 200) {
            router.push("/dashboard");
        } else {
            setLoading(false);
            setErrors({
                name: "Invalid Name or email"
            })
        }
    };
    return (
        <div className='w-full min-h-screen flex items-center py-12 justify-center px-10'>
            <Card className='max-w-md w-full'>
                <CardHeader>
                    <h2 className='text-2xl font-bold  text-gray-900'>Login</h2>
                </CardHeader>
                <CardBody>
                    <Form
                        className="w-full  flex flex-col gap-3"
                        validationErrors={errors}
                        onSubmit={onSubmit}
                    >
                        <Input
                            isRequired
                            label="Name"
                            labelPlacement="outside"
                            name="name"
                            placeholder="Enter your name"
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            type='email'

                            placeholder="Enter your email"
                        />
                        <Button type="submit" className='w-full flex items-center gap-2' color='primary' disabled={loading}>
                            {loading && (
                                <Spinner color='white'/>
                            )}
                            Submit
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

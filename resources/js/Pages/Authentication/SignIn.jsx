import React from "react";
import LogoDark from "../../../../public/saturn_logo.png";
import Logo from "../../../../public/saturn_logo.png";
import BlankLayout from "../../Layouts/BlankLayout";
import InputError from '@/Components/InputError';
import Breadcrumb from "../../Components/Breadcrumbs/Breadcrumb";
import { Head, Link, useForm } from '@inertiajs/react';


export default function SignIn({ status, canResetPassword }){
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Breadcrumb pageName="Sign In" />

            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-17.5 px-26 text-center">
                            <Link className="mb-5.5 inline-block" href="/">
                                <img className="hidden" src={Logo} alt="Logo" />
                                <img
                                    className="dark:hidden"
                                    src={LogoDark}
                                    alt="Logo"
                                />
                            </Link>

                            <p className="2xl:px-20">
                                mhd ghaith alhalabe web developer.
                            </p>

                            <span className="mt-15 inline-block">
                                <svg
                                    width="350"
                                    height="350"
                                    viewBox="0 0 350 350"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Add your SVG paths here */}
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="w-full border-stroke xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <span className="mb-1.5 block font-medium">
                                start now
                            </span>
                            <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
                                Sign In to SATURN
                            </h2>

                            <form onSubmit={submit}>                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            type="email"
                                            autoComplete="username"
                                            isFocused={true}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />

                                        <span className="absolute right-4 top-4">
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.5">
                                                    {/* Add your SVG paths here */}
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />

                                        <span className="absolute right-4 top-4">
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.5">
                                                    {/* Add your SVG paths here */}
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <input
                                        type="submit"
                                        value="Sign In"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    />
                                </div>

                                

                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

SignIn.layout = (page) => <BlankLayout>{page}</BlankLayout>;


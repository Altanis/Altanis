import Link from "next/link";

export default function MissingPage()
{
    return (
        <div className="flex flex-col w-full justify-center">
            <h1 className="text-9xl font-bold text-center">404</h1>
            <h2 className="text-4xl font-medium text-center">Page Not Found</h2>
            <p className="text-xl font-light text-center">The page you&apos;re looking for might be elsewhere.</p>
        </div>
    );
};
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;

import Sidebar from "@/components/sidebar";
import "../app/globals.css"
import { Metadata } from "next";
import FlareCursor from '@/components/flare_cursor';
import { useEffect, useState } from 'react';

export const metadata: Metadata =
{
    title: 'Altanis\'s Portfolio',
    description: 'Altanis\'s Portfolio',
};

export default function App({ Component, props }: { Component: React.ElementType, props: any }) 
{
    useEffect(() => {
        document.querySelectorAll("*").forEach((element: any) => {
            element.style.webkitUserSelect = "none";
            element.style.mozUserSelect = "none";
            element.style.msUserSelect = "none";
            element.style.userSelect = "none";
        });
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='h-full'>
            {/* <FlareCursor /> */}
            <div className="flex h-full">
                <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <Component menuOpen={menuOpen} setMenuOpen={setMenuOpen} {...props} />
            </div>
        </div>
    );
}
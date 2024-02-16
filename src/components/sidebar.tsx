"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBolt, faCode, faHamburger, faHome, faInfoCircle, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import SplitType from "split-type";

const SECTIONS =
[
    {
        name: "Home",
        icon: faHome,
        normal:
        {
            color: "text-red-400"
        },
        hover:
        {
            color: "hover:text-red-400" 
        },
        path: "/"
    },
    {
        name: "About",
        icon: faInfoCircle,
        normal:
        {
            color: "text-blue-400"
        },
        hover:
        {
            color: "hover:text-blue-400"
        }
    },
    { 
        name: "Projects",
        icon: faCode,
        normal:
        {
            color: "text-green-400"
        },
        hover:
        {
            color: "hover:text-green-400" 
        }
    },
    // { 
    //     name: "Experience", 
    //     icon: faLayerGroup, 
    //     normal:
    //     {
    //         color: "text-yellow-400"
    //     },
    //     hover:
    //     {
    //         color: "hover:text-yellow-400"
    //     }
    // }
];

// menuBarOpen, setMenuBarOpen
export default function Sidebar({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: (open: boolean) => void })
{
    const [idx, setIndex] = useState(0);

    const scatter_targets = useRef<any>([]);
    const addScatterRef = (el: any) => {
        if (el && !scatter_targets.current.includes(el))
        {
            scatter_targets.current.push(el);
        }
    };
    
    useEffect(() => {
        scatter_targets.current.forEach((target: any) => {
            const split = new SplitType(target, { types: "lines,words,chars", lineClass: "split-line" });
            gsap.set(split.chars, { y: () => gsap.utils.random(-100, 100), x: () => gsap.utils.random(-100, 100) });
            gsap.to(split.chars, { duration: 3, y: 0, x: 0, stagger: 0.05, ease: "back(2)" });
        });
    }, [scatter_targets]);

    const border_targets = useRef<any>([]);
    const addBorderRef = (el: any) => {
        if (el && !border_targets.current.includes(el))
        {
            border_targets.current.push(el);
        }
    };

    useEffect(() => {
        border_targets.current.forEach((target: any) => {
            gsap.from(target, { duration: 2, height: 0, stagger: 0.05, ease: "expo.out" });
        });
    }, [border_targets]);
    useEffect(() =>
    {
        const path = window.location.pathname;
        const index = SECTIONS.findIndex(section => path == section.path || path.includes(section.name.toLowerCase()));
        setIndex(index);
    });

    const slideIn = useRef(null);
    useEffect(function()
    {
        if (slideIn.current)
        {
            gsap.from(slideIn.current, { duration: 0.5, x: -100, opacity: 0, ease: "expo.out" });
        }
    }, [slideIn]);

    useEffect(() => {
        if (menuOpen && slideIn.current)
        {
            gsap.from(slideIn.current, { duration: 0.5, x: -100, opacity: 0, ease: "expo.out" })
                .then(() => setTrueMenuOpen(true));
        }
    }, [menuOpen]);

    const [trueMenuOpen, setTrueMenuOpen] = useState(false);

    useEffect(() =>
    {
        if (!trueMenuOpen && slideIn.current)
        {
            gsap.to(slideIn.current, { duration: 0.5, x: -100, opacity: 0, ease: "expo.out" })
                .then(() => setMenuOpen(false));
        }
    }, [trueMenuOpen]);

    const ref = useRef<any[]>([]);
    const add_to_ref = (element: any) =>
    {
        if (element && !ref.current.includes(element))
        {
            ref.current.push(element);
        }
    }

    useEffect(() => {
        function handle_outside_click(e: any)
        {
            let y = true;
            ref.current.forEach((element: any) =>
            {
                if (element?.contains(e.target))
                {
                    y = false;
                }
            });

            if (y)
            {
                setTrueMenuOpen(false);
            }
        }

        window.addEventListener("mousedown", handle_outside_click);
        return () => window.removeEventListener("mousedown", handle_outside_click);
    }, [ref]);

    return (
        <div className="relative max-w-full flex">
          <div className="hidden large:block max-w-16 min-w-64 w-full" ref={add_to_ref}>
            <nav className="sticky border border-t-0 border-b-0 border-l-0 border-r-4 border-gray-500 block h-full w-full overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: "unset" }} ref={addBorderRef}>
              <div className="flex flex-col gap-3 p-3">
                <div className="flex flex-col">
                  <h1 className="text-lg font-black text-center">PORTFOLIO</h1>
                  <h2 className="text-sm font-light text-center">by Altanis</h2>
      
                  <div className="flex flex-col gap-6 mt-9 px-2">
                    {SECTIONS.map((section, index) => (
                      <Link key={index} className={`text-900 p-3.5 text-md rounded-lg hover:bg-[#3B3F4B]/30 max-w-full ${idx == index && "bg-[#3B3F4B]/80"} ${idx == index ? section.normal.color : section.hover.color}`} href={section.path || `/${section.name.toLowerCase()}`} shallow={true} ref={addScatterRef}>
                        <FontAwesomeIcon icon={section.icon} className="mr-4" />
                        {section.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
            <div className={`large:hidden ${menuOpen ? "w-full" : "w-16"} text-center ${!menuOpen && "bg-gray-900"}`} ref={add_to_ref}>
                {menuOpen ?
                    (
                        <nav className="sticky block h-full w-full overflow-x-hidden overflow-y-auto border border-t-0 border-b-0 border-l-0 border-r-4 border-gray-500" style={{ scrollbarWidth: "unset" }} ref={slideIn}>
                            <div className="flex flex-col gap-3 p-3">
                            <div className="flex flex-col">
                                <h1 className="text-lg font-black text-center">PORTFOLIO</h1>
                                <h2 className="text-sm font-light text-center">by Altanis</h2>
                    
                                <div className="flex flex-col gap-6 mt-9 px-2">
                                {SECTIONS.map((section, index) => (
                                    <Link 
                                        key={index} 
                                        className={`text-900 p-3.5 text-md rounded-lg hover:bg-[#3B3F4B]/30 max-w-full ${idx == index && "bg-[#3B3F4B]/80"} ${idx == index ? section.normal.color : section.hover.color}`} href={section.path || `/${section.name.toLowerCase()}`} 
                                        shallow={true} 
                                        ref={addScatterRef}
                                    >
                                        <FontAwesomeIcon icon={section.icon} className="mr-4" />
                                        {section.name}
                                    </Link>
                                ))}
                                </div>
                            </div>
                            </div>
                        </nav>
                    ) :
                    (
                        <FontAwesomeIcon
                            icon={faBars}
                            className="cursor-pointer text-4xl text-white border border-white border-opacity-40 p-2 w-6 h-6 bg-transparent border-none cursor-pointer padding-0"
                            onClick={() => setMenuOpen(true)}
                        />
                    )
                }
            </div>
        </div>
      );      
}
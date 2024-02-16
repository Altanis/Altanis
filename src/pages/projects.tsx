import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

enum ProjectStatus
{
    Completed = "Completed",
    InProgress = "In Progress"
}

enum ProjectVisibility
{
    Public = "Public",
    Private = "Private"
}

enum Languages
{
    JavaScript,
    TypeScript,
    React,
    C,
    Cpp,
    Rust,
    Java,
    Python,
    Go
}

const PROJECTS = 
[
    {
        name: "Polyfight.io",
        link: "",
        status: ProjectStatus.InProgress,
        visibility: ProjectVisibility.Private,
        description: "A 2D MMO game incorporating an FFA, Teams, and ELO-based 1v1 system.",
        stack: [Languages.Rust, Languages.TypeScript]
    },
    {
        name: "netc",
        link: "https://github.com/Altanis/netc",
        status: ProjectStatus.Completed,
        visibility: ProjectVisibility.Public,
        description: "A POSIX compliant networking library for TCP, UDP, HTTP, and WS sockets. Written in C.",
        stack: [Languages.C]
    },
    {
        name: "LILOTA",
        link: "https://github.com/COMPAS-Lab",
        status: ProjectStatus.InProgress,
        visibility: ProjectVisibility.Private,
        description: "A high-level programming language intended for ease of connectivity in embedded systems.",
        stack: [Languages.C]
    },
    {
        name: "Yabladärgh'",
        link: "",
        status: ProjectStatus.InProgress,
        visibility: ProjectVisibility.Private,
        description: "A high-level compiled toy language exhibiting functionality similar to JavaScript.",
        stack: [Languages.C]
    },
    {
        name: "Kinetics.ts",
        link: "https://kinetics.vercel.app",
        status: ProjectStatus.Completed,
        visibility: ProjectVisibility.Public,
        description: "A blazingly fast, simple 2D physics engine for JavaScript and TypeScript, for both frontend and backend applications.",
        stack: [Languages.TypeScript]
    },
    {
        name: "Fluid Forma",
        link: "https://github.com/Altanis/fluid-forma",
        status: ProjectStatus.Completed,
        visibility: ProjectVisibility.Public,
        description: "A simple particle-based fluid and jelly simulator rendered using Canvas2D. Written in 4 hours.",
        stack: [Languages.TypeScript]
    }
];

const border_colors = ["border-red-600", "border-green-400", "border-orange-400", "border-cyan-400", "border-violet-400", "border-rose-500"];
const text_colors = ["text-red-600", "text-green-400", "text-orange-400", "text-cyan-400", "text-violet-400", "text-rose-500"];
const hover_colors = ["hover:bg-red-600/40", "hover:bg-green-400/40", "hover:bg-orange-400/40", "hover:bg-cyan-400/40", "hover:bg-violet-400/40", "hover:bg-rose-500/40"];
const shadow_colors = ["hover:shadow-red-600/40", "hover:shadow-green-400/40", "hover:shadow-orange-400/40", "hover:shadow-cyan-400/40", "hover:shadow-violet-400/40", "hover:shadow-rose-500/40"];

const LANGUAGES = [
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "bg-yellow-300",
        shadow_color: "shadow-[0_0_7px_#EFDB4F,inset_0_0_7px_#EFDB4F,0_0_7px_#EFDB4F,0_0_7px_#EFDB4F,0_0_7px_#EFDB4F]",
        width: "w-[100%]"
    },
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "bg-blue-400",
        shadow_color: "shadow-[0_0_7px_#08f,inset_0_0_7px_#08f,0_0_7px_#08f,0_0_7px_#08f,0_0_7px_#08f]",
        width: "w-[100%]"
    },
    {
        // react
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "bg-cyan-400",
        shadow_color: "shadow-[0_0_7px_#08f,inset_0_0_7px_#08f,0_0_7px_#08f,0_0_7px_#08f,0_0_7px_#08f]",
        width: "w-[95%]"
    },
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        color: "bg-blue-400",
        shadow_color: "shadow-[0_0_7px_#08f,inset_0_0_7px_#08f,0_0_7px_#08f,0_0_7px_#08f,0_0_7px_#08f]",
        width: "w-[90%]"
    },
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        color: "bg-[#FF6283]",
        shadow_color: "shadow-[0_0_7px_#D26283,inset_0_0_7px_#D26283,0_0_7px_#D26283,0_0_7px_#D26283,0_0_7px_#D26283]",
        width: "w-[80%]"
    },
    {
        image: "/rust.svg",
        color: "bg-orange-400",
        shadow_color: "shadow-[0_0_7px_#f60,inset_0_0_7px_#f60,0_0_7px_#f60,0_0_7px_#f60,0_0_7px_#f60]",
        width: "w-[85%]"
    },
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        color: "bg-red-500",
        shadow_color: "shadow-[0_0_7px_#f00,inset_0_0_7px_#f00,0_0_7px_#f00,0_0_7px_#f00,0_0_7px_#f00]",
        width: "w-[75%]"
    },
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        color: "bg-[#4B8BBE]",
        shadow_color: "shadow-[0_0_7px_#4B8BBE,inset_0_0_7px_#4B8BBE,0_0_7px_#4B8BBE,0_0_7px_#4B8BBE,0_0_7px_#4B8BBE]",
        width: "w-[70%]"
    },
    {
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        color: "bg-[#00ADD8]",
        shadow_color: "shadow-[0_0_7px_#00ADD8,inset_0_0_7px_#00ADD8,0_0_7px_#00ADD8,0_0_7px_#00ADD8,0_0_7px_#00ADD8]",
        width: "w-[65%]"
    }
];

/**
 * 
className="flex-grow w-full h-full rounded-md border border-4 
min-h-[204px] 

    border-orange-400 
    text-orange-400 
    hover:bg-orange-400/40 
    hover:shadow-2xl 
    hover:shadow-orange-400/40 
    hover:text-white 
    
    text-center"
 */

export default function Projects({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: (open: boolean) => void })
{
    const ref = useRef<any[]>([]);
    const add_to_ref = (element: any) =>
    {
        if (element && !ref.current.includes(element))
        {
            ref.current.push(element);
        }
    };

    useEffect(() => {
        ref.current.forEach((element: any) => {
            gsap.from(element, {
                y: window.innerHeight / 2 - 100,
                stagger: 0.01,
                opacity: 0,
                duration: 0.5,
                ease: "expo.out",
            });

            gsap.to(element.parentElement, {
                y: "+=10",
                yoyo: true,
                repeat: -1,
                duration: 1,
                ease: "power1.inOut",
            });
        });
    }, []);

    return (
        <div className="flex flex-col w-full overflow-x-auto overflow-y-auto bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-6 my-24">
                {PROJECTS.map((project, index) => (
                    <Link
                        key={index}
                        className={`w-full h-full rounded-md border border-4 ${border_colors[index]} min-h-[204px] ${text_colors[index]} ${hover_colors[index]} hover:shadow-2xl ${shadow_colors[index]} hover:text-white`}
                        ref={add_to_ref}
                        href={project.link}
                    >
                        <div className="grid grid-cols-2 justify-center items-center">
                            <div className="text-center">
                                <p className="px-6 py-4 text-lg md:text-xl font-black underline">{project.name}</p>
                            </div>

                            <div className="flex justify-center items-center">
                                {project.status === ProjectStatus.Completed ? (
                                    <p className="inline-block bg-green-400 text-white px-2 md:px-4 md:py-1 text-sm md:text-xl rounded-full">Completed</p>
                                ) : (
                                    <p className="inline-block bg-yellow-400 text-white px-4 py-1 text-sm md:text-xl rounded-full">WIP</p>
                                )}
                            </div>
                        </div>
                        {/* <div className="flex flex-row justify-center items-center">
                            <div className="flex flex-grow text-center">
                                <p className="px-6 py-4 text-xl font-black underline">{project.name}</p>
                            </div>

                            <div className="flex flex-grow text-center justify-center items-center">
                                {project.status === ProjectStatus.Completed ? (
                                    <p className="inline-block bg-green-400 text-white px-2 md:px-4 md:py-1 text-sm md:text-xl rounded-full">Completed</p>
                                ) : (
                                    <p className="inline-block bg-yellow-400 text-white px-4 py-1 text-sm md:text-xl rounded-full">WIP</p>
                                )}
                            </div>
                        </div> */}

                        <div className="grid grid-cols-2 justify-center items-center">
                            <div className="text-center w-[90%]">
                                <p className="px-6 py-4 text-lg font-semibold">{project.description}</p>
                            </div>

                            <div className="flex justify-center items-center">
                                {
                                    project.stack.map((language: Languages, index) => (
                                        <div key={index} className="flex flex-row justify-center items-center">
                                            <img src={LANGUAGES[language].image} alt={"l"} className="mx-4 w-10 h-10 md:w-16 md:h-16" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
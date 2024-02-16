import gsap from "gsap";
import { useEffect, useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(SplitType);

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


const topics = [
    {
        title: "Embedded Programming",
        description: "Resource-constrained programming close to the hardware."
    },
    {
        title: "Operating Systems",
        description: "Managing resources and processes in a computer."
    },
    {
        title: "Compiler Design",
        description: "Translating high-level code into machine code."
    },
    {
        title: "Networking",
        description: "Protocols used to communicate across systems, examples being TCP/IP, UDP/IP, HTTP, etc."
    },
    {
        title: "Web Development",
        description: "Developing web applications and servers."
    },
    {
        title: "Machine Learning",
        description: "Using data to train models to emulate human cognition."
    }
];

export default function About()
{
    const ref = useRef<HTMLDivElement[]>([]);
    const add_to_ref = (el: HTMLDivElement) =>
    {
        if (el && !ref.current.includes(el))
        {
            ref.current.push(el);
        }
    }

    useEffect(() =>
    {
        const timeline = gsap.timeline({ defaults: { duration: 1 } });
        timeline.from(ref.current, {
            opacity: 0,
            y: 100,
            stagger: 0.1,
            ease: "power3.out"
        });
        ref.current?.forEach((el, index) =>
        {
            gsap.from(el, {
                width: 0,
                // y: 100,
                duration: 1,
                delay: index * 0.2
            });
        });
    }, [ref]);

    const fade_in_ref = useRef<HTMLDivElement[]>([]);
    const add_fade_in_ref = (el: HTMLDivElement) =>
    {
        if (el && !fade_in_ref.current.includes(el))
        {
            fade_in_ref.current.push(el);
        }
    };
    useEffect(() =>
    {
        for (let i = 0; i < fade_in_ref.current.length; i++)
        {
            const el = fade_in_ref.current[i];
            gsap.from(el, {
                opacity: 0,
                duration: 1 + i * 0.25,
                y: 100,
                ease: "power3.out"
            });
        }
    }, [fade_in_ref]);

    const typewriter_targets = useRef<any>([]);
    const addTypewriterRef = (el: any) => {
        if (el && !typewriter_targets.current.includes(el))
        {
            typewriter_targets.current.push(el);
        }
    };

    // useEffect(() => {
    //     typewriter_targets.current.forEach((target: any) => {
    //         /** @ts-ignore */
    //       const splitType = new SplitType(target, { typespeed: 0.1 });
      
    //       const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    //       timeline.from(splitType.chars, { opacity: 0, duration: 0.5, stagger: 0.1 });
    //       timeline.to(splitType.chars, { opacity: 0, duration: 0.5, stagger: 0.1 }, '+=1');
    //     });
    //   }, [typewriter_targets]);    

    useEffect(() => {
        const split_types: SplitType[] = [];
        const typeseeds = [0.075, 0.015];

        for (const target of typewriter_targets.current)
        {
            const split_type = new SplitType(target);
            gsap.set(split_type.chars, { opacity: 0 });

            split_types.push(split_type);
        }

        const animate = async () => {
            let i = 0;
            for (const splitType of split_types) {
                let j = i++;
                const timeline = gsap.timeline({ repeatDelay: 1 });

                gsap.set(splitType.chars, { opacity: 0 });

                for (let index = 0; index < splitType.chars!.length; index++) {
                    const char = splitType.chars![index];
                    // Wait for each animation to complete before moving onto the next one
                    await timeline.to(char, { opacity: 1, duration: 0.075 }, index * typeseeds[j]);
                }
            }
        };

        animate();
    }, [typewriter_targets]);


    return (
        <div className="flex flex-col w-full h-full flex-grow overflow-y-hidden justify-center items-center bg-gray-900">
            <div
                className="flex flex-col gap-0 overflow-auto m-8 md:w-[50%] h-[55%] rounded-md border border-4 border-violet-800 min-h-[204px] text-center items-center"
            >
                <div className="text-center mt-4 text-2xl md:text-4xl w-full">
                    Skills
                </div>
                <div className="grid grid-cols-3 place-items-center items-center justify-center">
                    {LANGUAGES.map((language, index) => (
                        <div key={index} className="flex items-center space-x-4 my-4" ref={add_fade_in_ref}>
                            <img src={language.image} alt={`Language ${index}`} className="mx-4 w-10 h-10 md:w-16 md:h-16" />
                            {/* <div className="flex flex-col w-full h-full" ref={add_to_ref}>
                                <div className="bg-gray-500 h-4 w-[90%] rounded-lg">
                                    <div className={`rounded-lg ${language.color} h-4 ${language.width}`}></div>
                                </div>
                            </div>  */}
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="overflow-auto m-8 h-[55%] md:w-[50%] rounded-md border border-4 border-violet-800 min-h-[204px] text-center"
            >
                <h1 className="mt-2 text-2xl">I am interested in...</h1>
                {topics.map((topic, index) => (
                    <div key={index} className="p-4 rounded-md">
                        <h2 className="text-xl md:text-lg font-semibold text-green-400">{topic.title}</h2>
                        <p className="text-lg md:text-sm">{topic.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
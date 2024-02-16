import { faDiscord, faGithub, faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";

export default function Landing({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: (open: boolean) => void })
{
    const [yt_data, set_counts] = useState([0, 0]);
    const [loading_yt, set_loading_yt] = useState(true);

    const [spotify_data, set_spotify_data] = useState<{ item: { duration_ms?: number, name?: string, artists?: Array<{ name: string, href: string }>, external_urls?: { spotify: string }, album?: { images: Array<{ url: string }> } }, progress_ms?: number }>(
        {
            item:
            {
                name: "Loading...",
            }
        });

    const [is_playing, set_is_playing] = useState(false);
    const [loading_spotify, set_loading_spotify] = useState(true);

    useEffect(() =>
    {
        fetch("/api/youtube")
            .then(res => res.json())
            .then((data: any) =>
            {
                set_counts([data.subscriber_count, data.view_count]);
                set_loading_yt(false);
            });
    }, []);

    useEffect(() =>
    {
        fetch("/api/spotify")
            .then(res => res.json())
            .then((data: any) =>
            {
                if (loading_spotify)
                {
                    console.log(data.data);
                }

                set_is_playing(!!data.data.body.item);

                set_spotify_data(data.data.body);
                set_loading_spotify(false);
            });
    });

    const [width, setWidth] = useState(1920);
    useEffect(() =>
    {
        setWidth(window.innerWidth);
    }, []);

    const ref = useRef<any[]>([]);
    const add_to_ref = (element: any) =>
    {
        if (element && !ref.current.includes(element))
        {
            ref.current.push(element);
        }
    }

    const H1_INDEX = 2;

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline.from(ref.current[H1_INDEX], {
            y: window.innerHeight / 2 - 100,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
        });

        ref.current.forEach((element: any, index: number) => {
        if (index !== H1_INDEX) {
            timeline.from(
                element,
                {
                    y: window.innerHeight / 2 - 100,
                    stagger: 0.01,
                    opacity: 0,
                    duration: 0.5,
                    ease: "expo.out",
                },
                "-=0.5"
            );
        }
        });

        ref.current.forEach((element: any, index: number) => {
            if (index === 0 || index === H1_INDEX + 1)
            {
                gsap.to(element.parentElement, {
                    y: "+=10",
                    yoyo: true,
                    repeat: -1,
                    duration: 1,
                    ease: "power1.inOut",
                });
            }
        });
    }, []);

    return (
        <div className="flex flex-col w-full overflow-x-auto overflow-y-auto bg-gray-900">
            <div className="flex large:flex-row flex-col justify-center items-center large:gap-8 gap-8 mx-8 large:my-24 large:h-[33%]">
                <Link
                    className="flex-grow w-full h-full rounded-md border border-4 border-red-600 min-h-[204px] text-red-600 hover:bg-red-600/40 hover:shadow-2xl hover:shadow-red-600/40 hover:text-white large:mt-0 mt-8"
                    ref={add_to_ref}
                    href={"https://www.youtube.com/channel/UCFuob9RO7W-Io-_zx-no1wg"}
                >
                    <div className="flex flex-col h-full w-full justify-center items-center text-center">
                        <FontAwesomeIcon
                            className="text-9xl"
                            icon={faYoutube}
                        />
                        {
                            loading_yt
                                ? (<p className="mt-2 text-xl flex text-center items-end justify-center">Loading...</p>)
                                : (
                                    <>
                                        <p className="mt-2 text-xl flex text-center items-end justify-center">{yt_data[0].toLocaleString()} Subscribers</p>
                                        <p className="text-xl flex text-center items-end justify-center">{yt_data[1].toLocaleString()} Total Views</p>
                                    </>
                                )
                        }
                    </div>
                </Link>
                <Link
                    className="flex-grow w-full h-full rounded-md border border-4 border-green-400 text-green-400 min-h-[204px] hover:bg-green-400/40 hover:shadow-2xl hover:shadow-green-400/40 hover:text-white" 
                    ref={add_to_ref}
                    href={(is_playing) ? (spotify_data?.item?.external_urls?.spotify || "https://open.spotify.com/user/31mhtbo2xjzzn26b7vkn5rluue54") : "https://open.spotify.com/user/31mhtbo2xjzzn26b7vkn5rluue54"}
                >
                    <div className="flex flex-row h-[20%] w-full text-center">
                        <FontAwesomeIcon
                            className="text-2xl mx-4 my-4"
                            icon={faSpotify}
                        >
                        </FontAwesomeIcon>
                        <p className="h-16 w-full text-xl flex text-center items-start justify-items-start mt-[0.75rem]">Currently listening to{':'}</p>
                    </div>
                    {
                        (is_playing) ?
                            (
                                <>
                                    <div className="flex flex-row h-[80%] text-center items-center">
                                        <div className="w-[50%] h-[50%]">
                                            <p className="mx-4 w-48 text-xl bottom-0 right-0">{(loading_spotify && spotify_data) ? "Loading..." : (spotify_data?.item?.name || "Loading...")}</p>
                                            <p className="mx-4 w-48 text-md bottom-0 right-0">
                                                by{' '}
                                                <a className="underline">
                                                    {(loading_spotify && spotify_data) ? "Loading..." : (spotify_data?.item?.artists?.[0]?.name || "an unknown artist")}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="w-[75%] h-[75%] flex flex-col items-end mx-8">
                                            <Image
                                                src={is_playing ? (spotify_data?.item?.album?.images?.[0]?.url || "") : ("")}
                                                width={100}
                                                height={100}
                                                alt="Album Artwork"
                                                className="rounded-md"
                                            />
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] rounded-lg h-4 bg-gray-600 my-6 transition-all duration-150">
                                                <div className="h-full bg-green-400 rounded-lg transition-all duration-150" style={{ width: `${((spotify_data?.progress_ms || 0) / (spotify_data?.item?.duration_ms || 1)) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <div className="flex flex-col h-[60%] w-full text-center">
                                    <p className="m-4 w-full text-xl bottom-0 right-0">{loading_spotify ? "Loading..." : "Nothing."}</p>
                                </div>
                            )
                    }
                </Link>
            </div>
            
            {width >= 1280 && (<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center" ref={add_to_ref}>ALTANIS</h1>)}

            <div className="flex large:flex-row flex-col justify-center items-center large:gap-8 gap-8 mx-8 my-8 large:my-24 large:h-[33%]">
                <Link
                    className="flex-grow w-full h-full rounded-md border border-4 border-orange-400 min-h-[204px] text-orange-400 hover:bg-orange-400/40 hover:shadow-2xl hover:shadow-orange-400/40 hover:text-white text-center"
                    ref={add_to_ref}
                    href={"https://github.com/Altanis"}
                >
                    <div className="flex flex-col h-full w-full justify-center items-center text-center">
                        <FontAwesomeIcon
                            className="text-9xl"
                            icon={faGithub}
                        />
                    </div>
                </Link>
                <Link 
                    className="flex-grow w-full h-full rounded-md border border-4 border-cyan-400 text-cyan-400 min-h-[204px] hover:bg-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-400/40 hover:text-white text-center"
                    href={"https://discord.com/users/765239557666111509"}
                    ref={add_to_ref}
                >
                    <div className="flex flex-col h-full w-full justify-center items-center text-center">
                        <FontAwesomeIcon
                            className="text-9xl"
                            icon={faDiscord}
                        />
                        {
                            loading_yt
                                ? (<p className="mt-2 text-xl flex text-center items-end justify-center">Loading...</p>)
                                : (
                                    <>
                                        <p className="text-lg flex text-center items-end justify-center">Tag: altanis_</p>
                                    </>
                                )
                        }
                    </div>
                </Link>
                {/* <div className="flex-grow w-full h-full rounded-md border border-4 border-yellow-400 min-h-[204px] text-yellow-400 hover:bg-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-400/40 hover:text-white text-center large:mb-0 mb-8" ref={add_to_ref}></div>
                <div className="flex-grow w-full h-full rounded-md border border-4 border-violet-400 text-violet-400 min-h-[204px] hover:bg-violet-400/40 hover:shadow-2xl hover:shadow-violet-400/40 hover:text-white text-center large:mb-0 mb-8" ref={add_to_ref}></div> */ }
            </div>
        </div>
    );
}
import React, { useState, useEffect, useRef } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function FlareCursor() {
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [prevTs, setPrevTs] = useState(0);
    const requestRef = useRef<number>();

    const handleMouseMove = (e: any) => {
        setTargetPosition({ x: e.clientX, y: e.clientY });
        const target = e.target;
        setIsPointer(window.getComputedStyle(target).getPropertyValue("cursor") === "pointer" || target.tagName === "A");
    };

    const handleMousePress = () => {
        setIsPointer(true);
    };

    const handleMouseRelease = () => {
        setIsPointer(false);
    };

    const handleMouseScroll = (e: any) => {
        setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMousePress);
        window.addEventListener("mouseup", handleMouseRelease);
        window.addEventListener("wheel", handleMouseScroll);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMousePress);
            window.removeEventListener("mouseup", handleMouseRelease);
            window.removeEventListener("wheel", handleMouseScroll);
        };
    }, []);

    useEffect(() => {
        const animate = (timestamp: number) => {
            const delta = timestamp - prevTs;
            setPrevTs(timestamp);
            const dt = Math.max(Math.min(delta / (1000 / 60), 1), 0);

            setPosition(prevPosition => ({
                x: lerp(prevPosition.x, targetPosition.x, 0.35 * dt),
                y: lerp(prevPosition.y, targetPosition.y, 0.35 * dt),
            }));

            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [targetPosition]);

    const flareSize = isPointer ? 50 : 30;
    const cursorStyle = { left: "-100px", top: "-100px" };

    return (
        <div>
            <div
                className="flare hidden md:block"
                style={{
                    ...cursorStyle,
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: `${flareSize}px`,
                    height: `${flareSize}px`,
                }}
            ></div>
            <div
                className="hidden md:block"
                style={{
                    position: 'fixed',
                    left: `${targetPosition.x - 3}px`,
                    top: `${targetPosition.y - 3}px`,
                    width: '5px',
                    height: '5px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                }}
            ></div>
        </div>
    );
}
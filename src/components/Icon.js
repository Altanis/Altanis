import React, { useState, useLayoutEffect, useMemo } from "react";

export default function Icon({ offset, type, color }) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenMinDimension = Math.min(screenWidth, screenHeight);
    const radiusRatio = 4 / 7;
    
    const radiusX = screenMinDimension * radiusRatio;
    const radiusY = screenMinDimension * (1 - radiusRatio) * 0.9;
    const hoverOffset = -20;
    
    const [hovering, setHovering] = useState(false);
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
    
    const memoizedOffset = useMemo(() => offset, [offset]);
    
    useLayoutEffect(() => {
        let started, animationFrameId;
        let speed = 0.03;

        function animate(ts) {                
            if (!started) started = ts;
            const delta = ts - started;
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const angle = (delta / 1000) * speed * (Math.PI * 2);
            const x = centerX + radiusX * Math.cos(angle + memoizedOffset);
            const y = centerY + radiusY * Math.sin(angle + memoizedOffset);
            
            setPosition({ x, y });
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [radiusX, radiusY, memoizedOffset]);

    const c = `${color}`;
    return (
        <i
            className={`py-1 ${type} text-7xl duration-200 ${c} hover:cursor-pointer translate-y-1 absolute`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setTimeout(setHovering(false), 200)}
            style={{ transform: `translate(${position.x}px, ${position.y + (hovering ? hoverOffset : 0)}px)` }}
        />
    );
};
import { useEffect, useState } from 'react';

const Badge = ({ image, borderColor, badgeText, badgeColor, text }) => {
	const [badgeBorder, setBadgeBorder] = useState("border-white");
	useEffect(() => {
		setBadgeBorder(badgeColor.replace("bg", "border"));
	}, []);

	return (
		<div className={`px-6 py-4 duration-200 border ${borderColor} hover:cursor-pointer rounded-3xl`}>
			<div className="flex justify-center items-center">
				<div className={`relative rounded-full border-4 ${badgeBorder} w-16 h-16`}>
					<img src={image} alt="Logo" className="rounded-full object-cover w-full h-full"/>
					<span className={`absolute top-0 left-10 ${badgeColor} text-white text-xs px-2 py-0.5 rounded-full`}>
						{badgeText}
					</span>
				</div>
			</div>

			<div className="mt-4">
				<p className="text-2xl font-bold text-center">
					{text}
				</p>
			</div>
		</div>
	);
};

export default Badge;
import React, { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import "./countdown.css";
const Start = () => {
	window.location.href = '/bootcamp/home'
}
const COUNTDOWN_TARGET = new Date("2024-08-14T08:59:59");
const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
	return { days, hours, minutes, seconds };
};
const Countdown = () => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='countdown'>
			<div className="count-icon">
			</div>
			<h2 style={{ textAlign: 'center' }}>
				<BsStopwatch style={{ marginLeft: '48%' }} />Hackathon Starts In</h2>
			<div className='content'>
				{Object.entries(timeLeft).map((el) => {
					const label = el[0];
					const value = el[1];
					return (
						<div className='box' key={label}><br /><br />
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label'> {label} </span>
						</div>
					);
				})}
			</div>
			<button className="start-btn animated-button" onClick={Start}>Click for Participation</button>
		</div>
	);
};

export default Countdown;
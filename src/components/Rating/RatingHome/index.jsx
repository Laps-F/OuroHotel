import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import { Container, Radio, Rating } from "../RatingStyles";

function Rate({hotel, rating}){
	const [rate, setRate] = useState(rating);

	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label style={{margin: 0}} key={index}>
						<Radio
							type="radio"
							value={givenRating}
						/>
						<Rating>
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "rgb(254, 190, 0)"
										: "rgb(192,192,192)"
								}
							/>
						</Rating>
					</label>
				);
			})}
		</Container>
	);
};

export default Rate;

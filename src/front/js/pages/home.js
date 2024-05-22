import React from "react";
import "../../styles/home.css";
import starWarsBG from "../../img/Star-wars-bg.jpg"

export const Home = () => {


	return(
	<div className="text-center mt-0 ">

		<p>
			<img src={starWarsBG} width={'90%'} height={'100%'} />
		</p>
		
		
	</div>
	);
};

export const time = (timestamp: string): string => {
	const postDate = new Date(timestamp);
	const currentDate = new Date();
	const timeDifferenceInSeconds =
		(currentDate.getTime() - postDate.getTime()) / 1000;

	if (timeDifferenceInSeconds < 60) {
		return `${Math.floor(timeDifferenceInSeconds)} sec`;
	} else if (timeDifferenceInSeconds < 60 * 60) {
		return `${Math.floor(timeDifferenceInSeconds / 60)} m`;
	} else if (timeDifferenceInSeconds < 60 * 60 * 24) {
		return `${Math.floor(timeDifferenceInSeconds / 60 / 60)} h`;
	} else if (timeDifferenceInSeconds < 60 * 60 * 24 * 7) {
		return `${Math.floor(timeDifferenceInSeconds / 60 / 60 / 24)} d`;
	} else if (timeDifferenceInSeconds < 60 * 60 * 24 * 30) {
		return `${Math.floor(timeDifferenceInSeconds / 60 / 60 / 24 / 7)} W`;
	} else {
		return `${Math.floor(timeDifferenceInSeconds / 60 / 60 / 24 / 30)} month`;
	}
};

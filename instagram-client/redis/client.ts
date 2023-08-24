// import { createClient } from 'redis';

// const client = createClient({
// 	socket: {
// 		host: process.env.NEXT_PUBLIC_REDIS_HOST,
// 		port:
// 			process.env.NEXT_PUBLIC_REDIS_PORT &&
// 			parseInt(process.env.NEXT_PUBLIC_REDIS_PORT),
// 	},
// 	password: process.env.NEXT_PUBLIC_REDIS_PW,
// });

// client.on('error', (err) => console.log(err));
// client.connect();

// export { client };

import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const redisOptions = {
	socket: {
		host: process.env.NEXT_PUBLIC_REDIS_REDIS_HOST || 'localhost', // Provide a default value if needed
		port: parseInt(process.env.NEXT_PUBLIC_REDIS_REDIS_PORT || '6379'), // Provide a default value if needed
	},
	password: process.env.NEXT_PUBLIC_REDIS_REDIS_PW,
};

const client = createClient(redisOptions);

client.on('error', (err: Error) => console.log(err));
client.connect();

export default client;

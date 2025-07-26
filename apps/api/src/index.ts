import { app } from './app';
import { env } from './env';

const port = env.PORT;
const { fetch } = app;

export default { port, fetch };

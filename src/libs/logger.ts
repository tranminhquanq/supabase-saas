import logtail from '@logtail/pino';
import pino, { type DestinationStream } from 'pino';
import pretty from 'pino-pretty';

import { env } from './env';

let stream: DestinationStream;

if (env.LOGTAIL_SOURCE_TOKEN) {
  stream = pino.multistream([
    await logtail({
      sourceToken: env.LOGTAIL_SOURCE_TOKEN,
      options: {
        sendLogsToBetterStack: true,
      },
    }),
    {
      stream: pretty(), // Prints logs to the console
    },
  ]);
} else {
  stream = pretty({
    colorize: true,
  });
}

export const logger = pino({ base: undefined }, stream);

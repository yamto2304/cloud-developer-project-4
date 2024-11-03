import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { getUserId } from '../utils.mjs';
import { createLogger } from '../../utils/logger';
import { createTodo } from '../../handlers/todos';

const logger = createLogger('createTodo');

export const handler = middy(async (event) => {
  const newTodo = JSON.parse(event.body);
  logger.info('create todo');
  const userId = getUserId(event);

  try {
    const item = await createTodo(newTodo, userId);
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ item }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'server error' }),
    };
  }
});

handler.use(
  cors({
    credentials: true,
  })
);

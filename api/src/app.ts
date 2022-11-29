import { Env, ServerBuilder } from 'bonfire-rest';
import { ValidationPipe } from 'bonfire-rest/services/pipe/validation.pipe';
import { HabitsController } from './habits/controllers/habits.controller';
import { UsersController } from './users/controllers/users.controller';
import { connectDB } from './database/connection';
import { HabitDayStatusController } from './daily-status/controllers/habit-status.controller';
import { JwtMiddleware } from './auth/auth.middleware';
import { AuthController } from './auth/controllers/auth.controller';
var cors = require('cors');
var express = require('express');

async function main() {
    await connectDB();
    const port = Env.asNumber('PORT', 3000);
    const app = express();
    app.use(cors());
    const server = await ServerBuilder.build({
        controllers: [HabitsController, UsersController, HabitDayStatusController, AuthController],
        globalPipes: [ValidationPipe],
        globalPrefix: 'api',
        server: app,
        globalMiddlewares: [JwtMiddleware],
        openapi: {
            spec: { openapi: '1', info: { title: 'tracker', version: '3.0.0' } },
            swaggerUi: '/docs',
            apiDocs: 'raw-docs',
        },
    });
    server.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}

main();

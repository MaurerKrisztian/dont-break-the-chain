import {Env, ServerBuilder} from "bonfire-rest";
import { ValidationPipe } from "bonfire-rest/services/pipe/validation.pipe";
import { HabitsController } from "./habits/controllers/habits.controller";
import { UsersController } from "./users/controllers/users.controller";
import { connectDB } from "./database/connection";
import {HabitDayStatusController} from "./daily-status/controllers/habit-status.controller";
var cors = require('cors')
var express = require('express')
async function main() {

    await connectDB()

    const port = Env.asNumber("PORT") || 3000;
    const app = express()
    app.use(cors())
    const server = await ServerBuilder.build({
        controllers: [HabitsController, UsersController, HabitDayStatusController],
        globalPipes: [ValidationPipe],
        globalPrefix: "api",
        server: app,
        globalMiddlewares: [],
        openapi: {
            swaggerUi: "/docs",
            apiDocs: "raw-docs",
            title: "habit-tracker"
        }
    });
    server.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}

main();

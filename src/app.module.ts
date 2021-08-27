import { Module } from "@nestjs/common";
import { AppController } from "./common/controller/app.controller";
import { AppService } from "./common/service/app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";
import * as MongooseAutoPopulatePlugin from "mongoose-autopopulate";

// Modules
import { StudentModule } from "./modules/student/student.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid("development", "production", "test")
					.default("development"),
				HOST: Joi.string().default("localhost"),
				PORT: Joi.number().default(4000),
				MONGO_DB_HOST: Joi.string().default("localhost"),
				MONGO_DB_PORT: Joi.number().default(27017),
				HOMONGO_DBST: Joi.string().default("testproyect"),
				MONGO_DB_CONNECTION: Joi.string().default(
					"mongodb://localhost:27017/testproyect"
				)
			})
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get("MONGO_DB_CONNECTION"),
				// eslint-disable-next-line prettier/prettier
				connectionFactory: connection => {
					connection.plugin(MongooseAutoPopulatePlugin);
					return connection;
				}
			}),
			inject: [ConfigService]
		}),
		StudentModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

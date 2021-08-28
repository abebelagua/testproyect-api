import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from "helmet";
import * as compression from "compression";
import * as rateLimit from "express-rate-limit";
import { json } from "body-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const host = configService.get("HOST");
	const port = configService.get("PORT");
	const clientAddress = configService.get("CLIENT_ADDRESS");

	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("API Universidad")
		.setDescription("Documentación de la API la Universidad")
		.setVersion("1.0")
		.addTag("Estudiante", "Endpoint para el CRUD del estudiante")
		.addTag("Grupo", "Endpoint para el CRUD del grupo")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document, {
		customSiteTitle: "Swagger UI - API Universidad"
	});

	app.enableCors({
		origin: clientAddress,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true
	});
	app.use(helmet({}));
	app.use(
		rateLimit({
			windowMs: 10 * 60 * 1000, // 5 minutes
			max: 500 // limit each IP to 500 request per windowMs
		})
	);
	app.use(json({ limit: "10mb" }));
	app.use(compression());

	await app.listen(process.env.PORT);

	Logger.log(`Server started running on http://${host}:${port}`, "NestJS");
}
bootstrap();

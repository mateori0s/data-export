"use strict";
import activity from "./activity";
import configJsonFile from '../../public/config.json';

/*
 * GET home page.
 */
const index = (req: any, res: any) => {
	if (!req.session.token) {
		res.render("index", {
			title: "Unauthenticated",
			errorMessage: "This app may only be loaded via Salesforce Marketing Cloud."
		});
	} else {
		res.render("index", {
			title: "Journey Builder Activity",
			results: activity.logExecuteData
		});
	}
};

const login = (req: any, res: any) => {
	res.redirect("/");
};

const logout = (req: any, res: any) => {
	req.session.token = "";
};

const configJson = async (req: any, res: any) => {
	const { ENVIRONMENT, APPLICATION_EXTENSION_KEY, THIS_SERVER_BASE_URL, APIGEE_USER_KEY, SERVICE, COUNTRY } = process.env;
	let nameEnvironmentLabel = '';
	switch (ENVIRONMENT) {
		case 'local':
			nameEnvironmentLabel = ' - LOCAL';
			break;
		case 'desa':
			nameEnvironmentLabel = ' - DESA';
			break;
		case 'test':
			nameEnvironmentLabel = ' - TEST';
			break;
		default:
			break;
	}
	configJsonFile.lang["en-US"].name = `Data export ${COUNTRY}${nameEnvironmentLabel}`;
	configJsonFile.configurationArguments.applicationExtensionKey = APPLICATION_EXTENSION_KEY || 'NOT_PROVIDED';
	const apigeeUserKeyHeaderValue = JSON.stringify({
		user_key: APIGEE_USER_KEY,
		service: SERVICE,
		environment: ENVIRONMENT
	});
	configJsonFile.arguments.execute.url = `${THIS_SERVER_BASE_URL}/journeybuilder/execute`;
	configJsonFile.arguments.execute.headers = apigeeUserKeyHeaderValue;
	configJsonFile.configurationArguments.save.url = `${THIS_SERVER_BASE_URL}/journeybuilder/save`;
	configJsonFile.configurationArguments.save.headers = apigeeUserKeyHeaderValue;
	configJsonFile.configurationArguments.publish.url = `${THIS_SERVER_BASE_URL}/journeybuilder/publish`;
	configJsonFile.configurationArguments.publish.headers = apigeeUserKeyHeaderValue;
	configJsonFile.configurationArguments.stop.url = `${THIS_SERVER_BASE_URL}/journeybuilder/stop`;
	configJsonFile.configurationArguments.stop.headers = apigeeUserKeyHeaderValue;
	configJsonFile.configurationArguments.validate.url = `${THIS_SERVER_BASE_URL}/journeybuilder/validate`;
	configJsonFile.configurationArguments.validate.headers = apigeeUserKeyHeaderValue;
	res.json(configJsonFile);
};

export default {
	index,
	login,
	logout,
	configJson,
};

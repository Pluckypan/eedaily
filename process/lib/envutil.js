const os = require('os');
const path = require('path');
var jsPath = path.resolve(__dirname, "eeutils.js");
var eeutils = require(jsPath);
var easypageEnv = path.resolve(os.homedir(), "easypage");
var envCfg = path.resolve(easypageEnv, ".config");
module.exports = {
	getConfig: getConfig,
	exists: exists,
	read: read,
	getJson: getJson,
	setLastpath: setLastpath,
	clearLaspath: clearLaspath
};

function exists(path) {
	return eeutils.exists(path);
}

function read(filepath) {
	return eeutils.read(filepath);
}

function getJson(str) {
	return eeutils.getJson(str);
}

function getConfig() {
	if(!eeutils.exists(easypageEnv)) {
		eeutils.mkdirsSync(easypageEnv);
	}
	if(!eeutils.exists(envCfg)) {
		var obj = {
			"lastPath": ""
		};
		eeutils.write(envCfg, JSON.stringify(obj));
	}

	var cfgStr = eeutils.read(envCfg);
	var epConfig = eeutils.getJson(cfgStr);
	return epConfig;
}

function setLastpath(path) {
	var cfg = getConfig();
	if(cfg) {
		cfg.lastPath = path;
	} else {
		cfg = {
			"lastPath": path
		}
	}
	eeutils.write(envCfg, JSON.stringify(cfg));
}

function clearLaspath() {
	setLastpath("");
}
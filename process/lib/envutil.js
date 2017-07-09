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
	write: write,
	getJson: getJson,
	setLastpath: setLastpath,
	clearLaspath: clearLaspath,
	getRecent: getRecent
};

function exists(path) {
	return eeutils.exists(path);
}

function read(filepath) {
	return eeutils.read(filepath);
}

function write(filepath, content) {
	return eeutils.write(filepath, content);
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
			"lastPath": "",
			"recent": []
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
		if(!cfg.recent || cfg.recent.length == 0) {
			cfg.recent = [path];
		} else {
			if(cfg.recent.indexOf(path) == -1) {
				cfg.recent.push(path);
			}
		}
	} else {
		cfg = {
			"lastPath": path,
			"recent": [path]
		}
	}
	if(!path || path.length == 0) {
		cfg.recent = [];
	}
	eeutils.write(envCfg, JSON.stringify(cfg));
}

function getRecent() {
	var cfg = getConfig();
	var arr = cfg ? cfg.recent : null;
	return arr ? arr : [];
}

function clearLaspath() {
	setLastpath("");
}
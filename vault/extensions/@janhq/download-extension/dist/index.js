
//#region node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
/******************************************************************************

Copyright (c) Microsoft Corporation.



Permission to use, copy, modify, and/or distribute this software for any

purpose with or without fee is hereby granted.



THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH

REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY

AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,

INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM

LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR

OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR

PERFORMANCE OF THIS SOFTWARE.

***************************************************************************** */
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

//#endregion
//#region node_modules/@tauri-apps/api/core.js
var _Channel_onmessage, _Channel_nextMessageIndex, _Channel_pendingMessages, _Channel_messageEndIndex, _Resource_rid;
/**
* Invoke your custom commands.
*
* This package is also accessible with `window.__TAURI__.core` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
* @module
*/
/**
* A key to be used to implement a special function
* on your types that define how your type should be serialized
* when passing across the IPC.
* @example
* Given a type in Rust that looks like this
* ```rs
* #[derive(serde::Serialize, serde::Deserialize)
* enum UserId {
*   String(String),
*   Number(u32),
* }
* ```
* `UserId::String("id")` would be serialized into `{ String: "id" }`
* and so we need to pass the same structure back to Rust
* ```ts
* import { SERIALIZE_TO_IPC_FN } from "@tauri-apps/api/core"
*
* class UserIdString {
*   id
*   constructor(id) {
*     this.id = id
*   }
*
*   [SERIALIZE_TO_IPC_FN]() {
*     return { String: this.id }
*   }
* }
*
* class UserIdNumber {
*   id
*   constructor(id) {
*     this.id = id
*   }
*
*   [SERIALIZE_TO_IPC_FN]() {
*     return { Number: this.id }
*   }
* }
*
* type UserId = UserIdString | UserIdNumber
* ```
*
*/
const SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
/**
* Stores the callback in a known location, and returns an identifier that can be passed to the backend.
* The backend uses the identifier to `eval()` the callback.
*
* @return An unique identifier associated with the callback function.
*
* @since 1.0.0
*/
function transformCallback(callback, once = false) {
	return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
var Channel = class {
	constructor(onmessage) {
		_Channel_onmessage.set(this, void 0);
		_Channel_nextMessageIndex.set(this, 0);
		_Channel_pendingMessages.set(this, []);
		_Channel_messageEndIndex.set(this, void 0);
		__classPrivateFieldSet(this, _Channel_onmessage, onmessage || (() => {}), "f");
		this.id = transformCallback((rawMessage) => {
			const index = rawMessage.index;
			if ("end" in rawMessage) {
				if (index == __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")) this.cleanupCallback();
else __classPrivateFieldSet(this, _Channel_messageEndIndex, index, "f");
				return;
			}
			const message = rawMessage.message;
			if (index == __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")) {
				__classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message);
				__classPrivateFieldSet(this, _Channel_nextMessageIndex, __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") + 1, "f");
				while (__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") in __classPrivateFieldGet(this, _Channel_pendingMessages, "f")) {
					const message$1 = __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")];
					__classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message$1);
					delete __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")];
					__classPrivateFieldSet(this, _Channel_nextMessageIndex, __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") + 1, "f");
				}
				if (__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") === __classPrivateFieldGet(this, _Channel_messageEndIndex, "f")) this.cleanupCallback();
			} else __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[index] = message;
		});
	}
	cleanupCallback() {
		window.__TAURI_INTERNALS__.unregisterCallback(this.id);
	}
	set onmessage(handler) {
		__classPrivateFieldSet(this, _Channel_onmessage, handler, "f");
	}
	get onmessage() {
		return __classPrivateFieldGet(this, _Channel_onmessage, "f");
	}
	[(_Channel_onmessage = new WeakMap(), _Channel_nextMessageIndex = new WeakMap(), _Channel_pendingMessages = new WeakMap(), _Channel_messageEndIndex = new WeakMap(), SERIALIZE_TO_IPC_FN)]() {
		return `__CHANNEL__:${this.id}`;
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
/**
* Sends a message to the backend.
* @example
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* await invoke('login', { user: 'tauri', password: 'poiwe3h4r5ip3yrhtew9ty' });
* ```
*
* @param cmd The command name.
* @param args The optional arguments to pass to the command.
* @param options The request options.
* @return A promise resolving or rejecting to the backend response.
*
* @since 1.0.0
*/
async function invoke(cmd, args = {}, options) {
	return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
_Resource_rid = new WeakMap();

//#endregion
//#region node_modules/@tauri-apps/api/event.js
/**
* The event system allows you to emit events to the backend and listen to events from it.
*
* This package is also accessible with `window.__TAURI__.event` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
* @module
*/
/**
* @since 1.1.0
*/
var TauriEvent;
(function(TauriEvent$1) {
	TauriEvent$1["WINDOW_RESIZED"] = "tauri://resize";
	TauriEvent$1["WINDOW_MOVED"] = "tauri://move";
	TauriEvent$1["WINDOW_CLOSE_REQUESTED"] = "tauri://close-requested";
	TauriEvent$1["WINDOW_DESTROYED"] = "tauri://destroyed";
	TauriEvent$1["WINDOW_FOCUS"] = "tauri://focus";
	TauriEvent$1["WINDOW_BLUR"] = "tauri://blur";
	TauriEvent$1["WINDOW_SCALE_FACTOR_CHANGED"] = "tauri://scale-change";
	TauriEvent$1["WINDOW_THEME_CHANGED"] = "tauri://theme-changed";
	TauriEvent$1["WINDOW_CREATED"] = "tauri://window-created";
	TauriEvent$1["WEBVIEW_CREATED"] = "tauri://webview-created";
	TauriEvent$1["DRAG_ENTER"] = "tauri://drag-enter";
	TauriEvent$1["DRAG_OVER"] = "tauri://drag-over";
	TauriEvent$1["DRAG_DROP"] = "tauri://drag-drop";
	TauriEvent$1["DRAG_LEAVE"] = "tauri://drag-leave";
})(TauriEvent || (TauriEvent = {}));
/**
* Unregister the event listener associated with the given name and id.
*
* @ignore
* @param event The event name
* @param eventId Event identifier
* @returns
*/
async function _unlisten(event, eventId) {
	window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(event, eventId);
	await invoke("plugin:event|unlisten", {
		event,
		eventId
	});
}
/**
* Listen to an emitted event to any {@link EventTarget|target}.
*
* @example
* ```typescript
* import { listen } from '@tauri-apps/api/event';
* const unlisten = await listen<string>('error', (event) => {
*   console.log(`Got error, payload: ${event.payload}`);
* });
*
* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
* unlisten();
* ```
*
* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
* @param handler Event handler callback.
* @param options Event listening options.
* @returns A promise resolving to a function to unlisten to the event.
* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
*
* @since 1.0.0
*/
async function listen(event, handler, options) {
	var _a;
	const target = typeof (options === null || options === void 0 ? void 0 : options.target) === "string" ? {
		kind: "AnyLabel",
		label: options.target
	} : (_a = options === null || options === void 0 ? void 0 : options.target) !== null && _a !== void 0 ? _a : { kind: "Any" };
	return invoke("plugin:event|listen", {
		event,
		target,
		handler: transformCallback(handler)
	}).then((eventId) => {
		return async () => _unlisten(event, eventId);
	});
}

//#endregion
//#region node_modules/@janhq/core/dist/index.js
let AssistantEvent = function(AssistantEvent$1) {
	/** The `OnAssistantsUpdate` event is emitted when the assistant list is updated. */
	AssistantEvent$1["OnAssistantsUpdate"] = "OnAssistantsUpdate";
	return AssistantEvent$1;
}({});
let ModelEvent = function(ModelEvent$1) {
	/** The `OnModelInit` event is emitted when a model inits. */
	ModelEvent$1["OnModelInit"] = "OnModelInit";
	/** The `OnModelReady` event is emitted when a model ready. */
	ModelEvent$1["OnModelReady"] = "OnModelReady";
	/** The `OnModelFail` event is emitted when a model fails loading. */
	ModelEvent$1["OnModelFail"] = "OnModelFail";
	/** The `OnModelStop` event is emitted when a model start to stop. */
	ModelEvent$1["OnModelStop"] = "OnModelStop";
	/** The `OnModelStopped` event is emitted when a model stopped ok. */
	ModelEvent$1["OnModelStopped"] = "OnModelStopped";
	/** The `OnModelUpdate` event is emitted when the model list is updated. */
	ModelEvent$1["OnModelsUpdate"] = "OnModelsUpdate";
	return ModelEvent$1;
}({});
let MessageStatus = function(MessageStatus$1) {
	/** Message is fully loaded. **/
	MessageStatus$1["Ready"] = "ready";
	/** Message is not fully loaded. **/
	MessageStatus$1["Pending"] = "pending";
	/** Message loaded with error. **/
	MessageStatus$1["Error"] = "error";
	/** Message is cancelled streaming */
	MessageStatus$1["Stopped"] = "stopped";
	return MessageStatus$1;
}({});
let ErrorCode = function(ErrorCode$1) {
	ErrorCode$1["InvalidApiKey"] = "invalid_api_key";
	ErrorCode$1["AuthenticationError"] = "authentication_error";
	ErrorCode$1["InsufficientQuota"] = "insufficient_quota";
	ErrorCode$1["InvalidRequestError"] = "invalid_request_error";
	ErrorCode$1["Unknown"] = "unknown";
	return ErrorCode$1;
}({});
let ContentType = function(ContentType$1) {
	ContentType$1["Text"] = "text";
	ContentType$1["Image"] = "image_url";
	return ContentType$1;
}({});
let MessageEvent = function(MessageEvent$1) {
	/** The `OnMessageSent` event is emitted when a message is sent. */
	MessageEvent$1["OnMessageSent"] = "OnMessageSent";
	/** The `OnMessageResponse` event is emitted when a message is received. */
	MessageEvent$1["OnMessageResponse"] = "OnMessageResponse";
	/** The `OnMessageUpdate` event is emitted when a message is updated. */
	MessageEvent$1["OnMessageUpdate"] = "OnMessageUpdate";
	return MessageEvent$1;
}({});
let MessageRequestType = function(MessageRequestType$1) {
	MessageRequestType$1["Thread"] = "Thread";
	MessageRequestType$1["Assistant"] = "Assistant";
	MessageRequestType$1["Summary"] = "Summary";
	return MessageRequestType$1;
}({});
let ChatCompletionRole = function(ChatCompletionRole$1) {
	ChatCompletionRole$1["System"] = "system";
	ChatCompletionRole$1["Assistant"] = "assistant";
	ChatCompletionRole$1["User"] = "user";
	ChatCompletionRole$1["Tool"] = "tool";
	return ChatCompletionRole$1;
}({});
let ChatCompletionMessageContentType = function(ChatCompletionMessageContentType$1) {
	ChatCompletionMessageContentType$1["Text"] = "text";
	ChatCompletionMessageContentType$1["Image"] = "image_url";
	ChatCompletionMessageContentType$1["Doc"] = "doc_url";
	return ChatCompletionMessageContentType$1;
}({});
let InferenceEvent = function(InferenceEvent$1) {
	/** The `OnInferenceStopped` event is emitted when a inference is stopped. */
	InferenceEvent$1["OnInferenceStopped"] = "OnInferenceStopped";
	return InferenceEvent$1;
}({});
let AppConfigurationEventName = function(AppConfigurationEventName$1) {
	AppConfigurationEventName$1["OnConfigurationUpdate"] = "OnConfigurationUpdate";
	return AppConfigurationEventName$1;
}({});
let NativeRoute = function(NativeRoute$1) {
	NativeRoute$1["openExternalUrl"] = "openExternalUrl";
	NativeRoute$1["openAppDirectory"] = "openAppDirectory";
	NativeRoute$1["openFileExplore"] = "openFileExplorer";
	NativeRoute$1["selectDirectory"] = "selectDirectory";
	NativeRoute$1["selectFiles"] = "selectFiles";
	NativeRoute$1["relaunch"] = "relaunch";
	NativeRoute$1["setNativeThemeLight"] = "setNativeThemeLight";
	NativeRoute$1["setNativeThemeDark"] = "setNativeThemeDark";
	NativeRoute$1["setMinimizeApp"] = "setMinimizeApp";
	NativeRoute$1["setCloseApp"] = "setCloseApp";
	NativeRoute$1["setMaximizeApp"] = "setMaximizeApp";
	NativeRoute$1["showOpenMenu"] = "showOpenMenu";
	NativeRoute$1["hideQuickAskWindow"] = "hideQuickAskWindow";
	NativeRoute$1["sendQuickAskInput"] = "sendQuickAskInput";
	NativeRoute$1["hideMainWindow"] = "hideMainWindow";
	NativeRoute$1["showMainWindow"] = "showMainWindow";
	NativeRoute$1["quickAskSizeUpdated"] = "quickAskSizeUpdated";
	NativeRoute$1["ackDeepLink"] = "ackDeepLink";
	NativeRoute$1["factoryReset"] = "factoryReset";
	NativeRoute$1["startServer"] = "startServer";
	NativeRoute$1["stopServer"] = "stopServer";
	NativeRoute$1["appUpdateDownload"] = "appUpdateDownload";
	NativeRoute$1["appToken"] = "appToken";
	return NativeRoute$1;
}({});
let AppRoute = function(AppRoute$1) {
	AppRoute$1["getAppConfigurations"] = "getAppConfigurations";
	AppRoute$1["updateAppConfiguration"] = "updateAppConfiguration";
	AppRoute$1["joinPath"] = "joinPath";
	AppRoute$1["dirName"] = "dirName";
	AppRoute$1["isSubdirectory"] = "isSubdirectory";
	AppRoute$1["baseName"] = "baseName";
	AppRoute$1["log"] = "log";
	AppRoute$1["showToast"] = "showToast";
	return AppRoute$1;
}({});
let AppEvent = function(AppEvent$1) {
	AppEvent$1["onAppUpdateNotAvailable"] = "onAppUpdateNotAvailable";
	AppEvent$1["onAppUpdateAvailable"] = "onAppUpdateAvailable";
	AppEvent$1["onAppUpdateDownloadUpdate"] = "onAppUpdateDownloadUpdate";
	AppEvent$1["onAppUpdateDownloadError"] = "onAppUpdateDownloadError";
	AppEvent$1["onAppUpdateDownloadSuccess"] = "onAppUpdateDownloadSuccess";
	AppEvent$1["onModelImported"] = "onModelImported";
	AppEvent$1["onUserSubmitQuickAsk"] = "onUserSubmitQuickAsk";
	AppEvent$1["onSelectedText"] = "onSelectedText";
	AppEvent$1["onDeepLink"] = "onDeepLink";
	AppEvent$1["onMainViewStateChange"] = "onMainViewStateChange";
	return AppEvent$1;
}({});
let DownloadEvent = function(DownloadEvent$1) {
	DownloadEvent$1["onFileDownloadUpdate"] = "onFileDownloadUpdate";
	DownloadEvent$1["onFileDownloadError"] = "onFileDownloadError";
	DownloadEvent$1["onFileDownloadSuccess"] = "onFileDownloadSuccess";
	DownloadEvent$1["onFileDownloadStopped"] = "onFileDownloadStopped";
	DownloadEvent$1["onFileDownloadStarted"] = "onFileDownloadStarted";
	DownloadEvent$1["onModelValidationStarted"] = "onModelValidationStarted";
	DownloadEvent$1["onModelValidationFailed"] = "onModelValidationFailed";
	DownloadEvent$1["onFileDownloadAndVerificationSuccess"] = "onFileDownloadAndVerificationSuccess";
	return DownloadEvent$1;
}({});
let ExtensionRoute = function(ExtensionRoute$1) {
	ExtensionRoute$1["baseExtensions"] = "baseExtensions";
	ExtensionRoute$1["getActiveExtensions"] = "getActiveExtensions";
	ExtensionRoute$1["installExtension"] = "installExtension";
	ExtensionRoute$1["invokeExtensionFunc"] = "invokeExtensionFunc";
	ExtensionRoute$1["updateExtension"] = "updateExtension";
	ExtensionRoute$1["uninstallExtension"] = "uninstallExtension";
	return ExtensionRoute$1;
}({});
let FileSystemRoute = function(FileSystemRoute$1) {
	FileSystemRoute$1["appendFileSync"] = "appendFileSync";
	FileSystemRoute$1["unlinkSync"] = "unlinkSync";
	FileSystemRoute$1["existsSync"] = "existsSync";
	FileSystemRoute$1["readdirSync"] = "readdirSync";
	FileSystemRoute$1["rm"] = "rm";
	FileSystemRoute$1["mv"] = "mv";
	FileSystemRoute$1["mkdir"] = "mkdir";
	FileSystemRoute$1["readFileSync"] = "readFileSync";
	FileSystemRoute$1["writeFileSync"] = "writeFileSync";
	return FileSystemRoute$1;
}({});
let FileManagerRoute = function(FileManagerRoute$1) {
	FileManagerRoute$1["copyFile"] = "copyFile";
	FileManagerRoute$1["getJanDataFolderPath"] = "getJanDataFolderPath";
	FileManagerRoute$1["getResourcePath"] = "getResourcePath";
	FileManagerRoute$1["getUserHomePath"] = "getUserHomePath";
	FileManagerRoute$1["fileStat"] = "fileStat";
	FileManagerRoute$1["writeBlob"] = "writeBlob";
	FileManagerRoute$1["getGgufFiles"] = "getGgufFiles";
	return FileManagerRoute$1;
}({});
const CoreRoutes = [
	...Object.values(AppRoute),
	...Object.values(ExtensionRoute),
	...Object.values(FileSystemRoute),
	...Object.values(FileManagerRoute)
];
const APIRoutes = [...CoreRoutes, ...Object.values(NativeRoute)];
const APIEvents = [...Object.values(AppEvent), ...Object.values(DownloadEvent)];
let EngineEvent = function(EngineEvent$1) {
	EngineEvent$1["OnEngineUpdate"] = "OnEngineUpdate";
	return EngineEvent$1;
}({});
/**
* Adds an observer for an event.
*
* @param eventName The name of the event to observe.
* @param handler The handler function to call when the event is observed.
*/
const on = (eventName, handler) => {
	globalThis.core?.events?.on(eventName, handler);
};
/**
* Removes an observer for an event.
*
* @param eventName The name of the event to stop observing.
* @param handler The handler function to call when the event is observed.
*/
const off = (eventName, handler) => {
	globalThis.core?.events?.off(eventName, handler);
};
/**
* Emits an event.
*
* @param eventName The name of the event to emit.
* @param object The object to pass to the event callback.
*/
const emit = (eventName, object) => {
	globalThis.core?.events?.emit(eventName, object);
};
const events = {
	on,
	off,
	emit
};
var ModelManager = class ModelManager$1 {
	models = new Map();
	constructor() {
		if (window) window.core.modelManager = this;
	}
	/**
	* Registers a model.
	* @param model - The model to register.
	*/
	register(model) {
		if (this.models.has(model.id)) this.models.set(model.id, {
			...model,
			...this.models.get(model.id)
		});
else this.models.set(model.id, model);
		events.emit(ModelEvent.OnModelsUpdate, {});
	}
	/**
	* Retrieves a model by it's id.
	* @param id - The id of the model to retrieve.
	* @returns The model, if found.
	*/
	get(id) {
		return this.models.get(id);
	}
	/**
	* Shared instance of ExtensionManager.
	*/
	static instance() {
		if (!window.core.modelManager) window.core.modelManager = new ModelManager$1();
		return window.core.modelManager;
	}
};
let ExtensionTypeEnum = function(ExtensionTypeEnum$1) {
	ExtensionTypeEnum$1["Assistant"] = "assistant";
	ExtensionTypeEnum$1["Conversational"] = "conversational";
	ExtensionTypeEnum$1["Inference"] = "inference";
	ExtensionTypeEnum$1["Model"] = "model";
	ExtensionTypeEnum$1["SystemMonitoring"] = "systemMonitoring";
	ExtensionTypeEnum$1["MCP"] = "mcp";
	ExtensionTypeEnum$1["HuggingFace"] = "huggingFace";
	ExtensionTypeEnum$1["Engine"] = "engine";
	ExtensionTypeEnum$1["Hardware"] = "hardware";
	return ExtensionTypeEnum$1;
}({});
var BaseExtension = class {
	settingFolderName = "settings";
	settingFileName = "settings.json";
	/** @type {string} Name of the extension. */
	name;
	/** @type {string} Product Name of the extension. */
	productName;
	/** @type {string} The URL of the extension to load. */
	url;
	/** @type {boolean} Whether the extension is activated or not. */
	active;
	/** @type {string} Extension's description. */
	description;
	/** @type {string} Extension's version. */
	version;
	constructor(url, name, productName, active, description, version) {
		this.name = name;
		this.productName = productName;
		this.url = url;
		this.active = active;
		this.description = description;
		this.version = version;
	}
	/**
	* Returns the type of the extension.
	* @returns {ExtensionType} The type of the extension
	* Undefined means its not extending any known extension by the application.
	*/
	type() {
		return undefined;
	}
	/**
	* The compatibility of the extension.
	* This is used to check if the extension is compatible with the current environment.
	* @property {Array} platform
	*/
	compatibility() {
		return undefined;
	}
	/**
	* Registers models - it persists in-memory shared ModelManager instance's data map.
	* @param models
	*/
	async registerModels(models) {
		for (const model of models) ModelManager.instance().register(model);
	}
	/**
	* Register settings for the extension.
	* @param settings
	* @returns
	*/
	async registerSettings(settings) {
		if (!this.name) {
			console.error("Extension name is not defined");
			return;
		}
		settings.forEach((setting) => {
			setting.extensionName = this.name;
		});
		try {
			const oldSettingsJson = localStorage.getItem(this.name);
			if (oldSettingsJson) {
				const oldSettings = JSON.parse(oldSettingsJson);
				settings.forEach((setting) => {
					if (setting.controllerProps && Array.isArray(oldSettings)) setting.controllerProps.value = oldSettings.find((e) => e.key === setting.key)?.controllerProps?.value ?? setting.controllerProps.value;
					if ("options" in setting.controllerProps) setting.controllerProps.options = setting.controllerProps.options?.length ? setting.controllerProps.options : oldSettings.find((e) => e.key === setting.key)?.controllerProps?.options;
					if ("recommended" in setting.controllerProps) {
						const oldRecommended = oldSettings.find((e) => e.key === setting.key)?.controllerProps?.recommended;
						if (oldRecommended !== undefined && oldRecommended !== "") setting.controllerProps.recommended = oldRecommended;
					}
				});
			}
			localStorage.setItem(this.name, JSON.stringify(settings));
		} catch (err) {
			console.error(err);
		}
	}
	/**
	* Get the setting value for the key.
	* @param key
	* @param defaultValue
	* @returns
	*/
	async getSetting(key, defaultValue) {
		const keySetting = (await this.getSettings()).find((setting) => setting.key === key);
		const value = keySetting?.controllerProps.value;
		return value ?? defaultValue;
	}
	onSettingUpdate(key, value) {
		return;
	}
	/**
	* Install the prerequisites for the extension.
	*
	* @returns {Promise<void>}
	*/
	async install() {
		return;
	}
	/**
	* Get the settings for the extension.
	* @returns
	*/
	async getSettings() {
		if (!this.name) return [];
		try {
			const settingsString = localStorage.getItem(this.name);
			if (!settingsString) return [];
			const settings = JSON.parse(settingsString);
			return settings;
		} catch (err) {
			console.warn(err);
			return [];
		}
	}
	/**
	* Update the settings for the extension.
	* @param componentProps
	* @returns
	*/
	async updateSettings(componentProps) {
		if (!this.name) return;
		const settings = await this.getSettings();
		let updatedSettings = settings.map((setting) => {
			const updatedSetting = componentProps.find((componentProp) => componentProp.key === setting.key);
			if (updatedSetting && updatedSetting.controllerProps) setting.controllerProps.value = updatedSetting.controllerProps.value;
			return setting;
		});
		if (!updatedSettings.length) updatedSettings = componentProps;
		localStorage.setItem(this.name, JSON.stringify(updatedSettings));
		updatedSettings.forEach((setting) => {
			this.onSettingUpdate(setting.key, setting.controllerProps.value);
		});
	}
};

//#endregion
//#region src/index.ts
let Settings = function(Settings$1) {
	Settings$1["hfToken"] = "hf-token";
	return Settings$1;
}({});
var DownloadManager = class extends BaseExtension {
	hfToken;
	async onLoad() {
		this.registerSettings([{
			"key": "hf-token",
			"title": "Hugging Face Access Token",
			"description": "Access tokens programmatically authenticate your identity to the Hugging Face Hub, allowing applications to perform specific actions specified by the scope of permissions granted.",
			"controllerType": "input",
			"controllerProps": {
				"value": "",
				"placeholder": "hf_**********************************",
				"type": "password",
				"inputActions": ["unobscure", "copy"]
			}
		}]);
		this.hfToken = await this.getSetting(Settings.hfToken, undefined);
	}
	async onUnload() {}
	async downloadFile(url, savePath, taskId, proxyConfig = {}, onProgress) {
		return await this.downloadFiles([{
			url,
			save_path: savePath,
			proxy: proxyConfig
		}], taskId, onProgress);
	}
	onSettingUpdate(key, value) {
		if (key === Settings.hfToken) this.hfToken = value;
	}
	async downloadFiles(items, taskId, onProgress) {
		const unlisten = await listen(`download-${taskId}`, (event) => {
			if (onProgress) {
				let payload = event.payload;
				onProgress(payload.transferred, payload.total);
			}
		});
		try {
			await invoke("download_files", {
				items,
				taskId,
				headers: this._getHeaders()
			});
		} catch (error) {
			console.error("Error downloading task", taskId, error);
			throw error;
		} finally {
			unlisten();
		}
	}
	async cancelDownload(taskId) {
		try {
			await invoke("cancel_download_task", { taskId });
		} catch (error) {
			console.error("Error cancelling download:", error);
			throw error;
		}
	}
	_getHeaders() {
		return { ...this.hfToken && { Authorization: `Bearer ${this.hfToken}` } };
	}
};

//#endregion
export { Settings, DownloadManager as default };
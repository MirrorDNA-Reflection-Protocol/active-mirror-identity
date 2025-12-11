
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
function __classPrivateFieldGet$2(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet$2(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

//#endregion
//#region node_modules/@tauri-apps/api/core.js
var _Channel_onmessage$2, _Channel_nextMessageIndex$2, _Channel_pendingMessages$2, _Channel_messageEndIndex$2, _Resource_rid$2;
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
const SERIALIZE_TO_IPC_FN$2 = "__TAURI_TO_IPC_KEY__";
/**
* Stores the callback in a known location, and returns an identifier that can be passed to the backend.
* The backend uses the identifier to `eval()` the callback.
*
* @return An unique identifier associated with the callback function.
*
* @since 1.0.0
*/
function transformCallback$2(callback, once = false) {
	return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
var Channel$2 = class {
	constructor(onmessage) {
		_Channel_onmessage$2.set(this, void 0);
		_Channel_nextMessageIndex$2.set(this, 0);
		_Channel_pendingMessages$2.set(this, []);
		_Channel_messageEndIndex$2.set(this, void 0);
		__classPrivateFieldSet$2(this, _Channel_onmessage$2, onmessage || (() => {}), "f");
		this.id = transformCallback$2((rawMessage) => {
			const index = rawMessage.index;
			if ("end" in rawMessage) {
				if (index == __classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f")) this.cleanupCallback();
else __classPrivateFieldSet$2(this, _Channel_messageEndIndex$2, index, "f");
				return;
			}
			const message = rawMessage.message;
			if (index == __classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f")) {
				__classPrivateFieldGet$2(this, _Channel_onmessage$2, "f").call(this, message);
				__classPrivateFieldSet$2(this, _Channel_nextMessageIndex$2, __classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f") + 1, "f");
				while (__classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f") in __classPrivateFieldGet$2(this, _Channel_pendingMessages$2, "f")) {
					const message$1 = __classPrivateFieldGet$2(this, _Channel_pendingMessages$2, "f")[__classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f")];
					__classPrivateFieldGet$2(this, _Channel_onmessage$2, "f").call(this, message$1);
					delete __classPrivateFieldGet$2(this, _Channel_pendingMessages$2, "f")[__classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f")];
					__classPrivateFieldSet$2(this, _Channel_nextMessageIndex$2, __classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f") + 1, "f");
				}
				if (__classPrivateFieldGet$2(this, _Channel_nextMessageIndex$2, "f") === __classPrivateFieldGet$2(this, _Channel_messageEndIndex$2, "f")) this.cleanupCallback();
			} else __classPrivateFieldGet$2(this, _Channel_pendingMessages$2, "f")[index] = message;
		});
	}
	cleanupCallback() {
		window.__TAURI_INTERNALS__.unregisterCallback(this.id);
	}
	set onmessage(handler) {
		__classPrivateFieldSet$2(this, _Channel_onmessage$2, handler, "f");
	}
	get onmessage() {
		return __classPrivateFieldGet$2(this, _Channel_onmessage$2, "f");
	}
	[(_Channel_onmessage$2 = new WeakMap(), _Channel_nextMessageIndex$2 = new WeakMap(), _Channel_pendingMessages$2 = new WeakMap(), _Channel_messageEndIndex$2 = new WeakMap(), SERIALIZE_TO_IPC_FN$2)]() {
		return `__CHANNEL__:${this.id}`;
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN$2]();
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
async function invoke$2(cmd, args = {}, options) {
	return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
_Resource_rid$2 = new WeakMap();

//#endregion
//#region node_modules/@tauri-apps/plugin-http/dist-js/index.js
/**
* Make HTTP requests with the Rust backend.
*
* ## Security
*
* This API has a scope configuration that forces you to restrict the URLs that can be accessed using glob patterns.
*
* For instance, this scope configuration only allows making HTTP requests to all subdomains for `tauri.app` except for `https://private.tauri.app`:
* ```json
* {
*   "permissions": [
*     {
*       "identifier": "http:default",
*       "allow": [{ "url": "https://*.tauri.app" }],
*       "deny": [{ "url": "https://private.tauri.app" }]
*     }
*   ]
* }
* ```
* Trying to execute any API with a URL not configured on the scope results in a promise rejection due to denied access.
*
* @module
*/
const ERROR_REQUEST_CANCELLED = "Request cancelled";
/**
* Fetch a resource from the network. It returns a `Promise` that resolves to the
* `Response` to that `Request`, whether it is successful or not.
*
* @example
* ```typescript
* const response = await fetch("http://my.json.host/data.json");
* console.log(response.status);  // e.g. 200
* console.log(response.statusText); // e.g. "OK"
* const jsonData = await response.json();
* ```
*
* @since 2.0.0
*/
async function fetch(input, init) {
	const signal = init?.signal;
	if (signal?.aborted) throw new Error(ERROR_REQUEST_CANCELLED);
	const maxRedirections = init?.maxRedirections;
	const connectTimeout = init?.connectTimeout;
	const proxy = init?.proxy;
	const danger = init?.danger;
	if (init) {
		delete init.maxRedirections;
		delete init.connectTimeout;
		delete init.proxy;
		delete init.danger;
	}
	const headers = init?.headers ? init.headers instanceof Headers ? init.headers : new Headers(init.headers) : new Headers();
	const req = new Request(input, init);
	const buffer = await req.arrayBuffer();
	const data = buffer.byteLength !== 0 ? Array.from(new Uint8Array(buffer)) : null;
	for (const [key, value] of req.headers) if (!headers.get(key)) headers.set(key, value);
	const headersArray = headers instanceof Headers ? Array.from(headers.entries()) : Array.isArray(headers) ? headers : Object.entries(headers);
	const mappedHeaders = headersArray.map(([name, val]) => [name, typeof val === "string" ? val : val.toString()]);
	if (signal?.aborted) throw new Error(ERROR_REQUEST_CANCELLED);
	const rid = await invoke$2("plugin:http|fetch", { clientConfig: {
		method: req.method,
		url: req.url,
		headers: mappedHeaders,
		data,
		maxRedirections,
		connectTimeout,
		proxy,
		danger
	} });
	const abort = () => invoke$2("plugin:http|fetch_cancel", { rid });
	if (signal?.aborted) {
		abort();
		throw new Error(ERROR_REQUEST_CANCELLED);
	}
	signal?.addEventListener("abort", () => void abort());
	const { status, statusText, url, headers: responseHeaders, rid: responseRid } = await invoke$2("plugin:http|fetch_send", { rid });
	const body = [
		101,
		103,
		204,
		205,
		304
	].includes(status) ? null : new ReadableStream({ start: (controller) => {
		const streamChannel = new Channel$2();
		streamChannel.onmessage = (res$1) => {
			if (signal?.aborted) {
				controller.error(ERROR_REQUEST_CANCELLED);
				return;
			}
			const resUint8 = new Uint8Array(res$1);
			const lastByte = resUint8[resUint8.byteLength - 1];
			const actualRes = resUint8.slice(0, resUint8.byteLength - 1);
			if (lastByte == 1) {
				controller.close();
				return;
			}
			controller.enqueue(actualRes);
		};
		invoke$2("plugin:http|fetch_read_body", {
			rid: responseRid,
			streamChannel
		}).catch((e) => {
			controller.error(e);
		});
	} });
	const res = new Response(body, {
		status,
		statusText
	});
	Object.defineProperty(res, "url", { value: url });
	Object.defineProperty(res, "headers", { value: new Headers(responseHeaders) });
	return res;
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
* Gets Jan's data folder path.
*
* @returns {Promise<string>} A Promise that resolves with Jan's data folder path.
*/
const getJanDataFolderPath = () => globalThis.core.api?.getJanDataFolderPath();
/**
* Joins multiple paths together.
* @param paths - The paths to join.
* @returns {Promise<string>} A promise that resolves with the joined path.
*/
const joinPath = (args) => globalThis.core.api?.joinPath({ args });
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
/**
* Writes data to a file at the specified path.
* @returns {Promise<any>} A Promise that resolves when the file is written successfully.
*/
const writeFileSync = (...args) => globalThis.core.api?.writeFileSync({ args });
/**
* Writes blob data to a file at the specified path.
* @param path - The path to file.
* @param data - The blob data.
* @returns
*/
const writeBlob = (path, data) => globalThis.core.api?.writeBlob(path, data);
/**
* Reads the contents of a file at the specified path.
* @returns {Promise<any>} A Promise that resolves with the contents of the file.
*/
const readFileSync = (...args) => globalThis.core.api?.readFileSync({ args });
/**
* Check whether the file exists
* @param {string} path
* @returns {boolean} A boolean indicating whether the path is a file.
*/
const existsSync = (...args) => globalThis.core.api?.existsSync({ args });
/**
* List the directory files
* @returns {Promise<any>} A Promise that resolves with the contents of the directory.
*/
const readdirSync = (...args) => globalThis.core.api?.readdirSync({ args });
/**
* Creates a directory at the specified path.
* @returns {Promise<any>} A Promise that resolves when the directory is created successfully.
*/
const mkdir = (...args) => globalThis.core.api?.mkdir({ args });
/**
* Removes a directory at the specified path.
* @returns {Promise<any>} A Promise that resolves when the directory is removed successfully.
*/
const rm = (...args) => globalThis.core.api?.rm({ args });
/**
* Moves a file from the source path to the destination path.
* @returns {Promise<any>} A Promise that resolves when the file is moved successfully.
*/
const mv = (...args) => globalThis.core.api?.mv({ args });
/**
* Deletes a file from the local file system.
* @param {string} path - The path of the file to delete.
* @returns {Promise<any>} A Promise that resolves when the file is deleted.
*/
const unlinkSync = (...args) => globalThis.core.api?.unlinkSync(...args);
/**
* Appends data to a file at the specified path.
*/
const appendFileSync = (...args) => globalThis.core.api?.appendFileSync(...args);
/**
* Copies a file from the source path to the destination path.
* @param src
* @param dest
* @returns
*/
const copyFile = (src, dest) => globalThis.core.api?.copyFile(src, dest);
/**
* Gets the list of gguf files in a directory
*
* @param path - The paths to the file.
* @returns {Promise<{any}>} - A promise that resolves with the list of gguf and non-gguf files
*/
const getGgufFiles = (paths) => globalThis.core.api?.getGgufFiles(paths);
/**
* Gets the file's stats.
*
* @param path - The path to the file.
* @param outsideJanDataFolder - Whether the file is outside the Jan data folder.
* @returns {Promise<FileStat>} - A promise that resolves with the file's stats.
*/
const fileStat = (path) => globalThis.core.api?.fileStat({ args: path });
const fs = {
	writeFileSync,
	readFileSync,
	existsSync,
	readdirSync,
	mkdir,
	rm,
	mv,
	unlinkSync,
	appendFileSync,
	copyFile,
	fileStat,
	writeBlob,
	getGgufFiles
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
var EngineManager = class EngineManager$1 {
	engines = new Map();
	controller = null;
	/**
	* Registers an engine.
	* @param engine - The engine to register.
	*/
	register(engine) {
		this.engines.set(engine.provider, engine);
	}
	/**
	* Retrieves a engine by provider.
	* @param provider - The name of the engine to retrieve.
	* @returns The engine, if found.
	*/
	get(provider) {
		return this.engines.get(provider);
	}
	/**
	* The instance of the engine manager.
	*/
	static instance() {
		return window.core?.engineManager ?? new EngineManager$1();
	}
};
var AIEngine = class extends BaseExtension {
	/**
	* On extension load, subscribe to events.
	*/
	onLoad() {
		this.registerEngine();
	}
	/**
	* Registers AI Engines
	*/
	registerEngine() {
		EngineManager.instance().register(this);
	}
};

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
	await invoke$2("plugin:event|unlisten", {
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
	return invoke$2("plugin:event|listen", {
		event,
		target,
		handler: transformCallback$2(handler)
	}).then((eventId) => {
		return async () => _unlisten(event, eventId);
	});
}

//#endregion
//#region node_modules/@tauri-apps/plugin-log/dist-js/index.js
var LogLevel;
(function(LogLevel$1) {
	/**
	* The "trace" level.
	*
	* Designates very low priority, often extremely verbose, information.
	*/
	LogLevel$1[LogLevel$1["Trace"] = 1] = "Trace";
	/**
	* The "debug" level.
	*
	* Designates lower priority information.
	*/
	LogLevel$1[LogLevel$1["Debug"] = 2] = "Debug";
	/**
	* The "info" level.
	*
	* Designates useful information.
	*/
	LogLevel$1[LogLevel$1["Info"] = 3] = "Info";
	/**
	* The "warn" level.
	*
	* Designates hazardous situations.
	*/
	LogLevel$1[LogLevel$1["Warn"] = 4] = "Warn";
	/**
	* The "error" level.
	*
	* Designates very serious errors.
	*/
	LogLevel$1[LogLevel$1["Error"] = 5] = "Error";
})(LogLevel || (LogLevel = {}));
function getCallerLocation(stack) {
	if (!stack) return;
	if (stack.startsWith("Error")) {
		const lines = stack.split("\n");
		const callerLine = lines[3]?.trim();
		if (!callerLine) return;
		const regex = /at\s+(?<functionName>.*?)\s+\((?<fileName>.*?):(?<lineNumber>\d+):(?<columnNumber>\d+)\)/;
		const match = callerLine.match(regex);
		if (match) {
			const { functionName, fileName, lineNumber, columnNumber } = match.groups;
			return `${functionName}@${fileName}:${lineNumber}:${columnNumber}`;
		} else {
			const regexNoFunction = /at\s+(?<fileName>.*?):(?<lineNumber>\d+):(?<columnNumber>\d+)/;
			const matchNoFunction = callerLine.match(regexNoFunction);
			if (matchNoFunction) {
				const { fileName, lineNumber, columnNumber } = matchNoFunction.groups;
				return `<anonymous>@${fileName}:${lineNumber}:${columnNumber}`;
			}
		}
	} else {
		const traces = stack.split("\n").map((line) => line.split("@"));
		const filtered = traces.filter(([name, location]) => {
			return name.length > 0 && location !== "[native code]";
		});
		return filtered[2]?.filter((v) => v.length > 0).join("@");
	}
}
async function log(level, message, options) {
	const location = getCallerLocation(new Error().stack);
	const { file, line, keyValues } = options ?? {};
	await invoke$2("plugin:log|log", {
		level,
		message,
		location,
		file,
		line,
		keyValues
	});
}
/**
* Logs a message at the error level.
*
* @param message
*
* # Examples
*
* ```js
* import { error } from '@tauri-apps/plugin-log';
*
* const err_info = "No connection";
* const port = 22;
*
* error(`Error: ${err_info} on port ${port}`);
* ```
*/
async function error(message, options) {
	await log(LogLevel.Error, message, options);
}
/**
* Logs a message at the warn level.
*
* @param message
*
* # Examples
*
* ```js
* import { warn } from '@tauri-apps/plugin-log';
*
* const warn_description = "Invalid Input";
*
* warn(`Warning! {warn_description}!`);
* ```
*/
async function warn(message, options) {
	await log(LogLevel.Warn, message, options);
}
/**
* Logs a message at the info level.
*
* @param message
*
* # Examples
*
* ```js
* import { info } from '@tauri-apps/plugin-log';
*
* const conn_info = { port: 40, speed: 3.20 };
*
* info(`Connected to port {conn_info.port} at {conn_info.speed} Mb/s`);
* ```
*/
async function info(message, options) {
	await log(LogLevel.Info, message, options);
}

//#endregion
//#region src/util.ts
function basenameNoExt(filePath) {
	const VALID_EXTENSIONS = [".tar.gz", ".zip"];
	for (const ext of VALID_EXTENSIONS) if (filePath.toLowerCase().endsWith(ext)) return filePath.slice(0, -ext.length);
	const lastDotIndex = filePath.lastIndexOf(".");
	if (lastDotIndex > 0) return filePath.slice(0, lastDotIndex);
	return filePath;
}
function getProxyConfig() {
	try {
		const proxyConfigString = localStorage.getItem("setting-proxy-config");
		if (!proxyConfigString) return null;
		const proxyConfigData = JSON.parse(proxyConfigString);
		const proxyState = proxyConfigData?.state;
		if (!proxyState || !proxyState.proxyEnabled || !proxyState.proxyUrl) return null;
		const proxyConfig = { url: proxyState.proxyUrl };
		if (proxyState.proxyUsername && proxyState.proxyPassword) {
			proxyConfig.username = proxyState.proxyUsername;
			proxyConfig.password = proxyState.proxyPassword;
		}
		if (proxyState.noProxy) {
			const noProxyList = proxyState.noProxy.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
			if (noProxyList.length > 0) proxyConfig.no_proxy = noProxyList;
		}
		proxyConfig.ignore_ssl = proxyState.proxyIgnoreSSL;
		proxyConfig.verify_proxy_ssl = proxyState.verifyProxySSL;
		proxyConfig.verify_proxy_host_ssl = proxyState.verifyProxyHostSSL;
		proxyConfig.verify_peer_ssl = proxyState.verifyPeerSSL;
		proxyConfig.verify_host_ssl = proxyState.verifyHostSSL;
		console.log("Using proxy configuration:", {
			url: proxyState.proxyUrl,
			hasAuth: !!(proxyState.proxyUsername && proxyState.proxyPassword),
			noProxyCount: proxyConfig.no_proxy ? proxyConfig.no_proxy.length : 0,
			ignoreSSL: proxyState.proxyIgnoreSSL,
			verifyProxySSL: proxyState.verifyProxySSL,
			verifyProxyHostSSL: proxyState.verifyProxyHostSSL,
			verifyPeerSSL: proxyState.verifyPeerSSL,
			verifyHostSSL: proxyState.verifyHostSSL
		});
		return proxyConfig;
	} catch (error$1) {
		console.error("Failed to parse proxy configuration:", error$1);
		if (error$1 instanceof SyntaxError) return null;
		throw error$1;
	}
}

//#endregion
//#region node_modules/@tauri-apps/api/path.js
/**
* The path module provides utilities for working with file and directory paths.
*
* This package is also accessible with `window.__TAURI__.path` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
*
* It is recommended to allowlist only the APIs you use for optimal bundle size and security.
* @module
*/
/**
* @since 2.0.0
*/
var BaseDirectory;
(function(BaseDirectory$1) {
	/**
	* @see {@link audioDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Audio"] = 1] = "Audio";
	/**
	* @see {@link cacheDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Cache"] = 2] = "Cache";
	/**
	* @see {@link configDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Config"] = 3] = "Config";
	/**
	* @see {@link dataDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Data"] = 4] = "Data";
	/**
	* @see {@link localDataDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["LocalData"] = 5] = "LocalData";
	/**
	* @see {@link documentDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Document"] = 6] = "Document";
	/**
	* @see {@link downloadDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Download"] = 7] = "Download";
	/**
	* @see {@link pictureDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Picture"] = 8] = "Picture";
	/**
	* @see {@link publicDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Public"] = 9] = "Public";
	/**
	* @see {@link videoDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Video"] = 10] = "Video";
	/**
	* @see {@link resourceDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Resource"] = 11] = "Resource";
	/**
	* @see {@link tempDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Temp"] = 12] = "Temp";
	/**
	* @see {@link appConfigDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["AppConfig"] = 13] = "AppConfig";
	/**
	* @see {@link appDataDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["AppData"] = 14] = "AppData";
	/**
	* @see {@link appLocalDataDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["AppLocalData"] = 15] = "AppLocalData";
	/**
	* @see {@link appCacheDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["AppCache"] = 16] = "AppCache";
	/**
	* @see {@link appLogDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["AppLog"] = 17] = "AppLog";
	/**
	* @see {@link desktopDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Desktop"] = 18] = "Desktop";
	/**
	* @see {@link executableDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Executable"] = 19] = "Executable";
	/**
	* @see {@link fontDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Font"] = 20] = "Font";
	/**
	* @see {@link homeDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Home"] = 21] = "Home";
	/**
	* @see {@link runtimeDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Runtime"] = 22] = "Runtime";
	/**
	* @see {@link templateDir} for more information.
	*/
	BaseDirectory$1[BaseDirectory$1["Template"] = 23] = "Template";
})(BaseDirectory || (BaseDirectory = {}));
/**
* Returns the parent directory of a given `path`. Trailing directory separators are ignored.
* @example
* ```typescript
* import { dirname } from '@tauri-apps/api/path';
* const dir = await dirname('/path/to/somedir/');
* assert(dir === '/path/to');
* ```
*
* @since 1.0.0
*/
async function dirname(path) {
	return invoke$2("plugin:path|dirname", { path });
}
/**
* Returns the last portion of a `path`. Trailing directory separators are ignored.
* @example
* ```typescript
* import { basename } from '@tauri-apps/api/path';
* const base = await basename('path/to/app.conf');
* assert(base === 'app.conf');
* ```
* @param ext An optional file extension to be removed from the returned path.
*
* @since 1.0.0
*/
async function basename(path, ext) {
	return invoke$2("plugin:path|basename", {
		path,
		ext
	});
}

//#endregion
//#region ../../src-tauri/plugins/tauri-plugin-hardware/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
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
function __classPrivateFieldGet$1(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet$1(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

//#endregion
//#region ../../src-tauri/plugins/tauri-plugin-hardware/node_modules/@tauri-apps/api/core.js
var _Channel_onmessage$1, _Channel_nextMessageIndex$1, _Channel_pendingMessages$1, _Channel_messageEndIndex$1, _Resource_rid$1;
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
const SERIALIZE_TO_IPC_FN$1 = "__TAURI_TO_IPC_KEY__";
/**
* Stores the callback in a known location, and returns an identifier that can be passed to the backend.
* The backend uses the identifier to `eval()` the callback.
*
* @return An unique identifier associated with the callback function.
*
* @since 1.0.0
*/
function transformCallback$1(callback, once = false) {
	return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
var Channel$1 = class {
	constructor(onmessage) {
		_Channel_onmessage$1.set(this, void 0);
		_Channel_nextMessageIndex$1.set(this, 0);
		_Channel_pendingMessages$1.set(this, []);
		_Channel_messageEndIndex$1.set(this, void 0);
		__classPrivateFieldSet$1(this, _Channel_onmessage$1, onmessage || (() => {}), "f");
		this.id = transformCallback$1((rawMessage) => {
			const index = rawMessage.index;
			if ("end" in rawMessage) {
				if (index == __classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f")) this.cleanupCallback();
else __classPrivateFieldSet$1(this, _Channel_messageEndIndex$1, index, "f");
				return;
			}
			const message = rawMessage.message;
			if (index == __classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f")) {
				__classPrivateFieldGet$1(this, _Channel_onmessage$1, "f").call(this, message);
				__classPrivateFieldSet$1(this, _Channel_nextMessageIndex$1, __classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f") + 1, "f");
				while (__classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f") in __classPrivateFieldGet$1(this, _Channel_pendingMessages$1, "f")) {
					const message$1 = __classPrivateFieldGet$1(this, _Channel_pendingMessages$1, "f")[__classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f")];
					__classPrivateFieldGet$1(this, _Channel_onmessage$1, "f").call(this, message$1);
					delete __classPrivateFieldGet$1(this, _Channel_pendingMessages$1, "f")[__classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f")];
					__classPrivateFieldSet$1(this, _Channel_nextMessageIndex$1, __classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f") + 1, "f");
				}
				if (__classPrivateFieldGet$1(this, _Channel_nextMessageIndex$1, "f") === __classPrivateFieldGet$1(this, _Channel_messageEndIndex$1, "f")) this.cleanupCallback();
			} else __classPrivateFieldGet$1(this, _Channel_pendingMessages$1, "f")[index] = message;
		});
	}
	cleanupCallback() {
		window.__TAURI_INTERNALS__.unregisterCallback(this.id);
	}
	set onmessage(handler) {
		__classPrivateFieldSet$1(this, _Channel_onmessage$1, handler, "f");
	}
	get onmessage() {
		return __classPrivateFieldGet$1(this, _Channel_onmessage$1, "f");
	}
	[(_Channel_onmessage$1 = new WeakMap(), _Channel_nextMessageIndex$1 = new WeakMap(), _Channel_pendingMessages$1 = new WeakMap(), _Channel_messageEndIndex$1 = new WeakMap(), SERIALIZE_TO_IPC_FN$1)]() {
		return `__CHANNEL__:${this.id}`;
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN$1]();
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
async function invoke$1(cmd, args = {}, options) {
	return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
_Resource_rid$1 = new WeakMap();

//#endregion
//#region ../../src-tauri/plugins/tauri-plugin-hardware/dist-js/index.js
async function getSystemInfo() {
	return await invoke$1("plugin:hardware|get_system_info");
}
async function getSystemUsage() {
	return await invoke$1("plugin:hardware|get_system_usage");
}

//#endregion
//#region src/backend.ts
async function getLocalInstalledBackends() {
	const local = [];
	const janDataFolderPath = await getJanDataFolderPath();
	const backendsDir = await joinPath([
		janDataFolderPath,
		"llamacpp",
		"backends"
	]);
	if (await fs.existsSync(backendsDir)) {
		const versionDirs = await fs.readdirSync(backendsDir);
		if (!versionDirs) return local;
		for (const version of versionDirs) {
			const versionPath = await joinPath([backendsDir, version]);
			const versionName = await basename(versionPath);
			const versionStat = await fs.fileStat(versionPath);
			if (!versionStat?.isDirectory) continue;
			const backendTypes = await fs.readdirSync(versionPath);
			for (const backendType of backendTypes) {
				const backendName = await basename(backendType);
				if (await isBackendInstalled(backendType, versionName)) local.push({
					version: versionName,
					backend: backendName
				});
			}
		}
	}
	return local;
}
async function fetchRemoteSupportedBackends(supportedBackends) {
	const { releases } = await _fetchGithubReleases("menloresearch", "llama.cpp");
	releases.sort((a, b) => b.tag_name.localeCompare(a.tag_name));
	releases.splice(10);
	const remote = [];
	for (const release of releases) {
		const version = release.tag_name;
		const prefix = `llama-${version}-bin-`;
		for (const asset of release.assets) {
			const name = asset.name;
			if (!name.startsWith(prefix)) continue;
			const backend = basenameNoExt(name).slice(prefix.length);
			if (supportedBackends.includes(backend)) remote.push({
				version,
				backend
			});
		}
	}
	return remote;
}
async function listSupportedBackends() {
	const sysInfo = await getSystemInfo();
	const os_type = sysInfo.os_type;
	const arch = sysInfo.cpu.arch;
	const features = await _getSupportedFeatures();
	const sysType = `${os_type}-${arch}`;
	let supportedBackends = [];
	if (sysType == "windows-x86_64") {
		supportedBackends.push("win-noavx-x64");
		if (features.avx) supportedBackends.push("win-avx-x64");
		if (features.avx2) supportedBackends.push("win-avx2-x64");
		if (features.avx512) supportedBackends.push("win-avx512-x64");
		if (features.cuda11) if (features.avx512) supportedBackends.push("win-avx512-cuda-cu11.7-x64");
else if (features.avx2) supportedBackends.push("win-avx2-cuda-cu11.7-x64");
else if (features.avx) supportedBackends.push("win-avx-cuda-cu11.7-x64");
else supportedBackends.push("win-noavx-cuda-cu11.7-x64");
		if (features.cuda12) if (features.avx512) supportedBackends.push("win-avx512-cuda-cu12.0-x64");
else if (features.avx2) supportedBackends.push("win-avx2-cuda-cu12.0-x64");
else if (features.avx) supportedBackends.push("win-avx-cuda-cu12.0-x64");
else supportedBackends.push("win-noavx-cuda-cu12.0-x64");
		if (features.vulkan) supportedBackends.push("win-vulkan-x64");
	} else if (sysType === "windows-aarch64" || sysType === "windows-arm64") supportedBackends.push("win-arm64");
else if (sysType === "linux-x86_64" || sysType === "linux-x86") {
		supportedBackends.push("linux-noavx-x64");
		if (features.avx) supportedBackends.push("linux-avx-x64");
		if (features.avx2) supportedBackends.push("linux-avx2-x64");
		if (features.avx512) supportedBackends.push("linux-avx512-x64");
		if (features.cuda11) if (features.avx512) supportedBackends.push("linux-avx512-cuda-cu11.7-x64");
else if (features.avx2) supportedBackends.push("linux-avx2-cuda-cu11.7-x64");
else if (features.avx) supportedBackends.push("linux-avx-cuda-cu11.7-x64");
else supportedBackends.push("linux-noavx-cuda-cu11.7-x64");
		if (features.cuda12) if (features.avx512) supportedBackends.push("linux-avx512-cuda-cu12.0-x64");
else if (features.avx2) supportedBackends.push("linux-avx2-cuda-cu12.0-x64");
else if (features.avx) supportedBackends.push("linux-avx-cuda-cu12.0-x64");
else supportedBackends.push("linux-noavx-cuda-cu12.0-x64");
		if (features.vulkan) supportedBackends.push("linux-vulkan-x64");
	} else if (sysType === "linux-aarch64" || sysType === "linux-arm64") supportedBackends.push("linux-arm64");
else if (sysType === "macos-x86_64" || sysType === "macos-x86") supportedBackends.push("macos-x64");
else if (sysType === "macos-aarch64" || sysType === "macos-arm64") supportedBackends.push("macos-arm64");
	const remoteBackendVersions = await fetchRemoteSupportedBackends(supportedBackends);
	const localBackendVersions = await getLocalInstalledBackends();
	const mergedMap = new Map();
	for (const entry of remoteBackendVersions) mergedMap.set(`${entry.version}|${entry.backend}`, entry);
	for (const entry of localBackendVersions) mergedMap.set(`${entry.version}|${entry.backend}`, entry);
	const merged = Array.from(mergedMap.values());
	merged.sort((a, b) => {
		const versionCmp = b.version.localeCompare(a.version);
		return versionCmp !== 0 ? versionCmp : a.backend.localeCompare(b.backend);
	});
	return merged;
}
async function getBackendDir(backend, version) {
	const janDataFolderPath = await getJanDataFolderPath();
	const backendDir = await joinPath([
		janDataFolderPath,
		"llamacpp",
		"backends",
		version,
		backend
	]);
	return backendDir;
}
async function getBackendExePath(backend, version) {
	const exe_name = "llama-server";
	const backendDir = await getBackendDir(backend, version);
	let exePath;
	const buildDir = await joinPath([backendDir, "build"]);
	if (await fs.existsSync(buildDir)) exePath = await joinPath([
		backendDir,
		"build",
		"bin",
		exe_name
	]);
else exePath = await joinPath([backendDir, exe_name]);
	return exePath;
}
async function isBackendInstalled(backend, version) {
	const exePath = await getBackendExePath(backend, version);
	const result = await fs.existsSync(exePath);
	return result;
}
async function downloadBackend(backend, version, source = "github") {
	const janDataFolderPath = await getJanDataFolderPath();
	const llamacppPath = await joinPath([janDataFolderPath, "llamacpp"]);
	const backendDir = await getBackendDir(backend, version);
	const libDir = await joinPath([llamacppPath, "lib"]);
	const downloadManager = window.core.extensionManager.getByName("@janhq/download-extension");
	const proxyConfig = getProxyConfig();
	const platformName = "linux";
	const backendUrl = source === "github" ? `https://github.com/menloresearch/llama.cpp/releases/download/${version}/llama-${version}-bin-${backend}.tar.gz` : `https://catalog.jan.ai/llama.cpp/releases/${version}/llama-${version}-bin-${backend}.tar.gz`;
	const downloadItems = [{
		url: backendUrl,
		save_path: await joinPath([backendDir, "backend.tar.gz"]),
		proxy: proxyConfig
	}];
	if (backend.includes("cu11.7") && !await _isCudaInstalled("11.7")) downloadItems.push({
		url: source === "github" ? `https://github.com/menloresearch/llama.cpp/releases/download/${version}/cudart-llama-bin-${platformName}-cu11.7-x64.tar.gz` : `https://catalog.jan.ai/llama.cpp/releases/${version}/cudart-llama-bin-${platformName}-cu11.7-x64.tar.gz`,
		save_path: await joinPath([libDir, "cuda11.tar.gz"]),
		proxy: proxyConfig
	});
else if (backend.includes("cu12.0") && !await _isCudaInstalled("12.0")) downloadItems.push({
		url: source === "github" ? `https://github.com/menloresearch/llama.cpp/releases/download/${version}/cudart-llama-bin-${platformName}-cu12.0-x64.tar.gz` : `https://catalog.jan.ai/llama.cpp/releases/${version}/cudart-llama-bin-${platformName}-cu12.0-x64.tar.gz`,
		save_path: await joinPath([libDir, "cuda12.tar.gz"]),
		proxy: proxyConfig
	});
	const taskId = `llamacpp-${version}-${backend}`.replace(/\./g, "-");
	const downloadType = "Engine";
	console.log(`Downloading backend ${backend} version ${version} from ${source}: ${JSON.stringify(downloadItems)}`);
	let downloadCompleted = false;
	try {
		const onProgress = (transferred, total) => {
			events.emit("onFileDownloadUpdate", {
				modelId: taskId,
				percent: transferred / total,
				size: {
					transferred,
					total
				},
				downloadType
			});
			downloadCompleted = transferred === total;
		};
		await downloadManager.downloadFiles(downloadItems, taskId, onProgress);
		if (!downloadCompleted) {
			events.emit("onFileDownloadStopped", {
				modelId: taskId,
				downloadType
			});
			return;
		}
		for (const { save_path } of downloadItems) if (save_path.endsWith(".tar.gz")) {
			const parentDir = await dirname(save_path);
			await invoke$2("decompress", {
				path: save_path,
				outputDir: parentDir
			});
			await fs.rm(save_path);
		}
		events.emit("onFileDownloadSuccess", {
			modelId: taskId,
			downloadType
		});
	} catch (error$1) {
		if (source === "github" && error$1?.toString() !== "Error: Download cancelled") {
			console.warn(`GitHub download failed, falling back to CDN:`, error$1);
			return await downloadBackend(backend, version, "cdn");
		}
		console.error(`Failed to download backend ${backend}: `, error$1);
		events.emit("onFileDownloadError", {
			modelId: taskId,
			downloadType
		});
		throw error$1;
	}
}
async function _getSupportedFeatures() {
	const sysInfo = await getSystemInfo();
	const features = {
		avx: sysInfo.cpu.extensions.includes("avx"),
		avx2: sysInfo.cpu.extensions.includes("avx2"),
		avx512: sysInfo.cpu.extensions.includes("avx512"),
		cuda11: false,
		cuda12: false,
		vulkan: false
	};
	let minCuda11DriverVersion;
	let minCuda12DriverVersion;
	if (sysInfo.os_type === "linux") {
		minCuda11DriverVersion = "450.80.02";
		minCuda12DriverVersion = "525.60.13";
	} else if (sysInfo.os_type === "windows") {
		minCuda11DriverVersion = "452.39";
		minCuda12DriverVersion = "527.41";
	}
	for (const gpuInfo of sysInfo.gpus) {
		const driverVersion = gpuInfo.driver_version;
		if (gpuInfo.nvidia_info?.compute_capability) {
			if (compareVersions(driverVersion, minCuda11DriverVersion) >= 0) features.cuda11 = true;
			if (compareVersions(driverVersion, minCuda12DriverVersion) >= 0) features.cuda12 = true;
		}
		if (gpuInfo.vulkan_info?.api_version) features.vulkan = true;
	}
	return features;
}
/**
* Fetch releases with GitHub-first strategy and fallback to CDN on any error.
* CDN endpoint is expected to mirror GitHub releases JSON shape.
*/
async function _fetchGithubReleases(owner, repo) {
	const githubUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
	try {
		const response = await fetch(githubUrl);
		if (!response.ok) throw new Error(`GitHub error: ${response.status} ${response.statusText}`);
		const releases = await response.json();
		return {
			releases,
			source: "github"
		};
	} catch (_err) {
		const cdnUrl = "https://catalog.jan.ai/llama.cpp/releases/releases.json";
		const response = await fetch(cdnUrl);
		if (!response.ok) throw new Error(`Failed to fetch releases from both sources. CDN error: ${response.status} ${response.statusText}`);
		const releases = await response.json();
		return {
			releases,
			source: "cdn"
		};
	}
}
async function _isCudaInstalled(version) {
	const sysInfo = await getSystemInfo();
	const os_type = sysInfo.os_type;
	const libnameLookup = {
		"windows-11.7": `cudart64_110.dll`,
		"windows-12.0": `cudart64_12.dll`,
		"linux-11.7": `libcudart.so.11.0`,
		"linux-12.0": `libcudart.so.12`
	};
	const key = `${os_type}-${version}`;
	if (!(key in libnameLookup)) return false;
	const libname = libnameLookup[key];
	if (os_type === "linux") {
		const libPath = `/usr/local/cuda/lib64/${libname}`;
		if (await invoke$2("is_library_available", { library: libPath })) return true;
	} else if (os_type === "windows") {
		if (await invoke$2("is_library_available", { library: libname })) return true;
	}
	const janDataFolderPath = await getJanDataFolderPath();
	const cudartPath = await joinPath([
		janDataFolderPath,
		"llamacpp",
		"lib",
		libname
	]);
	return await fs.existsSync(cudartPath);
}
function compareVersions(a, b) {
	const aParts = a.split(".").map(Number);
	const bParts = b.split(".").map(Number);
	const len = Math.max(aParts.length, bParts.length);
	for (let i = 0; i < len; i++) {
		const x = aParts[i] || 0;
		const y = bParts[i] || 0;
		if (x > y) return 1;
		if (x < y) return -1;
	}
	return 0;
}

//#endregion
//#region ../../src-tauri/plugins/tauri-plugin-llamacpp/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
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
//#region ../../src-tauri/plugins/tauri-plugin-llamacpp/node_modules/@tauri-apps/api/core.js
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
//#region ../../src-tauri/plugins/tauri-plugin-llamacpp/dist-js/index.js
async function readGgufMetadata(path) {
	return await invoke("plugin:llamacpp|read_gguf_metadata", { path });
}
async function getModelSize(path) {
	return await invoke("plugin:llamacpp|get_model_size", { path });
}
async function isModelSupported(path, ctxSize) {
	return await invoke("plugin:llamacpp|is_model_supported", {
		path,
		ctxSize
	});
}
async function planModelLoadInternal(path, memoryMode, mmprojPath, requestedContext) {
	return await invoke("plugin:llamacpp|plan_model_load", {
		path,
		memoryMode,
		mmprojPath,
		requestedContext
	});
}

//#endregion
//#region src/index.ts
const OUT_OF_CONTEXT_SIZE = "the request exceeds the available context size.";
/**
* Override the default app.log function to use Jan's logging system.
* @param args
*/
const logger = {
	info: function(...args) {
		console.log(...args);
		info(args.map((arg) => ` ${arg}`).join(` `));
	},
	warn: function(...args) {
		console.warn(...args);
		warn(args.map((arg) => ` ${arg}`).join(` `));
	},
	error: function(...args) {
		console.error(...args);
		error(args.map((arg) => ` ${arg}`).join(` `));
	}
};
var llamacpp_extension = class extends AIEngine {
	provider = "llamacpp";
	autoUnload = true;
	llamacpp_env = "";
	memoryMode = "";
	providerId = "llamacpp";
	config;
	providerPath;
	apiSecret = "JustAskNow";
	pendingDownloads = new Map();
	isConfiguringBackends = false;
	loadingModels = new Map();
	unlistenValidationStarted;
	async onLoad() {
		super.onLoad();
		let settings = structuredClone([
			{
				"key": "version_backend",
				"title": "Version & Backend",
				"description": "Version and Backend for llama.cpp",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": "none",
					"options": [],
					"recommended": ""
				}
			},
			{
				"key": "llamacpp_env",
				"title": "Environmental variables",
				"description": "Environmental variables for llama.cpp(KEY=VALUE), separated by ';'",
				"controllerType": "input",
				"controllerProps": {
					"value": "",
					"placeholder": "Eg. GGML_VK_VISIBLE_DEVICES=0,1",
					"type": "text",
					"textAlign": "right"
				}
			},
			{
				"key": "auto_update_engine",
				"title": "Auto update engine",
				"description": "Automatically update llamacpp engine to latest version",
				"controllerType": "checkbox",
				"controllerProps": { "value": true }
			},
			{
				"key": "auto_unload",
				"title": "Auto-Unload Old Models",
				"description": "Automatically unloads models that are not in use to free up memory. Ensure only one model is loaded at a time.",
				"controllerType": "checkbox",
				"controllerProps": { "value": true }
			},
			{
				"key": "memory_util",
				"title": "Smart Memory utilization",
				"description": "Smart memory utilization mode for running local GGUF models",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": "high",
					"options": [
						{
							"value": "high",
							"name": "High"
						},
						{
							"value": "medium",
							"name": "Medium"
						},
						{
							"value": "low",
							"name": "Low"
						}
					],
					"recommended": "high"
				}
			},
			{
				"key": "threads",
				"title": "Threads",
				"description": "Number of threads to use during generation (-1 for logical cores).",
				"controllerType": "input",
				"controllerProps": {
					"value": -1,
					"placeholder": "-1",
					"type": "number",
					"textAlign": "right"
				}
			},
			{
				"key": "threads_batch",
				"title": "Threads (Batch)",
				"description": "Number of threads for batch and prompt processing (default: same as Threads).",
				"controllerType": "input",
				"controllerProps": {
					"value": -1,
					"placeholder": "-1 (same as Threads)",
					"type": "number",
					"textAlign": "right"
				}
			},
			{
				"key": "ctx_shift",
				"title": "Context Shift",
				"description": "Allow model to cut text in the beginning to accommodate new text in its memory",
				"controllerType": "checkbox",
				"controllerProps": { "value": false }
			},
			{
				"key": "n_predict",
				"title": "Max Tokens to Predict",
				"description": "Maximum number of tokens to generate (-1 = infinity).",
				"controllerType": "input",
				"controllerProps": {
					"value": -1,
					"placeholder": "-1",
					"type": "number",
					"textAlign": "right"
				}
			},
			{
				"key": "ubatch_size",
				"title": "uBatch Size",
				"description": "Physical maximum batch size for processing prompts.",
				"controllerType": "input",
				"controllerProps": {
					"value": 512,
					"placeholder": "512",
					"type": "number",
					"textAlign": "right"
				}
			},
			{
				"key": "device",
				"title": "Devices for Offload",
				"description": "Comma-separated list of devices to use for offloading (e.g., 'CUDA0', 'CUDA0,CUDA1'). Leave empty to use default/CPU only.",
				"controllerType": "input",
				"controllerProps": {
					"value": "",
					"placeholder": "CUDA0",
					"type": "text"
				}
			},
			{
				"key": "split_mode",
				"title": "GPU Split Mode",
				"description": "How to split the model across multiple GPUs.",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": "layer",
					"options": [
						{
							"value": "none",
							"name": "None"
						},
						{
							"value": "layer",
							"name": "Layer"
						},
						{
							"value": "row",
							"name": "Row"
						}
					]
				}
			},
			{
				"key": "main_gpu",
				"title": "Main GPU Index",
				"description": "The GPU to use for the model (split-mode=none) or intermediate results (split-mode=row).",
				"controllerType": "input",
				"controllerProps": {
					"value": 0,
					"placeholder": "0",
					"type": "number",
					"textAlign": "right"
				}
			},
			{
				"key": "flash_attn",
				"title": "Flash Attention",
				"description": "Enable Flash Attention for optimized performance.",
				"controllerType": "checkbox",
				"controllerProps": { "value": false }
			},
			{
				"key": "cont_batching",
				"title": "Continuous Batching",
				"description": "Enable continuous batching (a.k.a dynamic batching) for concurrent requests.",
				"controllerType": "checkbox",
				"controllerProps": { "value": false }
			},
			{
				"key": "no_mmap",
				"title": "Disable mmap",
				"description": "Do not memory-map model (slower load but may reduce pageouts if not using mlock).",
				"controllerType": "checkbox",
				"controllerProps": { "value": false }
			},
			{
				"key": "mlock",
				"title": "MLock",
				"description": "Force system to keep model in RAM, preventing swapping/compression.",
				"controllerType": "checkbox",
				"controllerProps": { "value": false }
			},
			{
				"key": "cache_type_k",
				"title": "KV Cache K Type",
				"description": "KV cache data type for Keys (default: f16).",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": "f16",
					"options": [
						{
							"value": "f32",
							"name": "f32"
						},
						{
							"value": "f16",
							"name": "f16"
						},
						{
							"value": "bf16",
							"name": "bf16"
						},
						{
							"value": "q8_0",
							"name": "q8_0"
						},
						{
							"value": "q4_0",
							"name": "q4_0"
						},
						{
							"value": "q4_1",
							"name": "q4_1"
						},
						{
							"value": "iq4_nl",
							"name": "iq4_nl"
						},
						{
							"value": "q5_0",
							"name": "q5_0"
						},
						{
							"value": "q5_1",
							"name": "q5_1"
						}
					]
				}
			},
			{
				"key": "cache_type_v",
				"title": "KV Cache V Type",
				"description": "KV cache data type for Values (default: f16).",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": "f16",
					"options": [
						{
							"value": "f32",
							"name": "f32"
						},
						{
							"value": "f16",
							"name": "f16"
						},
						{
							"value": "bf16",
							"name": "bf16"
						},
						{
							"value": "q8_0",
							"name": "q8_0"
						},
						{
							"value": "q4_0",
							"name": "q4_0"
						},
						{
							"value": "q4_1",
							"name": "q4_1"
						},
						{
							"value": "iq4_nl",
							"name": "iq4_nl"
						},
						{
							"value": "q5_0",
							"name": "q5_0"
						},
						{
							"value": "q5_1",
							"name": "q5_1"
						}
					]
				}
			},
			{
				"key": "defrag_thold",
				"title": "KV Cache Defragmentation Threshold",
				"description": "Threshold for KV cache defragmentation (< 0 to disable).",
				"controllerType": "input",
				"controllerProps": {
					"value": .1,
					"placeholder": "0.1",
					"type": "number",
					"textAlign": "right",
					"step": .01
				}
			},
			{
				"key": "rope_scaling",
				"title": "RoPE Scaling Method",
				"description": "RoPE frequency scaling method.",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": "none",
					"options": [
						{
							"value": "none",
							"name": "None"
						},
						{
							"value": "linear",
							"name": "Linear"
						},
						{
							"value": "yarn",
							"name": "YaRN"
						}
					]
				}
			},
			{
				"key": "rope_scale",
				"title": "RoPE Scale Factor",
				"description": "RoPE context scaling factor.",
				"controllerType": "input",
				"controllerProps": {
					"value": 1,
					"placeholder": "1.0",
					"type": "number",
					"textAlign": "right",
					"min": 0,
					"step": .01
				}
			},
			{
				"key": "rope_freq_base",
				"title": "RoPE Frequency Base",
				"description": "RoPE base frequency (0 = loaded from model).",
				"controllerType": "input",
				"controllerProps": {
					"value": 0,
					"placeholder": "0 (model default)",
					"type": "number",
					"textAlign": "right"
				}
			},
			{
				"key": "rope_freq_scale",
				"title": "RoPE Frequency Scale Factor",
				"description": "RoPE frequency scaling factor.",
				"controllerType": "input",
				"controllerProps": {
					"value": 1,
					"placeholder": "1.0",
					"type": "number",
					"textAlign": "right",
					"min": 0,
					"step": .01
				}
			},
			{
				"key": "mirostat",
				"title": "Mirostat Mode",
				"description": "Use Mirostat sampling (0: disabled, 1: Mirostat V1, 2: Mirostat V2).",
				"controllerType": "dropdown",
				"controllerProps": {
					"value": 0,
					"options": [
						{
							"value": 0,
							"name": "Disabled"
						},
						{
							"value": 1,
							"name": "Mirostat V1"
						},
						{
							"value": 2,
							"name": "Mirostat V2"
						}
					]
				}
			},
			{
				"key": "mirostat_lr",
				"title": "Mirostat Learning Rate",
				"description": "Mirostat learning rate (eta).",
				"controllerType": "input",
				"controllerProps": {
					"value": .1,
					"placeholder": "0.1",
					"type": "number",
					"textAlign": "right",
					"min": 0,
					"step": .01
				}
			},
			{
				"key": "mirostat_ent",
				"title": "Mirostat Target Entropy",
				"description": "Mirostat target entropy (tau).",
				"controllerType": "input",
				"controllerProps": {
					"value": 5,
					"placeholder": "5.0",
					"type": "number",
					"textAlign": "right",
					"min": 0,
					"step": .01
				}
			},
			{
				"key": "grammar_file",
				"title": "Grammar File",
				"description": "Path to a BNF-like grammar file to constrain generations.",
				"controllerType": "input",
				"controllerProps": {
					"value": "",
					"placeholder": "path/to/grammar.gbnf",
					"type": "text"
				}
			},
			{
				"key": "json_schema_file",
				"title": "JSON Schema File",
				"description": "Path to a JSON schema file to constrain generations.",
				"controllerType": "input",
				"controllerProps": {
					"value": "",
					"placeholder": "path/to/schema.json",
					"type": "text"
				}
			}
		]);
		this.registerSettings(settings);
		let loadedConfig = {};
		for (const item of settings) {
			const defaultValue = item.controllerProps.value;
			loadedConfig[item.key] = await this.getSetting(item.key, defaultValue);
		}
		this.config = loadedConfig;
		this.autoUnload = this.config.auto_unload;
		this.llamacpp_env = this.config.llamacpp_env;
		this.memoryMode = this.config.memory_util || "high";
		this.providerPath = await joinPath([await getJanDataFolderPath(), this.providerId]);
		this.unlistenValidationStarted = await listen("onModelValidationStarted", (event) => {
			console.debug("LlamaCPP: bridging onModelValidationStarted event", event.payload);
			events.emit(DownloadEvent.onModelValidationStarted, event.payload);
		});
		this.configureBackends();
	}
	getStoredBackendType() {
		try {
			return localStorage.getItem("llama_cpp_backend_type");
		} catch (error$1) {
			logger.warn("Failed to read backend type from localStorage:", error$1);
			return null;
		}
	}
	setStoredBackendType(backendType) {
		try {
			localStorage.setItem("llama_cpp_backend_type", backendType);
			logger.info(`Stored backend type preference: ${backendType}`);
		} catch (error$1) {
			logger.warn("Failed to store backend type in localStorage:", error$1);
		}
	}
	clearStoredBackendType() {
		try {
			localStorage.removeItem("llama_cpp_backend_type");
			logger.info("Cleared stored backend type preference");
		} catch (error$1) {
			logger.warn("Failed to clear backend type from localStorage:", error$1);
		}
	}
	findLatestVersionForBackend(version_backends, backendType) {
		const matchingBackends = version_backends.filter((vb) => vb.backend === backendType);
		if (matchingBackends.length === 0) return null;
		matchingBackends.sort((a, b) => b.version.localeCompare(a.version));
		return `${matchingBackends[0].version}/${matchingBackends[0].backend}`;
	}
	async configureBackends() {
		if (this.isConfiguringBackends) {
			logger.info("configureBackends already in progress, skipping duplicate call");
			return;
		}
		this.isConfiguringBackends = true;
		try {
			let version_backends = [];
			try {
				version_backends = await listSupportedBackends();
				if (version_backends.length === 0) throw new Error("No supported backend binaries found for this system. Backend selection and auto-update will be unavailable.");
else version_backends.sort((a, b) => b.version.localeCompare(a.version));
			} catch (error$1) {
				throw new Error(`Failed to fetch supported backends: ${error$1 instanceof Error ? error$1.message : error$1}`);
			}
			const storedBackendType = this.getStoredBackendType();
			let bestAvailableBackendString = "";
			if (storedBackendType) {
				const preferredBackendString = this.findLatestVersionForBackend(version_backends, storedBackendType);
				if (preferredBackendString) {
					bestAvailableBackendString = preferredBackendString;
					logger.info(`Using stored backend preference: ${bestAvailableBackendString}`);
				} else {
					logger.warn(`Stored backend type '${storedBackendType}' not available, falling back to best backend`);
					this.clearStoredBackendType();
					bestAvailableBackendString = await this.determineBestBackend(version_backends);
				}
			} else bestAvailableBackendString = await this.determineBestBackend(version_backends);
			let settings = structuredClone([
				{
					"key": "version_backend",
					"title": "Version & Backend",
					"description": "Version and Backend for llama.cpp",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": "none",
						"options": [],
						"recommended": ""
					}
				},
				{
					"key": "llamacpp_env",
					"title": "Environmental variables",
					"description": "Environmental variables for llama.cpp(KEY=VALUE), separated by ';'",
					"controllerType": "input",
					"controllerProps": {
						"value": "",
						"placeholder": "Eg. GGML_VK_VISIBLE_DEVICES=0,1",
						"type": "text",
						"textAlign": "right"
					}
				},
				{
					"key": "auto_update_engine",
					"title": "Auto update engine",
					"description": "Automatically update llamacpp engine to latest version",
					"controllerType": "checkbox",
					"controllerProps": { "value": true }
				},
				{
					"key": "auto_unload",
					"title": "Auto-Unload Old Models",
					"description": "Automatically unloads models that are not in use to free up memory. Ensure only one model is loaded at a time.",
					"controllerType": "checkbox",
					"controllerProps": { "value": true }
				},
				{
					"key": "memory_util",
					"title": "Smart Memory utilization",
					"description": "Smart memory utilization mode for running local GGUF models",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": "high",
						"options": [
							{
								"value": "high",
								"name": "High"
							},
							{
								"value": "medium",
								"name": "Medium"
							},
							{
								"value": "low",
								"name": "Low"
							}
						],
						"recommended": "high"
					}
				},
				{
					"key": "threads",
					"title": "Threads",
					"description": "Number of threads to use during generation (-1 for logical cores).",
					"controllerType": "input",
					"controllerProps": {
						"value": -1,
						"placeholder": "-1",
						"type": "number",
						"textAlign": "right"
					}
				},
				{
					"key": "threads_batch",
					"title": "Threads (Batch)",
					"description": "Number of threads for batch and prompt processing (default: same as Threads).",
					"controllerType": "input",
					"controllerProps": {
						"value": -1,
						"placeholder": "-1 (same as Threads)",
						"type": "number",
						"textAlign": "right"
					}
				},
				{
					"key": "ctx_shift",
					"title": "Context Shift",
					"description": "Allow model to cut text in the beginning to accommodate new text in its memory",
					"controllerType": "checkbox",
					"controllerProps": { "value": false }
				},
				{
					"key": "n_predict",
					"title": "Max Tokens to Predict",
					"description": "Maximum number of tokens to generate (-1 = infinity).",
					"controllerType": "input",
					"controllerProps": {
						"value": -1,
						"placeholder": "-1",
						"type": "number",
						"textAlign": "right"
					}
				},
				{
					"key": "ubatch_size",
					"title": "uBatch Size",
					"description": "Physical maximum batch size for processing prompts.",
					"controllerType": "input",
					"controllerProps": {
						"value": 512,
						"placeholder": "512",
						"type": "number",
						"textAlign": "right"
					}
				},
				{
					"key": "device",
					"title": "Devices for Offload",
					"description": "Comma-separated list of devices to use for offloading (e.g., 'CUDA0', 'CUDA0,CUDA1'). Leave empty to use default/CPU only.",
					"controllerType": "input",
					"controllerProps": {
						"value": "",
						"placeholder": "CUDA0",
						"type": "text"
					}
				},
				{
					"key": "split_mode",
					"title": "GPU Split Mode",
					"description": "How to split the model across multiple GPUs.",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": "layer",
						"options": [
							{
								"value": "none",
								"name": "None"
							},
							{
								"value": "layer",
								"name": "Layer"
							},
							{
								"value": "row",
								"name": "Row"
							}
						]
					}
				},
				{
					"key": "main_gpu",
					"title": "Main GPU Index",
					"description": "The GPU to use for the model (split-mode=none) or intermediate results (split-mode=row).",
					"controllerType": "input",
					"controllerProps": {
						"value": 0,
						"placeholder": "0",
						"type": "number",
						"textAlign": "right"
					}
				},
				{
					"key": "flash_attn",
					"title": "Flash Attention",
					"description": "Enable Flash Attention for optimized performance.",
					"controllerType": "checkbox",
					"controllerProps": { "value": false }
				},
				{
					"key": "cont_batching",
					"title": "Continuous Batching",
					"description": "Enable continuous batching (a.k.a dynamic batching) for concurrent requests.",
					"controllerType": "checkbox",
					"controllerProps": { "value": false }
				},
				{
					"key": "no_mmap",
					"title": "Disable mmap",
					"description": "Do not memory-map model (slower load but may reduce pageouts if not using mlock).",
					"controllerType": "checkbox",
					"controllerProps": { "value": false }
				},
				{
					"key": "mlock",
					"title": "MLock",
					"description": "Force system to keep model in RAM, preventing swapping/compression.",
					"controllerType": "checkbox",
					"controllerProps": { "value": false }
				},
				{
					"key": "cache_type_k",
					"title": "KV Cache K Type",
					"description": "KV cache data type for Keys (default: f16).",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": "f16",
						"options": [
							{
								"value": "f32",
								"name": "f32"
							},
							{
								"value": "f16",
								"name": "f16"
							},
							{
								"value": "bf16",
								"name": "bf16"
							},
							{
								"value": "q8_0",
								"name": "q8_0"
							},
							{
								"value": "q4_0",
								"name": "q4_0"
							},
							{
								"value": "q4_1",
								"name": "q4_1"
							},
							{
								"value": "iq4_nl",
								"name": "iq4_nl"
							},
							{
								"value": "q5_0",
								"name": "q5_0"
							},
							{
								"value": "q5_1",
								"name": "q5_1"
							}
						]
					}
				},
				{
					"key": "cache_type_v",
					"title": "KV Cache V Type",
					"description": "KV cache data type for Values (default: f16).",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": "f16",
						"options": [
							{
								"value": "f32",
								"name": "f32"
							},
							{
								"value": "f16",
								"name": "f16"
							},
							{
								"value": "bf16",
								"name": "bf16"
							},
							{
								"value": "q8_0",
								"name": "q8_0"
							},
							{
								"value": "q4_0",
								"name": "q4_0"
							},
							{
								"value": "q4_1",
								"name": "q4_1"
							},
							{
								"value": "iq4_nl",
								"name": "iq4_nl"
							},
							{
								"value": "q5_0",
								"name": "q5_0"
							},
							{
								"value": "q5_1",
								"name": "q5_1"
							}
						]
					}
				},
				{
					"key": "defrag_thold",
					"title": "KV Cache Defragmentation Threshold",
					"description": "Threshold for KV cache defragmentation (< 0 to disable).",
					"controllerType": "input",
					"controllerProps": {
						"value": .1,
						"placeholder": "0.1",
						"type": "number",
						"textAlign": "right",
						"step": .01
					}
				},
				{
					"key": "rope_scaling",
					"title": "RoPE Scaling Method",
					"description": "RoPE frequency scaling method.",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": "none",
						"options": [
							{
								"value": "none",
								"name": "None"
							},
							{
								"value": "linear",
								"name": "Linear"
							},
							{
								"value": "yarn",
								"name": "YaRN"
							}
						]
					}
				},
				{
					"key": "rope_scale",
					"title": "RoPE Scale Factor",
					"description": "RoPE context scaling factor.",
					"controllerType": "input",
					"controllerProps": {
						"value": 1,
						"placeholder": "1.0",
						"type": "number",
						"textAlign": "right",
						"min": 0,
						"step": .01
					}
				},
				{
					"key": "rope_freq_base",
					"title": "RoPE Frequency Base",
					"description": "RoPE base frequency (0 = loaded from model).",
					"controllerType": "input",
					"controllerProps": {
						"value": 0,
						"placeholder": "0 (model default)",
						"type": "number",
						"textAlign": "right"
					}
				},
				{
					"key": "rope_freq_scale",
					"title": "RoPE Frequency Scale Factor",
					"description": "RoPE frequency scaling factor.",
					"controllerType": "input",
					"controllerProps": {
						"value": 1,
						"placeholder": "1.0",
						"type": "number",
						"textAlign": "right",
						"min": 0,
						"step": .01
					}
				},
				{
					"key": "mirostat",
					"title": "Mirostat Mode",
					"description": "Use Mirostat sampling (0: disabled, 1: Mirostat V1, 2: Mirostat V2).",
					"controllerType": "dropdown",
					"controllerProps": {
						"value": 0,
						"options": [
							{
								"value": 0,
								"name": "Disabled"
							},
							{
								"value": 1,
								"name": "Mirostat V1"
							},
							{
								"value": 2,
								"name": "Mirostat V2"
							}
						]
					}
				},
				{
					"key": "mirostat_lr",
					"title": "Mirostat Learning Rate",
					"description": "Mirostat learning rate (eta).",
					"controllerType": "input",
					"controllerProps": {
						"value": .1,
						"placeholder": "0.1",
						"type": "number",
						"textAlign": "right",
						"min": 0,
						"step": .01
					}
				},
				{
					"key": "mirostat_ent",
					"title": "Mirostat Target Entropy",
					"description": "Mirostat target entropy (tau).",
					"controllerType": "input",
					"controllerProps": {
						"value": 5,
						"placeholder": "5.0",
						"type": "number",
						"textAlign": "right",
						"min": 0,
						"step": .01
					}
				},
				{
					"key": "grammar_file",
					"title": "Grammar File",
					"description": "Path to a BNF-like grammar file to constrain generations.",
					"controllerType": "input",
					"controllerProps": {
						"value": "",
						"placeholder": "path/to/grammar.gbnf",
						"type": "text"
					}
				},
				{
					"key": "json_schema_file",
					"title": "JSON Schema File",
					"description": "Path to a JSON schema file to constrain generations.",
					"controllerType": "input",
					"controllerProps": {
						"value": "",
						"placeholder": "path/to/schema.json",
						"type": "text"
					}
				}
			]);
			const backendSettingIndex = settings.findIndex((item) => item.key === "version_backend");
			let originalDefaultBackendValue = "";
			if (backendSettingIndex !== -1) {
				const backendSetting = settings[backendSettingIndex];
				originalDefaultBackendValue = backendSetting.controllerProps.value;
				backendSetting.controllerProps.options = version_backends.map((b) => {
					const key = `${b.version}/${b.backend}`;
					return {
						value: key,
						name: key
					};
				});
				if (bestAvailableBackendString) backendSetting.controllerProps.recommended = bestAvailableBackendString;
				const savedBackendSetting = await this.getSetting("version_backend", originalDefaultBackendValue);
				let initialUiDefault = originalDefaultBackendValue;
				if (savedBackendSetting && savedBackendSetting !== originalDefaultBackendValue) {
					initialUiDefault = savedBackendSetting;
					const [, backendType] = savedBackendSetting.split("/");
					if (backendType) {
						const currentStoredBackend = this.getStoredBackendType();
						if (currentStoredBackend !== backendType) {
							this.setStoredBackendType(backendType);
							logger.info(`Stored backend type preference from saved setting: ${backendType}`);
						}
					}
				} else if (bestAvailableBackendString) {
					initialUiDefault = bestAvailableBackendString;
					const [, backendType] = bestAvailableBackendString.split("/");
					if (backendType) {
						const currentStoredBackend = this.getStoredBackendType();
						if (currentStoredBackend !== backendType) {
							this.setStoredBackendType(backendType);
							logger.info(`Stored backend type preference from best available: ${backendType}`);
						}
					}
				}
				backendSetting.controllerProps.value = initialUiDefault;
				logger.info(`Initial UI default for version_backend set to: ${initialUiDefault}`);
			} else {
				logger.error("Critical setting \"version_backend\" definition not found in SETTINGS.");
				throw new Error("Critical setting \"version_backend\" not found.");
			}
			this.registerSettings(settings);
			let effectiveBackendString = this.config.version_backend;
			let backendWasDownloaded = false;
			if ((!effectiveBackendString || effectiveBackendString === "none" || !effectiveBackendString.includes("/") || !version_backends.some((e) => `${e.version}/${e.backend}` === effectiveBackendString)) && bestAvailableBackendString) {
				effectiveBackendString = bestAvailableBackendString;
				logger.info(`Fresh installation or invalid backend detected, using: ${effectiveBackendString}`);
				this.config.version_backend = effectiveBackendString;
				const updatedSettings = await this.getSettings();
				await this.updateSettings(updatedSettings.map((item) => {
					if (item.key === "version_backend") item.controllerProps.value = effectiveBackendString;
					return item;
				}));
				logger.info(`Updated UI settings to show: ${effectiveBackendString}`);
				if (events && typeof events.emit === "function") {
					logger.info(`Emitting settingsChanged event for version_backend with value: ${effectiveBackendString}`);
					events.emit("settingsChanged", {
						key: "version_backend",
						value: effectiveBackendString
					});
				}
			}
			if (effectiveBackendString) {
				const [version, backend] = effectiveBackendString.split("/");
				if (version && backend) {
					const isInstalled = await isBackendInstalled(backend, version);
					if (!isInstalled) {
						logger.info(`Installing initial backend: ${effectiveBackendString}`);
						await this.ensureBackendReady(backend, version);
						backendWasDownloaded = true;
						logger.info(`Successfully installed initial backend: ${effectiveBackendString}`);
					}
				}
			}
			if (this.config.auto_update_engine) {
				const updateResult = await this.handleAutoUpdate(bestAvailableBackendString);
				if (updateResult.wasUpdated) {
					effectiveBackendString = updateResult.newBackend;
					backendWasDownloaded = true;
				}
			}
			if (!backendWasDownloaded && effectiveBackendString) await this.ensureFinalBackendInstallation(effectiveBackendString);
		} finally {
			this.isConfiguringBackends = false;
		}
	}
	async determineBestBackend(version_backends) {
		if (version_backends.length === 0) return "";
		let hasEnoughGpuMemory = false;
		try {
			const sysInfo = await getSystemInfo();
			for (const gpuInfo of sysInfo.gpus) if (gpuInfo.total_memory >= 6144) {
				hasEnoughGpuMemory = true;
				break;
			}
		} catch (error$1) {
			logger.warn("Failed to get system info for GPU memory check:", error$1);
			hasEnoughGpuMemory = false;
		}
		const backendPriorities = hasEnoughGpuMemory ? [
			"cuda-cu12.0",
			"cuda-cu11.7",
			"vulkan",
			"avx512",
			"avx2",
			"avx",
			"noavx",
			"arm64",
			"x64"
		] : [
			"cuda-cu12.0",
			"cuda-cu11.7",
			"avx512",
			"avx2",
			"avx",
			"noavx",
			"arm64",
			"x64",
			"vulkan"
		];
		const getBackendCategory = (backendString) => {
			if (backendString.includes("cu12.0")) return "cuda-cu12.0";
			if (backendString.includes("cu11.7")) return "cuda-cu11.7";
			if (backendString.includes("vulkan")) return "vulkan";
			if (backendString.includes("avx512")) return "avx512";
			if (backendString.includes("avx2")) return "avx2";
			if (backendString.includes("avx") && !backendString.includes("avx2") && !backendString.includes("avx512")) return "avx";
			if (backendString.includes("noavx")) return "noavx";
			if (backendString.endsWith("arm64")) return "arm64";
			if (backendString.endsWith("x64")) return "x64";
			return undefined;
		};
		let foundBestBackend;
		for (const priorityCategory of backendPriorities) {
			const matchingBackends = version_backends.filter((vb) => {
				const category = getBackendCategory(vb.backend);
				return category === priorityCategory;
			});
			if (matchingBackends.length > 0) {
				foundBestBackend = matchingBackends[0];
				logger.info(`Determined best available backend: ${foundBestBackend.version}/${foundBestBackend.backend} (Category: "${priorityCategory}")`);
				break;
			}
		}
		if (foundBestBackend) return `${foundBestBackend.version}/${foundBestBackend.backend}`;
else {
			logger.info(`Fallback to: ${version_backends[0].version}/${version_backends[0].backend}`);
			return `${version_backends[0].version}/${version_backends[0].backend}`;
		}
	}
	async updateBackend(targetBackendString) {
		try {
			if (!targetBackendString) throw new Error(`Invalid backend string: ${targetBackendString} supplied to update function`);
			const [version, backend] = targetBackendString.split("/");
			logger.info(`Updating backend to ${targetBackendString} (backend type: ${backend})`);
			await this.ensureBackendReady(backend, version);
			this.config.version_backend = targetBackendString;
			const currentStoredBackend = this.getStoredBackendType();
			if (currentStoredBackend !== backend) {
				this.setStoredBackendType(backend);
				logger.info(`Updated stored backend type preference: ${backend}`);
			}
			const settings = await this.getSettings();
			await this.updateSettings(settings.map((item) => {
				if (item.key === "version_backend") item.controllerProps.value = targetBackendString;
				return item;
			}));
			logger.info(`Successfully updated to backend: ${targetBackendString}`);
			if (events && typeof events.emit === "function") {
				logger.info(`Emitting settingsChanged event for version_backend with value: ${targetBackendString}`);
				events.emit("settingsChanged", {
					key: "version_backend",
					value: targetBackendString
				});
			}
			await this.removeOldBackend(version, backend);
			return {
				wasUpdated: true,
				newBackend: targetBackendString
			};
		} catch (error$1) {
			logger.error("Backend update failed:", error$1);
			return {
				wasUpdated: false,
				newBackend: this.config.version_backend
			};
		}
	}
	async handleAutoUpdate(bestAvailableBackendString) {
		logger.info(`Auto-update engine is enabled. Current backend: ${this.config.version_backend}. Best available: ${bestAvailableBackendString}`);
		if (!bestAvailableBackendString) {
			logger.warn("Auto-update enabled, but no best available backend determined");
			return {
				wasUpdated: false,
				newBackend: this.config.version_backend
			};
		}
		if (!this.config.version_backend || this.config.version_backend === "" || this.config.version_backend === "none" || !this.config.version_backend.includes("/")) {
			logger.info("No valid backend currently selected, using best available backend");
			return await this.updateBackend(bestAvailableBackendString);
		}
		const [currentVersion, currentBackend] = (this.config.version_backend || "").split("/");
		if (!currentVersion || !currentBackend) {
			logger.warn(`Invalid current backend format: ${this.config.version_backend}`);
			return {
				wasUpdated: false,
				newBackend: this.config.version_backend
			};
		}
		const version_backends = await listSupportedBackends();
		const targetBackendString = this.findLatestVersionForBackend(version_backends, currentBackend);
		if (!targetBackendString) {
			logger.warn(`No available versions found for current backend type: ${currentBackend}`);
			return {
				wasUpdated: false,
				newBackend: this.config.version_backend
			};
		}
		const [latestVersion] = targetBackendString.split("/");
		if (currentVersion === latestVersion) {
			logger.info("Auto-update: Already using the latest version of the selected backend");
			return {
				wasUpdated: false,
				newBackend: this.config.version_backend
			};
		}
		logger.info(`Auto-updating from ${this.config.version_backend} to ${targetBackendString} (preserving backend type)`);
		return await this.updateBackend(targetBackendString);
	}
	parseBackendVersion(v) {
		const numeric = v.replace(/^[^\d]*/, "");
		const n = Number(numeric);
		return Number.isNaN(n) ? 0 : n;
	}
	async checkBackendForUpdates() {
		const [currentVersion, currentBackend] = (this.config.version_backend || "").split("/");
		if (!currentVersion || !currentBackend) {
			logger.warn(`Invalid current backend format: ${this.config.version_backend}`);
			return {
				updateNeeded: false,
				newVersion: "0"
			};
		}
		const version_backends = await listSupportedBackends();
		const targetBackendString = this.findLatestVersionForBackend(version_backends, currentBackend);
		const [latestVersion] = targetBackendString.split("/");
		if (this.parseBackendVersion(latestVersion) > this.parseBackendVersion(currentVersion)) {
			logger.info(`New update available: ${latestVersion}`);
			return {
				updateNeeded: true,
				newVersion: latestVersion
			};
		} else {
			logger.info(`Already at latest version: ${currentVersion} = ${latestVersion}`);
			return {
				updateNeeded: false,
				newVersion: "0"
			};
		}
	}
	async removeOldBackend(latestVersion, backendType) {
		try {
			const janDataFolderPath = await getJanDataFolderPath();
			const backendsDir = await joinPath([
				janDataFolderPath,
				"llamacpp",
				"backends"
			]);
			if (!await fs.existsSync(backendsDir)) return;
			const versionDirs = await fs.readdirSync(backendsDir);
			for (const versionDir of versionDirs) {
				const versionPath = await joinPath([backendsDir, versionDir]);
				const versionName = await basename(versionDir);
				if (versionName === latestVersion) continue;
				const backendTypePath = await joinPath([versionPath, backendType]);
				if (await fs.existsSync(backendTypePath)) {
					const isInstalled = await isBackendInstalled(backendType, versionName);
					if (isInstalled) try {
						await fs.rm(backendTypePath);
						logger.info(`Removed old version of ${backendType}: ${backendTypePath}`);
					} catch (e) {
						logger.warn(`Failed to remove old backend version: ${backendTypePath}`, e);
					}
				}
			}
		} catch (error$1) {
			logger.error("Error during old backend version cleanup:", error$1);
		}
	}
	async ensureFinalBackendInstallation(backendString) {
		if (!backendString) {
			logger.warn("No backend specified for final installation check");
			return;
		}
		const [selectedVersion, selectedBackend] = backendString.split("/").map((part) => part?.trim());
		if (!selectedVersion || !selectedBackend) {
			logger.warn(`Invalid backend format: ${backendString}`);
			return;
		}
		try {
			const isInstalled = await isBackendInstalled(selectedBackend, selectedVersion);
			if (!isInstalled) {
				logger.info(`Final check: Installing backend ${backendString}`);
				await this.ensureBackendReady(selectedBackend, selectedVersion);
				logger.info(`Successfully installed backend: ${backendString}`);
			} else logger.info(`Final check: Backend ${backendString} is already installed`);
		} catch (error$1) {
			logger.error(`Failed to ensure backend ${backendString} installation:`, error$1);
			throw error$1;
		}
	}
	async getProviderPath() {
		if (!this.providerPath) this.providerPath = await joinPath([await getJanDataFolderPath(), this.providerId]);
		return this.providerPath;
	}
	async onUnload() {
		if (this.unlistenValidationStarted) this.unlistenValidationStarted();
	}
	onSettingUpdate(key, value) {
		this.config[key] = value;
		if (key === "version_backend") {
			const valueStr = value;
			const [version, backend] = valueStr.split("/");
			if (backend) {
				const currentStoredBackend = this.getStoredBackendType();
				if (currentStoredBackend !== backend) {
					this.setStoredBackendType(backend);
					logger.info(`Updated backend type preference to: ${backend}`);
				}
			}
			this.config.device = "";
			const closure = async () => {
				await this.ensureBackendReady(backend, version);
			};
			closure();
		} else if (key === "auto_unload") this.autoUnload = value;
else if (key === "llamacpp_env") this.llamacpp_env = value;
else if (key === "memory_util") this.memoryMode = value;
	}
	async generateApiKey(modelId, port) {
		const hash = await invoke$2("plugin:llamacpp|generate_api_key", {
			modelId: modelId + port,
			apiSecret: this.apiSecret
		});
		return hash;
	}
	async get(modelId) {
		const modelPath = await joinPath([
			await this.getProviderPath(),
			"models",
			modelId
		]);
		const path = await joinPath([modelPath, "model.yml"]);
		if (!await fs.existsSync(path)) return undefined;
		const modelConfig = await invoke$2("read_yaml", { path });
		return {
			id: modelId,
			name: modelConfig.name ?? modelId,
			quant_type: undefined,
			providerId: this.provider,
			port: 0,
			sizeBytes: modelConfig.size_bytes ?? 0
		};
	}
	async list() {
		const modelsDir = await joinPath([await this.getProviderPath(), "models"]);
		if (!await fs.existsSync(modelsDir)) await fs.mkdir(modelsDir);
		await this.migrateLegacyModels();
		let modelIds = [];
		let stack = [modelsDir];
		while (stack.length > 0) {
			const currentDir = stack.pop();
			const modelConfigPath = await joinPath([currentDir, "model.yml"]);
			if (await fs.existsSync(modelConfigPath)) {
				modelIds.push(currentDir.slice(modelsDir.length + 1));
				continue;
			}
			const children = await fs.readdirSync(currentDir);
			for (const child of children) {
				const dirInfo = await fs.fileStat(child);
				if (!dirInfo.isDirectory) continue;
				stack.push(child);
			}
		}
		let modelInfos = [];
		for (const modelId of modelIds) {
			const path = await joinPath([
				modelsDir,
				modelId,
				"model.yml"
			]);
			const modelConfig = await invoke$2("read_yaml", { path });
			const modelInfo = {
				id: modelId,
				name: modelConfig.name ?? modelId,
				quant_type: undefined,
				providerId: this.provider,
				port: 0,
				sizeBytes: modelConfig.size_bytes ?? 0
			};
			modelInfos.push(modelInfo);
		}
		return modelInfos;
	}
	async migrateLegacyModels() {
		if (localStorage.getItem("cortex_models_migrated") === "true") return;
		const janDataFolderPath = await getJanDataFolderPath();
		const modelsDir = await joinPath([janDataFolderPath, "models"]);
		if (!await fs.existsSync(modelsDir)) return;
		let stack = [modelsDir];
		while (stack.length > 0) {
			const currentDir = stack.pop();
			const files = await fs.readdirSync(currentDir);
			for (const child of files) try {
				const childPath = await joinPath([currentDir, child]);
				const stat = await fs.fileStat(childPath);
				if (files.some((e) => e.endsWith("model.yml")) && !child.endsWith("model.yml")) continue;
				if (!stat.isDirectory && child.endsWith(".yml")) {
					const modelConfigPath = child;
					if (await fs.existsSync(modelConfigPath)) {
						const legacyModelConfig = await invoke$2("read_yaml", { path: modelConfigPath });
						const legacyModelPath = legacyModelConfig.files?.[0];
						if (!legacyModelPath) continue;
						let modelId = currentDir.slice(modelsDir.length + 1);
						modelId = modelId !== "imported" ? modelId.replace(/^(cortex\.so|huggingface\.co)[\/\\]/, "") : (await basename(child)).replace(".yml", "");
						const modelName = legacyModelConfig.model ?? modelId;
						const configPath = await joinPath([
							await this.getProviderPath(),
							"models",
							modelId,
							"model.yml"
						]);
						if (await fs.existsSync(configPath)) continue;
						const modelDir = `${this.providerId}/models/${modelId}`;
						let size_bytes = (await fs.fileStat(await joinPath([janDataFolderPath, legacyModelPath]))).size;
						const modelConfig = {
							model_path: legacyModelPath,
							mmproj_path: undefined,
							name: modelName,
							size_bytes
						};
						await fs.mkdir(await joinPath([janDataFolderPath, modelDir]));
						await invoke$2("write_yaml", {
							data: modelConfig,
							savePath: configPath
						});
						continue;
					}
				}
			} catch (error$1) {
				console.error(`Error migrating model ${child}:`, error$1);
			}
			const children = await fs.readdirSync(currentDir);
			for (const child of children) {
				const dirInfo = await fs.fileStat(child);
				if (!dirInfo.isDirectory) continue;
				stack.push(child);
			}
		}
		localStorage.setItem("cortex_models_migrated", "true");
	}
	async installBackend(path) {
		const platformName = "linux";
		const re = /^llama-(b\d+)-bin-(.+?)\.(?:tar\.gz|zip)$/;
		const archiveName = await basename(path);
		logger.info(`Installing backend from path: ${path}`);
		if (!await fs.existsSync(path) || !path.endsWith("tar.gz") && !path.endsWith("zip")) {
			logger.error(`Invalid path or file ${path}`);
			throw new Error(`Invalid path or file ${path}`);
		}
		const match = re.exec(archiveName);
		if (!match) throw new Error("Failed to parse archive name");
		const [, version, backend] = match;
		if (!version && !backend) throw new Error(`Invalid backend archive name: ${archiveName}`);
		const backendDir = await getBackendDir(backend, version);
		try {
			await invoke$2("decompress", {
				path,
				outputDir: backendDir
			});
		} catch (e) {
			logger.error(`Failed to install: ${String(e)}`);
		}
		const binPath = platformName === "win" ? await joinPath([
			backendDir,
			"build",
			"bin",
			"llama-server.exe"
		]) : await joinPath([
			backendDir,
			"build",
			"bin",
			"llama-server"
		]);
		if (!fs.existsSync(binPath)) {
			await fs.rm(backendDir);
			throw new Error("Not a supported backend archive!");
		}
		try {
			await this.configureBackends();
			logger.info(`Backend ${backend}/${version} installed and UI refreshed`);
		} catch (e) {
			logger.error("Backend installed but failed to refresh UI", e);
			throw new Error(`Backend installed but failed to refresh UI: ${String(e)}`);
		}
	}
	/**
	* Update a model with new information.
	* @param modelId
	* @param model
	*/
	async update(modelId, model) {
		const modelFolderPath = await joinPath([
			await this.getProviderPath(),
			"models",
			modelId
		]);
		const modelConfig = await invoke$2("read_yaml", { path: await joinPath([modelFolderPath, "model.yml"]) });
		const newFolderPath = await joinPath([
			await this.getProviderPath(),
			"models",
			model.id
		]);
		if (await fs.existsSync(newFolderPath)) throw new Error(`Model with ID ${model.id} already exists`);
		const newModelConfigPath = await joinPath([newFolderPath, "model.yml"]);
		await fs.mv(modelFolderPath, newFolderPath).then(() => invoke$2("write_yaml", {
			data: {
				...modelConfig,
				model_path: modelConfig?.model_path?.replace(`${this.providerId}/models/${modelId}`, `${this.providerId}/models/${model.id}`),
				mmproj_path: modelConfig?.mmproj_path?.replace(`${this.providerId}/models/${modelId}`, `${this.providerId}/models/${model.id}`)
			},
			savePath: newModelConfigPath
		}));
	}
	async import(modelId, opts) {
		const isValidModelId = (id) => {
			if (!/^[a-zA-Z0-9/_\-\.]+$/.test(id)) return false;
			const parts = id.split("/");
			return parts.every((s) => s !== "" && s !== "." && s !== "..");
		};
		if (!isValidModelId(modelId)) throw new Error(`Invalid modelId: ${modelId}. Only alphanumeric and / _ - . characters are allowed.`);
		const configPath = await joinPath([
			await this.getProviderPath(),
			"models",
			modelId,
			"model.yml"
		]);
		if (await fs.existsSync(configPath)) throw new Error(`Model ${modelId} already exists`);
		const modelDir = `${this.providerId}/models/${modelId}`;
		let downloadItems = [];
		const maybeDownload = async (path, saveName) => {
			if (path.startsWith("https://")) {
				const localPath = `${modelDir}/${saveName}`;
				downloadItems.push({
					url: path,
					save_path: localPath,
					proxy: getProxyConfig(),
					sha256: saveName === "model.gguf" ? opts.modelSha256 : opts.mmprojSha256,
					size: saveName === "model.gguf" ? opts.modelSize : opts.mmprojSize
				});
				return localPath;
			}
			if (!await fs.existsSync(path)) throw new Error(`File not found: ${path}`);
			return path;
		};
		let modelPath = await maybeDownload(opts.modelPath, "model.gguf");
		let mmprojPath = opts.mmprojPath ? await maybeDownload(opts.mmprojPath, "mmproj.gguf") : undefined;
		if (downloadItems.length > 0) try {
			const onProgress = (transferred, total) => {
				events.emit(DownloadEvent.onFileDownloadUpdate, {
					modelId,
					percent: transferred / total,
					size: {
						transferred,
						total
					},
					downloadType: "Model"
				});
			};
			const downloadManager = window.core.extensionManager.getByName("@janhq/download-extension");
			await downloadManager.downloadFiles(downloadItems, this.createDownloadTaskId(modelId), onProgress);
			events.emit(DownloadEvent.onFileDownloadAndVerificationSuccess, {
				modelId,
				downloadType: "Model"
			});
		} catch (error$1) {
			logger.error("Error downloading model:", modelId, opts, error$1);
			const errorMessage = error$1 instanceof Error ? error$1.message : String(error$1);
			const isCancellationError = errorMessage.includes("Download cancelled") || errorMessage.includes("Validation cancelled") || errorMessage.includes("Hash computation cancelled") || errorMessage.includes("cancelled") || errorMessage.includes("aborted");
			const isValidationError = errorMessage.includes("Hash verification failed") || errorMessage.includes("Size verification failed") || errorMessage.includes("Failed to verify file");
			if (isCancellationError) {
				logger.info("Download cancelled for model:", modelId);
				events.emit(DownloadEvent.onFileDownloadStopped, {
					modelId,
					downloadType: "Model"
				});
			} else if (isValidationError) {
				logger.error("Validation failed for model:", modelId, "Error:", errorMessage);
				try {
					this.abortImport(modelId);
				} catch (cancelError) {
					logger.warn("Failed to cancel download task:", cancelError);
				}
				events.emit(DownloadEvent.onModelValidationFailed, {
					modelId,
					downloadType: "Model",
					error: errorMessage,
					reason: "validation_failed"
				});
			} else events.emit(DownloadEvent.onFileDownloadError, {
				modelId,
				downloadType: "Model",
				error: errorMessage
			});
			throw error$1;
		}
		const janDataFolderPath = await getJanDataFolderPath();
		const fullModelPath = await joinPath([janDataFolderPath, modelPath]);
		try {
			const modelMetadata = await readGgufMetadata(fullModelPath);
			logger.info(`Model GGUF validation successful: version ${modelMetadata.version}, tensors: ${modelMetadata.tensor_count}`);
			if (mmprojPath) {
				const fullMmprojPath = await joinPath([janDataFolderPath, mmprojPath]);
				const mmprojMetadata = await readGgufMetadata(fullMmprojPath);
				logger.info(`Mmproj GGUF validation successful: version ${mmprojMetadata.version}, tensors: ${mmprojMetadata.tensor_count}`);
			}
		} catch (error$1) {
			logger.error("GGUF validation failed:", error$1);
			throw new Error(`Invalid GGUF file(s): ${error$1.message || "File format validation failed"}`);
		}
		let size_bytes = (await fs.fileStat(fullModelPath)).size;
		if (mmprojPath) size_bytes += (await fs.fileStat(await joinPath([janDataFolderPath, mmprojPath]))).size;
		const modelConfig = {
			model_path: modelPath,
			mmproj_path: mmprojPath,
			name: modelId,
			size_bytes,
			model_sha256: opts.modelSha256,
			model_size_bytes: opts.modelSize,
			mmproj_sha256: opts.mmprojSha256,
			mmproj_size_bytes: opts.mmprojSize
		};
		await fs.mkdir(await joinPath([janDataFolderPath, modelDir]));
		await invoke$2("write_yaml", {
			data: modelConfig,
			savePath: configPath
		});
		events.emit(AppEvent.onModelImported, {
			modelId,
			modelPath,
			mmprojPath,
			size_bytes,
			model_sha256: opts.modelSha256,
			model_size_bytes: opts.modelSize,
			mmproj_sha256: opts.mmprojSha256,
			mmproj_size_bytes: opts.mmprojSize
		});
	}
	/**
	* Deletes the entire model folder for a given modelId
	* @param modelId The model ID to delete
	*/
	async deleteModelFolder(modelId) {
		try {
			const modelDir = await joinPath([
				await this.getProviderPath(),
				"models",
				modelId
			]);
			if (await fs.existsSync(modelDir)) {
				logger.info(`Cleaning up model directory: ${modelDir}`);
				await fs.rm(modelDir);
			}
		} catch (deleteError) {
			logger.warn("Failed to delete model directory:", deleteError);
		}
	}
	async abortImport(modelId) {
		const taskId = this.createDownloadTaskId(modelId);
		const downloadManager = window.core.extensionManager.getByName("@janhq/download-extension");
		try {
			await downloadManager.cancelDownload(taskId);
		} catch (cancelError) {
			logger.warn("Failed to cancel download task:", cancelError);
		}
		await this.deleteModelFolder(modelId);
	}
	/**
	* Function to find a random port
	*/
	async getRandomPort() {
		try {
			const port = await invoke$2("plugin:llamacpp|get_random_port");
			return port;
		} catch {
			logger.error("Unable to find a suitable port");
			throw new Error("Unable to find a suitable port for model");
		}
	}
	parseEnvFromString(target, envString) {
		envString.split(";").filter((pair) => pair.trim()).forEach((pair) => {
			const [key, ...valueParts] = pair.split("=");
			const cleanKey = key?.trim();
			if (cleanKey && valueParts.length > 0 && !cleanKey.startsWith("LLAMA")) target[cleanKey] = valueParts.join("=").trim();
		});
	}
	async load(modelId, overrideSettings, isEmbedding = false) {
		const sInfo = await this.findSessionByModel(modelId);
		if (sInfo) throw new Error("Model already loaded!!");
		if (this.loadingModels.has(modelId)) return this.loadingModels.get(modelId);
		const loadingPromise = this.performLoad(modelId, overrideSettings, isEmbedding);
		this.loadingModels.set(modelId, loadingPromise);
		try {
			const result = await loadingPromise;
			return result;
		} finally {
			this.loadingModels.delete(modelId);
		}
	}
	async performLoad(modelId, overrideSettings, isEmbedding = false) {
		const loadedModels = await this.getLoadedModels();
		const otherLoadingPromises = Array.from(this.loadingModels.entries()).filter(([id, _]) => id !== modelId).map(([_, promise]) => promise);
		if (this.autoUnload && (loadedModels.length > 0 || otherLoadingPromises.length > 0)) {
			if (otherLoadingPromises.length > 0) await Promise.all(otherLoadingPromises);
			const allLoadedModels = await this.getLoadedModels();
			if (allLoadedModels.length > 0) await Promise.all(allLoadedModels.map((model) => this.unload(model)));
		}
		const args = [];
		const envs = {};
		const cfg = {
			...this.config,
			...overrideSettings ?? {}
		};
		const [version, backend] = cfg.version_backend.split("/");
		if (!version || !backend) throw new Error("Initial setup for the backend failed due to a network issue. Please restart the app!");
		await this.ensureBackendReady(backend, version);
		const janDataFolderPath = await getJanDataFolderPath();
		const modelConfigPath = await joinPath([
			this.providerPath,
			"models",
			modelId,
			"model.yml"
		]);
		const modelConfig = await invoke$2("read_yaml", { path: modelConfigPath });
		const port = await this.getRandomPort();
		args.push("--no-webui");
		const api_key = await this.generateApiKey(modelId, String(port));
		envs["LLAMA_API_KEY"] = api_key;
		if (this.llamacpp_env) this.parseEnvFromString(envs, this.llamacpp_env);
		const modelPath = await joinPath([janDataFolderPath, modelConfig.model_path]);
		args.push("--jinja");
		args.push("-m", modelPath);
		if (cfg.override_tensor_buffer_t) args.push("--override-tensor", cfg.override_tensor_buffer_t);
		if (cfg.offload_mmproj === false) args.push("--no-mmproj-offload");
		args.push("-a", modelId);
		args.push("--port", String(port));
		if (modelConfig.mmproj_path) {
			const mmprojPath = await joinPath([janDataFolderPath, modelConfig.mmproj_path]);
			args.push("--mmproj", mmprojPath);
		}
		if (cfg.chat_template) args.push("--chat-template", cfg.chat_template);
		const gpu_layers = parseInt(String(cfg.n_gpu_layers)) >= 0 ? cfg.n_gpu_layers : 100;
		args.push("-ngl", String(gpu_layers));
		if (cfg.threads > 0) args.push("--threads", String(cfg.threads));
		if (cfg.threads_batch > 0) args.push("--threads-batch", String(cfg.threads_batch));
		if (cfg.batch_size > 0) args.push("--batch-size", String(cfg.batch_size));
		if (cfg.ubatch_size > 0) args.push("--ubatch-size", String(cfg.ubatch_size));
		if (cfg.device.length > 0) args.push("--device", cfg.device);
		if (cfg.split_mode.length > 0 && cfg.split_mode != "layer") args.push("--split-mode", cfg.split_mode);
		if (cfg.main_gpu !== undefined && cfg.main_gpu != 0) args.push("--main-gpu", String(cfg.main_gpu));
		if (cfg.ctx_shift) args.push("--context-shift");
		if (Number(version.replace(/^b/, "")) >= 6325) {
			if (!cfg.flash_attn) args.push("--flash-attn", "off");
		} else if (cfg.flash_attn) args.push("--flash-attn");
		if (cfg.cont_batching) args.push("--cont-batching");
		args.push("--no-mmap");
		if (cfg.mlock) args.push("--mlock");
		if (cfg.no_kv_offload) args.push("--no-kv-offload");
		if (isEmbedding) {
			args.push("--embedding");
			args.push("--pooling mean");
		} else {
			if (cfg.ctx_size > 0) args.push("--ctx-size", String(cfg.ctx_size));
			if (cfg.n_predict > 0) args.push("--n-predict", String(cfg.n_predict));
			if (cfg.cache_type_k && cfg.cache_type_k != "f16") args.push("--cache-type-k", cfg.cache_type_k);
			if (cfg.flash_attn && cfg.cache_type_v != "f16" && cfg.cache_type_v != "f32") args.push("--cache-type-v", cfg.cache_type_v);
			if (cfg.defrag_thold && cfg.defrag_thold != .1) args.push("--defrag-thold", String(cfg.defrag_thold));
			if (cfg.rope_scaling && cfg.rope_scaling != "none") args.push("--rope-scaling", cfg.rope_scaling);
			if (cfg.rope_scale && cfg.rope_scale != 1) args.push("--rope-scale", String(cfg.rope_scale));
			if (cfg.rope_freq_base && cfg.rope_freq_base != 0) args.push("--rope-freq-base", String(cfg.rope_freq_base));
			if (cfg.rope_freq_scale && cfg.rope_freq_scale != 1) args.push("--rope-freq-scale", String(cfg.rope_freq_scale));
		}
		logger.info("Calling Tauri command llama_load with args:", args);
		const backendPath = await getBackendExePath(backend, version);
		const libraryPath = await joinPath([await this.getProviderPath(), "lib"]);
		try {
			const sInfo = await invoke$2("plugin:llamacpp|load_llama_model", {
				backendPath,
				libraryPath,
				args,
				envs
			});
			return sInfo;
		} catch (error$1) {
			logger.error("Error in load command:\n", error$1);
			throw error$1;
		}
	}
	async unload(modelId) {
		const sInfo = await this.findSessionByModel(modelId);
		if (!sInfo) throw new Error(`No active session found for model: ${modelId}`);
		const pid = sInfo.pid;
		try {
			const result = await invoke$2("plugin:llamacpp|unload_llama_model", { pid });
			if (result.success) logger.info(`Successfully unloaded model with PID ${pid}`);
else logger.warn(`Failed to unload model: ${result.error}`);
			return result;
		} catch (error$1) {
			logger.error("Error in unload command:", error$1);
			return {
				success: false,
				error: `Failed to unload model: ${error$1}`
			};
		}
	}
	createDownloadTaskId(modelId) {
		const cleanModelId = modelId.includes(".") ? modelId.slice(0, modelId.indexOf(".")) : modelId;
		return `${this.provider}/${cleanModelId}`;
	}
	async ensureBackendReady(backend, version) {
		const backendKey = `${version}/${backend}`;
		const isInstalled = await isBackendInstalled(backend, version);
		if (isInstalled) return;
		if (this.pendingDownloads.has(backendKey)) {
			logger.info(`Backend ${backendKey} download already in progress, waiting...`);
			await this.pendingDownloads.get(backendKey);
			return;
		}
		logger.info(`Backend ${backendKey} not installed, downloading...`);
		const downloadPromise = downloadBackend(backend, version).finally(() => {
			this.pendingDownloads.delete(backendKey);
		});
		this.pendingDownloads.set(backendKey, downloadPromise);
		await downloadPromise;
		logger.info(`Backend ${backendKey} download completed`);
	}
	async *handleStreamingResponse(url, headers, body, abortController) {
		const response = await fetch(url, {
			method: "POST",
			headers,
			body,
			connectTimeout: 6e5,
			signal: AbortSignal.any([AbortSignal.timeout(6e5), abortController?.signal])
		});
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
		}
		if (!response.body) throw new Error("Response body is null");
		const reader = response.body.getReader();
		const decoder = new TextDecoder("utf-8");
		let buffer = "";
		let jsonStr = "";
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";
				for (const line of lines) {
					const trimmedLine = line.trim();
					if (!trimmedLine || trimmedLine === "data: [DONE]") continue;
					if (trimmedLine.startsWith("data: ")) jsonStr = trimmedLine.slice(6);
else if (trimmedLine.startsWith("error: ")) {
						jsonStr = trimmedLine.slice(7);
						const error$1 = JSON.parse(jsonStr);
						throw new Error(error$1.message);
					} else throw new Error("Malformed chunk");
					try {
						const data = JSON.parse(jsonStr);
						const chunk = data;
						if (chunk.choices?.[0]?.finish_reason === "length") throw new Error(OUT_OF_CONTEXT_SIZE);
						yield chunk;
					} catch (e) {
						logger.error("Error parsing JSON from stream or server error:", e);
						throw e;
					}
				}
			}
		} finally {
			reader.releaseLock();
		}
	}
	async findSessionByModel(modelId) {
		try {
			let sInfo = await invoke$2("plugin:llamacpp|find_session_by_model", { modelId });
			return sInfo;
		} catch (e) {
			logger.error(e);
			throw new Error(String(e));
		}
	}
	async chat(opts, abortController) {
		const sessionInfo = await this.findSessionByModel(opts.model);
		if (!sessionInfo) throw new Error(`No active session found for model: ${opts.model}`);
		const result = await invoke$2("plugin:llamacpp|is_process_running", { pid: sessionInfo.pid });
		if (result) try {
			await fetch(`http://localhost:${sessionInfo.port}/health`);
		} catch (e) {
			this.unload(sessionInfo.model_id);
			throw new Error("Model appears to have crashed! Please reload!");
		}
else throw new Error("Model have crashed! Please reload!");
		const baseUrl = `http://localhost:${sessionInfo.port}/v1`;
		const url = `${baseUrl}/chat/completions`;
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${sessionInfo.api_key}`
		};
		opts.return_progress = true;
		const body = JSON.stringify(opts);
		if (opts.stream) return this.handleStreamingResponse(url, headers, body, abortController);
		const response = await fetch(url, {
			method: "POST",
			headers,
			body,
			signal: abortController?.signal
		});
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
		}
		const completionResponse = await response.json();
		if (completionResponse.choices?.[0]?.finish_reason === "length") throw new Error(OUT_OF_CONTEXT_SIZE);
		return completionResponse;
	}
	async delete(modelId) {
		const modelDir = await joinPath([
			await this.getProviderPath(),
			"models",
			modelId
		]);
		if (!await fs.existsSync(await joinPath([modelDir, "model.yml"]))) throw new Error(`Model ${modelId} does not exist`);
		await fs.rm(modelDir);
	}
	async getLoadedModels() {
		try {
			let models = await invoke$2("plugin:llamacpp|get_loaded_models");
			return models;
		} catch (e) {
			logger.error(e);
			throw new Error(e);
		}
	}
	/**
	* Check if mmproj.gguf file exists for a given model ID
	* @param modelId - The model ID to check for mmproj.gguf
	* @returns Promise<boolean> - true if mmproj.gguf exists, false otherwise
	*/
	async checkMmprojExists(modelId) {
		try {
			const modelConfigPath = await joinPath([
				await this.getProviderPath(),
				"models",
				modelId,
				"model.yml"
			]);
			const modelConfig = await invoke$2("read_yaml", { path: modelConfigPath });
			if (modelConfig.mmproj_path) return true;
			const mmprojPath = await joinPath([
				await this.getProviderPath(),
				"models",
				modelId,
				"mmproj.gguf"
			]);
			return await fs.existsSync(mmprojPath);
		} catch (e) {
			logger.error(`Error checking mmproj.gguf for model ${modelId}:`, e);
			return false;
		}
	}
	async getDevices() {
		const cfg = this.config;
		const [version, backend] = cfg.version_backend.split("/");
		if (!version || !backend) throw new Error("Backend setup was not successful. Please restart the app in a stable internet connection.");
		const envs = {};
		if (this.llamacpp_env) this.parseEnvFromString(envs, this.llamacpp_env);
		await this.ensureBackendReady(backend, version);
		logger.info("Calling Tauri command getDevices with arg --list-devices");
		const backendPath = await getBackendExePath(backend, version);
		const libraryPath = await joinPath([await this.getProviderPath(), "lib"]);
		try {
			const dList = await invoke$2("plugin:llamacpp|get_devices", {
				backendPath,
				libraryPath,
				envs
			});
			return dList;
		} catch (error$1) {
			logger.error("Failed to query devices:\n", error$1);
			throw new Error("Failed to load llamacpp backend");
		}
	}
	async embed(text) {
		let sInfo = await this.findSessionByModel("sentence-transformer-mini");
		if (!sInfo) {
			const downloadedModelList = await this.list();
			if (!downloadedModelList.some((model) => model.id === "sentence-transformer-mini")) await this.import("sentence-transformer-mini", { modelPath: "https://huggingface.co/second-state/All-MiniLM-L6-v2-Embedding-GGUF/resolve/main/all-MiniLM-L6-v2-ggml-model-f16.gguf?download=true" });
			sInfo = await this.load("sentence-transformer-mini");
		}
		const baseUrl = `http://localhost:${sInfo.port}/v1/embeddings`;
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${sInfo.api_key}`
		};
		const body = JSON.stringify({
			input: text,
			model: sInfo.model_id,
			encoding_format: "float"
		});
		const response = await fetch(baseUrl, {
			method: "POST",
			headers,
			body
		});
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
		}
		const responseData = await response.json();
		return responseData;
	}
	/**
	* Check if a tool is supported by the model
	* Currently read from GGUF chat_template
	* @param modelId
	* @returns
	*/
	async isToolSupported(modelId) {
		const janDataFolderPath = await getJanDataFolderPath();
		const modelConfigPath = await joinPath([
			this.providerPath,
			"models",
			modelId,
			"model.yml"
		]);
		const modelConfig = await invoke$2("read_yaml", { path: modelConfigPath });
		const modelPath = await joinPath([janDataFolderPath, modelConfig.model_path]);
		return (await readGgufMetadata(modelPath)).metadata?.["tokenizer.chat_template"]?.includes("tools");
	}
	/**
	* Get total system memory including both VRAM and RAM
	*/
	async getTotalSystemMemory() {
		const devices = await this.getDevices();
		let totalVRAM = 0;
		if (devices.length > 0) totalVRAM = devices.map((d) => d.mem * 1024 * 1024).reduce((a, b) => a + b, 0);
		const sys = await getSystemUsage();
		const totalRAM = sys.used_memory * 1024 * 1024;
		const totalMemory = totalVRAM + totalRAM;
		logger.info(`Total VRAM: ${totalVRAM} bytes, Total RAM: ${totalRAM} bytes, Total Memory: ${totalMemory} bytes`);
		return {
			totalVRAM,
			totalRAM,
			totalMemory
		};
	}
	async getLayerSize(path, meta) {
		const modelSize = await getModelSize(path);
		const arch = meta["general.architecture"];
		const totalLayers = Number(meta[`${arch}.block_count`]) + 2;
		if (!totalLayers) throw new Error("Invalid metadata: block_count not found");
		return {
			layerSize: modelSize / totalLayers,
			totalLayers
		};
	}
	isAbsolutePath(p) {
		const norm = p.replace(/\\/g, "/");
		return norm.startsWith("/") || /^[a-zA-Z]:/.test(norm) || /^\/\/[^/]+/.test(norm);
	}
	async planModelLoad(path, mmprojPath, requestedCtx) {
		if (!this.isAbsolutePath(path)) path = await joinPath([await getJanDataFolderPath(), path]);
		if (mmprojPath && !this.isAbsolutePath(mmprojPath)) mmprojPath = await joinPath([await getJanDataFolderPath(), path]);
		try {
			const result = await planModelLoadInternal(path, this.memoryMode, mmprojPath, requestedCtx);
			return result;
		} catch (e) {
			throw new Error(String(e));
		}
	}
	/**
	* Check the support status of a model by its path (local/remote)
	*
	* Returns:
	* - "RED"    → weights don't fit in total memory
	* - "YELLOW" → weights fit in VRAM but need system RAM, or KV cache doesn't fit
	* - "GREEN"  → both weights + KV cache fit in VRAM
	*/
	async isModelSupported(path, ctxSize) {
		try {
			const result = await isModelSupported(path, Number(ctxSize));
			return result;
		} catch (e) {
			throw new Error(String(e));
		}
	}
	/**
	* Validate GGUF file and check for unsupported architectures like CLIP
	*/
	async validateGgufFile(filePath) {
		try {
			logger.info(`Validating GGUF file: ${filePath}`);
			const metadata = await readGgufMetadata(filePath);
			logger.info("Full GGUF metadata:", JSON.stringify(metadata, null, 2));
			const architecture = metadata.metadata?.["general.architecture"];
			logger.info(`Model architecture: ${architecture}`);
			if (architecture === "clip") {
				const errorMessage = "This model has CLIP architecture and cannot be imported as a text generation model. CLIP models are designed for vision tasks and require different handling.";
				logger.error("CLIP architecture detected:", architecture);
				return {
					isValid: false,
					error: errorMessage,
					metadata
				};
			}
			logger.info("Model validation passed. Architecture:", architecture);
			return {
				isValid: true,
				metadata
			};
		} catch (error$1) {
			logger.error("Failed to validate GGUF file:", error$1);
			return {
				isValid: false,
				error: `Failed to read model metadata: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`
			};
		}
	}
	async getTokensCount(opts) {
		const sessionInfo = await this.findSessionByModel(opts.model);
		if (!sessionInfo) throw new Error(`No active session found for model: ${opts.model}`);
		const result = await invoke$2("plugin:llamacpp|is_process_running", { pid: sessionInfo.pid });
		if (result) try {
			await fetch(`http://localhost:${sessionInfo.port}/health`);
		} catch (e) {
			this.unload(sessionInfo.model_id);
			throw new Error("Model appears to have crashed! Please reload!");
		}
else throw new Error("Model has crashed! Please reload!");
		const baseUrl = `http://localhost:${sessionInfo.port}`;
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${sessionInfo.api_key}`
		};
		let imageTokens = 0;
		const hasImages = opts.messages.some((msg) => Array.isArray(msg.content) && msg.content.some((content) => content.type === "image_url"));
		if (hasImages) {
			logger.info("Conversation has images");
			try {
				logger.info(`MMPROJ PATH: ${sessionInfo.mmproj_path}`);
				const metadata = await readGgufMetadata(sessionInfo.mmproj_path);
				logger.info(`mmproj metadata: ${JSON.stringify(metadata.metadata)}`);
				imageTokens = await this.calculateImageTokens(opts.messages, metadata.metadata);
			} catch (error$1) {
				logger.warn("Failed to calculate image tokens:", error$1);
				imageTokens = this.estimateImageTokensFallback(opts.messages);
			}
		}
		const tokenizeRequest = {
			messages: opts.messages,
			chat_template_kwargs: opts.chat_template_kwargs || { enable_thinking: false }
		};
		let parseResponse = await fetch(`${baseUrl}/apply-template`, {
			method: "POST",
			headers,
			body: JSON.stringify(tokenizeRequest)
		});
		if (!parseResponse.ok) {
			const errorData = await parseResponse.json().catch(() => null);
			throw new Error(`API request failed with status ${parseResponse.status}: ${JSON.stringify(errorData)}`);
		}
		const parsedPrompt = await parseResponse.json();
		const response = await fetch(`${baseUrl}/tokenize`, {
			method: "POST",
			headers,
			body: JSON.stringify({ content: parsedPrompt.prompt })
		});
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
		}
		const dataTokens = await response.json();
		const textTokens = dataTokens.tokens?.length || 0;
		return textTokens + imageTokens;
	}
	async calculateImageTokens(messages, metadata) {
		const projectionDim = Math.floor(Number(metadata["clip.vision.projection_dim"]) / 10) || 256;
		let imageCount = 0;
		for (const message of messages) if (Array.isArray(message.content)) imageCount += message.content.filter((content) => content.type === "image_url").length;
		logger.info(`Calculated ${projectionDim} tokens per image, ${imageCount} images total`);
		return projectionDim * imageCount - imageCount;
	}
	estimateImageTokensFallback(messages) {
		const estimatedTokensPerImage = 256;
		let imageCount = 0;
		for (const message of messages) if (Array.isArray(message.content)) imageCount += message.content.filter((content) => content.type === "image_url").length;
		logger.warn(`Fallback estimation: ${estimatedTokensPerImage} tokens per image, ${imageCount} images total`);
		return imageCount * estimatedTokensPerImage - imageCount;
	}
};

//#endregion
export { llamacpp_extension as default };
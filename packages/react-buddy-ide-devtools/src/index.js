/**
 * @flow
 */

import Agent from 'react-devtools-shared/src/backend/agent';
import Bridge, {BackendBridge} from 'react-devtools-shared/src/bridge';
import {installHook} from 'react-devtools-shared/src/hook';
import {initBackend} from 'react-devtools-shared/src/backend';
import {
    updateBridge,
    savedPreferencesString,
    installHighlighter,
    initComponentFilters,
    initHighlightngGlobalSettings,
    installHighlightingModeChangingApi,
    installHighlightingClickHandler,
    installComponentsPropertiesEditorApi,
    installTraceUpdatesApi,
    sendSuccessInitMessage
} from './devtools-init';

window.REACT_BUDDY_IDE_DEVMODE = true;

savedPreferencesString();
installHook(window);
initComponentFilters(window);

const hook: ?DevToolsHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
const bridge: BackendBridge = new Bridge({
    listen() {},
    send(event: string, payload: any) {
        agent.emit(event, payload);
    }
});
const agent = new Agent(bridge);

updateBridge(bridge, agent);
initBackend(hook, agent, window);

initHighlightngGlobalSettings(window);
installComponentsPropertiesEditorApi(window, agent);
installHighlightingModeChangingApi(window, agent);
installHighlightingClickHandler(window, agent);
installHighlighter(agent, bridge, window);
installTraceUpdatesApi(window, agent);

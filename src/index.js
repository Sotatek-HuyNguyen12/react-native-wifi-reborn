import { NativeModules } from 'react-native';

const { WifiManager, RNWifiAndHotspotWizard } = NativeModules;

export const CONNECT_ERRORS = {
    unavailableForOSVersion: 'unavailableForOSVersion',
    invalid: 'invalid',
    invalidSSID: 'invalidSSID',
    invalidSSIDPrefix: 'invalidSSIDPrefix',
    invalidPassphrase: 'invalidPassphrase',
    userDenied: 'userDenied',
    locationPermissionDenied: 'locationPermissionDenied',
    unableToConnect: 'unableToConnect',
    locationPermissionRestricted: 'locationPermissionRestricted',
    locationPermissionMissing: 'locationPermissionMissing',
    locationServicesOff: 'locationServicesOff',
    couldNotEnableWifi: 'couldNotEnableWifi',
    couldNotScan: 'couldNotScan',
    couldNotDetectSSID: 'couldNotDetectSSID',
    didNotFindNetwork: 'didNotFindNetwork',
    authenticationErrorOccurred: 'authenticationErrorOccurred',
    android10ImmediatelyDroppedConnection: 'android10ImmediatelyDroppedConnection',
    timeoutOccurred: 'timeoutOccurred',
};

export const DISCONNECT_ERRORS = {
    couldNotGetWifiManager: 'couldNotGetWifiManager',
};

export const IS_REMOVE_WIFI_NETWORK_ERRORS = {
    locationPermissionMissing: 'locationPermissionMissing',
    couldNotGetWifiManager: 'couldNotGetWifiManager',
    couldNotGetConnectivityManager: 'couldNotGetConnectivityManager',
    couldNotRemove: 'couldNotRemove',
};

export const FORCE_WIFI_USAGE_ERRORS = {
    couldNotGetConnectivityManager: 'couldNotGetConnectivityManager',
};

export const LOAD_WIFI_LIST_ERRORS = {
    locationPermissionMissing: 'locationPermissionMissing',
    locationServicesOff: 'locationServicesOff',
    jsonParsingException: 'jsonParsingException',
    illegalViewOperationException: 'illegalViewOperationException',
};

export default WifiManager;

class WifiWizard {
    static turnOnWifi = () => RNWifiAndHotspotWizard.turnOnWifi();
    static turnOffWifi = () => RNWifiAndHotspotWizard.turnOffWifi();
    static isWifiEnabled = () => RNWifiAndHotspotWizard.isWifiEnabled();
    static getNearbyNetworks = async () =>{
       let devices =  await RNWifiAndHotspotWizard.startScan();
       return JSON.parse(devices);
    } 
    static connectToNetwork = async (network,SSID,password) =>{
       let message = await RNWifiAndHotspotWizard.connectToNetwork(JSON.stringify(network),SSID,password);
       return JSON.parse(message);
    } 
    static disconnectFromNetwork = () => RNWifiAndHotspotWizard.disconnectFromNetwork();
    static isReadyForCommunication = () => RNWifiAndHotspotWizard.isReadyForCommunication();
}

class HotspotWizard {
    static turnOnHotspot = async (SSID,Password) =>{
        WifiWizard.turnOffWifi();
        let status = await  RNWifiAndHotspotWizard.turnOnHotspot(SSID,Password);
        return JSON.parse(status);
    } 
    static isHotspotEnabled = () => RNWifiAndHotspotWizard.isHotspotEnabled()
    static turnOffHotspot = async () =>{
        let message = await RNWifiAndHotspotWizard.turnOffHotspot();
        return JSON.parse(message);
    } 
}
export {
    WifiWizard,
    HotspotWizard,
    RNWifiAndHotspotWizard,
}
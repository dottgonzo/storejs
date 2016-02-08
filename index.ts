import merge = require("json-add");
import los = require("linux-online-status");


interface AudioChannelAnswer {
    dev: string;
    active: boolean;
}

interface AudioAnswer {
    label: string;
    dev: string;
    pulsename: string;
    active: boolean;
    channels: AudioChannelAnswer[];
}

interface VideoChannelAnswer {
    dev: string;
    label: string;
    active: boolean;
}

interface VideoAnswer {
    dev: string;
    label: string;
    active: boolean;
    channels: VideoChannelAnswer[];
    model_id: string;
    vendor_id: string;
    resolution: string;
    bus: string;
    serial: string;
}


interface ScanAnswer {
    essid: string;
    mac: string;
    signal: string;
}

interface NetworkAnswer {
    type: string;
    mac: string;
    interface: string;
    essid?: string;
    scan?: ScanAnswer[];
    ip?: string;
    gateway?: string;
}



interface LsusbdevAnswer {
    dev: string;
    type: string;
    hub: string;
    product: string;
    id: string;
}

interface GetDrivesAnswer {
    filesystem: string;
    blocks: string;
    used: string;
    available: string;
    capacity: string;
    mounted: string;
}

interface IOnlineAnswer {
    bootId: string;
    bootTime: number;
    updatedAt: number;
    usbDevices: LsusbdevAnswer[];
    drives: GetDrivesAnswer[];
    networks: NetworkAnswer[];
    video: {
        inputs: VideoAnswer[];
    };
    audio: {
        inputs: AudioAnswer[];
    };
}


interface IObject {
    _id: string;
    updatedAt: string;
    type: string;
}

interface IComponents {
    type: string;
    uid: string;
}



function TimeNow() {
    return new Date().getTime();
}

function objectessentials(obj, serial) {
    if (!obj.updatedAt) {
        obj.updatedAt = TimeNow();
    }

    if (!obj.serial) {
        obj.serial = serial;
    }
    return obj;
}

export = class StoreApi {
    timezone: string;
    serial: string;
    components: IComponents[] = [];
    system: IOnlineAnswer;

    constructor(components: IComponents[], serial: string, timezone: string) {

        if (!components) {
            throw Error("missing object");
        } else if (!serial) {
            throw Error("missing uid");
        }
        if (!timezone) {
            this.timezone = "Europe/London";
        } else {
            this.timezone = timezone;
        }


        this.serial = serial;
        this.components = components;
        let sys = this.system;
        los().then(function(data) {
            sys = data;
        }).catch(function(err) {
            console.log("linux-online-status error:", err);
        });
    }


    status(obj?: any, type?: string): IObject {
        let defaultobj = <IObject>{};

        if (obj) {
            merge(obj, defaultobj);
            if (type) {
                obj.type = type;
            } else {
                obj.type = "status";
            }
        } else {
            obj = this.system;
            merge(obj, defaultobj);
            obj.type = "status";
        }

        if (!obj._id) {
            obj._id = obj.type + "_" + this.serial;
        }

        objectessentials(obj, this.serial);

        return obj;
    }


    data(obj: any, uid: string): IObject {
        if (!obj) {
            throw Error("missing object");
        } else if (!uid) {
            throw Error("missing uid");
        }


        objectessentials(obj, this.serial);

        if (!obj._id) {
            for (let i in this.components) {
                if (this.components[i].uid === uid) {
                    obj._id = this.components[i].type + "_" + uid + "_" + obj.updatedAt;
                }
            }
        }

        return obj;

    }

    new(uid: string) {
        if (!uid) {
            throw Error("missing uid");
        }
        let defaultobj = <IObject>{};

        objectessentials(defaultobj, this.serial);
        for (let i in this.components) {
            if (this.components[i].uid === uid) {
                defaultobj._id = this.components[i].type + "_" + uid + "_" + defaultobj.updatedAt;
            }
        }
        return defaultobj;
    }
}


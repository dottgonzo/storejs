import merge = require("json-add");


interface IObject {
    _id: string;
    updatedAt: string;
    type: string;
}
enum ETimers {
    daily,
    weekly,
    monthly,

}

interface Icounter {
    label: string;
    keys: string[];
    timer: ETimers;
}
interface ISum {
    label: string;
    keys: string[];
    timer: ETimers;
}
interface Isensor {
    label: string;
    counters: Icounter[];
    sum: ISum[];
    exec: Promise<any>
    format: Function;
}

interface IComponents {
    label: string;
    uid: string;
    measures: Isensor[];

    create: Function;
}



function TimeNow() {
    return new Date().getTime();
}

function objectessentials(obj, serial): {} {
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
    sensors: IComponents[] = [];


    constructor(sensors: IComponents[], serial: string, timezone: string) {

        if (!sensors) {
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
        this.sensors = sensors;
        for (var i in this.sensors) {

            this.sensors[i].measures.format = function(tag, obj) { // to be continued

                if (!tag) {
                    throw Error("missing something");
                }

                objectessentials(obj, this.serial);
                obj._id = tag + "_" + this.sensors[i].uid + "_" + obj.updatedAt;
                return obj
            }
            this.sensors[i].create = function(tag) {
                if (!tag) {
                    throw Error("missing something");
                }
                let defaultobj = <IObject>{};
                objectessentials(defaultobj, this.serial);
                defaultobj._id = tag + "_" + this.sensors[i].uid + "_" + defaultobj.updatedAt;
                return defaultobj
            }
        }
    }





    system(obj: any, tag?: string): IObject {
        let defaultobj = <IObject>{};

        if (obj && tag) {
            merge(obj, defaultobj);

        } else {
            throw Error("missed obj or tag")
        }

        if (!obj._id) {
            obj._id = tag + "_" + this.serial;
        }

        objectessentials(obj, this.serial);

        return obj;
    }



    sensor(uid: string) {

        let sensor = <IComponents>{};
        for (let i = 0; i < this.sensors.length; i++) {
            if (this.sensors[i].uid === uid) {

                sensor = this.sensors[i];
            }
        }

        if (!sensor.uid) {
            throw Error("no sensor founded")
        } else {
            return sensor

        }

    }


}


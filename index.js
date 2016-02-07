var merge = require("json-add");
var los = require("linux-online-status");
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
module.exports = (function () {
    function StoreApi(components, serial, timezone) {
        this.components = [];
        this.timezone = timezone;
        this.serial = serial;
        this.components = components;
        var sys = this.system;
        los().then(function (data) {
            sys = data;
        }).catch(function (err) {
            console.log("linux-online-status error:", err);
        });
    }
    StoreApi.prototype.status = function (obj, type) {
        var defaultobj = {};
        if (obj) {
            merge(obj, defaultobj);
            if (type) {
                obj.type = type;
            }
            else {
                obj.type = "status";
            }
        }
        else {
            obj = this.system;
            merge(obj, defaultobj);
            obj.type = "status";
        }
        if (!obj._id) {
            obj._id = obj.type + "_" + this.serial;
        }
        objectessentials(obj, this.serial);
        return obj;
    };
    StoreApi.prototype.data = function (obj, uid) {
        objectessentials(obj, this.serial);
        if (!obj._id) {
            for (var i in this.components) {
                if (this.components[i].uid === uid) {
                    obj._id = this.components[i].type + "_" + uid + "_" + obj.updatedAt;
                }
            }
        }
        return obj;
    };
    return StoreApi;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbIlRpbWVOb3ciLCJvYmplY3Rlc3NlbnRpYWxzIiwiY29uc3RydWN0b3IiLCJzdGF0dXMiLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLEtBQUssV0FBVyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFPLEdBQUcsV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0FBbUc1QztJQUNJQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxFQUFFQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtBQUNoQ0EsQ0FBQ0E7QUFFRCwwQkFBMEIsR0FBRyxFQUFFLE1BQU07SUFDakNDLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxFQUFFQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDZEEsR0FBR0EsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBQ0RBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO0FBQ2ZBLENBQUNBO0FBRUQsaUJBQVM7SUFNTCxrQkFBWSxVQUF5QixFQUFFLE1BQWMsRUFBRSxRQUFnQjtRQUh2RUMsZUFBVUEsR0FBa0JBLEVBQUVBLENBQUNBO1FBSTNCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxRQUFRQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDckJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFVBQVVBLENBQUNBO1FBQzdCQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUN0QkEsR0FBR0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBU0EsSUFBSUE7WUFDcEIsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLENBQUMsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBU0EsR0FBR0E7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBR0QseUJBQU0sR0FBTixVQUFPLEdBQVMsRUFBRSxJQUFhO1FBQzNCQyxJQUFJQSxVQUFVQSxHQUFZQSxFQUFFQSxDQUFDQTtRQUU3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDTkEsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNQQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBO1lBQ3hCQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNKQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUNsQkEsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBO1FBQ3hCQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVYQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUUzQ0EsQ0FBQ0E7UUFDREEsZ0JBQWdCQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUVuQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFHRCx1QkFBSSxHQUFKLFVBQUssR0FBUSxFQUFFLEdBQVc7UUFFdEJDLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFbkNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDeEVBLENBQUNBO1lBQ0xBLENBQUNBO1FBQ0xBLENBQUNBO1FBR0RBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO0lBQ2ZBLENBQUNBO0lBQ0wsZUFBQztBQUFELENBN0RTLEFBNkRSLEdBQUEsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtZXJnZSA9IHJlcXVpcmUoXCJqc29uLWFkZFwiKTtcbmltcG9ydCBsb3MgPSByZXF1aXJlKFwibGludXgtb25saW5lLXN0YXR1c1wiKTtcblxuXG5pbnRlcmZhY2UgQXVkaW9DaGFubmVsQW5zd2VyIHtcbiAgICBkZXY6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBBdWRpb0Fuc3dlciB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBkZXY6IHN0cmluZztcbiAgICBwdWxzZW5hbWU6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgY2hhbm5lbHM6IEF1ZGlvQ2hhbm5lbEFuc3dlcltdO1xufVxuXG5pbnRlcmZhY2UgVmlkZW9DaGFubmVsQW5zd2VyIHtcbiAgICBkZXY6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFZpZGVvQW5zd2VyIHtcbiAgICBkZXY6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBjaGFubmVsczogVmlkZW9DaGFubmVsQW5zd2VyW107XG4gICAgbW9kZWxfaWQ6IHN0cmluZztcbiAgICB2ZW5kb3JfaWQ6IHN0cmluZztcbiAgICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gICAgYnVzOiBzdHJpbmc7XG4gICAgc2VyaWFsOiBzdHJpbmc7XG59XG5cblxuaW50ZXJmYWNlIFNjYW5BbnN3ZXIge1xuICAgIGVzc2lkOiBzdHJpbmc7XG4gICAgbWFjOiBzdHJpbmc7XG4gICAgc2lnbmFsOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBOZXR3b3JrQW5zd2VyIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgbWFjOiBzdHJpbmc7XG4gICAgaW50ZXJmYWNlOiBzdHJpbmc7XG4gICAgZXNzaWQ/OiBzdHJpbmc7XG4gICAgc2Nhbj86IFNjYW5BbnN3ZXJbXTtcbiAgICBpcD86IHN0cmluZztcbiAgICBnYXRld2F5Pzogc3RyaW5nO1xufVxuXG5cblxuaW50ZXJmYWNlIExzdXNiZGV2QW5zd2VyIHtcbiAgICBkZXY6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgaHViOiBzdHJpbmc7XG4gICAgcHJvZHVjdDogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBHZXREcml2ZXNBbnN3ZXIge1xuICAgIGZpbGVzeXN0ZW06IHN0cmluZztcbiAgICBibG9ja3M6IHN0cmluZztcbiAgICB1c2VkOiBzdHJpbmc7XG4gICAgYXZhaWxhYmxlOiBzdHJpbmc7XG4gICAgY2FwYWNpdHk6IHN0cmluZztcbiAgICBtb3VudGVkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJT25saW5lQW5zd2VyIHtcbiAgICBib290SWQ6IHN0cmluZztcbiAgICBib290VGltZTogbnVtYmVyO1xuICAgIHVwZGF0ZWRBdDogbnVtYmVyO1xuICAgIHVzYkRldmljZXM6IExzdXNiZGV2QW5zd2VyW107XG4gICAgZHJpdmVzOiBHZXREcml2ZXNBbnN3ZXJbXTtcbiAgICBuZXR3b3JrczogTmV0d29ya0Fuc3dlcltdO1xuICAgIHZpZGVvOiB7XG4gICAgICAgIGlucHV0czogVmlkZW9BbnN3ZXJbXTtcbiAgICB9O1xuICAgIGF1ZGlvOiB7XG4gICAgICAgIGlucHV0czogQXVkaW9BbnN3ZXJbXTtcbiAgICB9O1xufVxuXG5cbmludGVyZmFjZSBJT2JqZWN0IHtcbiAgICBfaWQ6IHN0cmluZztcbiAgICB1cGRhdGVkQXQ6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJQ29tcG9uZW50cyB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHVpZDogc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gVGltZU5vdygpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdGVzc2VudGlhbHMob2JqLCBzZXJpYWwpIHtcbiAgICBpZiAoIW9iai51cGRhdGVkQXQpIHtcbiAgICAgICAgb2JqLnVwZGF0ZWRBdCA9IFRpbWVOb3coKTtcbiAgICB9XG5cbiAgICBpZiAoIW9iai5zZXJpYWwpIHtcbiAgICAgICAgb2JqLnNlcmlhbCA9IHNlcmlhbDtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0ID0gY2xhc3MgU3RvcmVBcGkge1xuICAgIHRpbWV6b25lOiBzdHJpbmc7XG4gICAgc2VyaWFsOiBzdHJpbmc7XG4gICAgY29tcG9uZW50czogSUNvbXBvbmVudHNbXSA9IFtdO1xuICAgIHN5c3RlbTogSU9ubGluZUFuc3dlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudHM6IElDb21wb25lbnRzW10sIHNlcmlhbDogc3RyaW5nLCB0aW1lem9uZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGltZXpvbmUgPSB0aW1lem9uZTtcbiAgICAgICAgdGhpcy5zZXJpYWwgPSBzZXJpYWw7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIGxldCBzeXMgPSB0aGlzLnN5c3RlbTtcbiAgICAgICAgbG9zKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBzeXMgPSBkYXRhO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGludXgtb25saW5lLXN0YXR1cyBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBzdGF0dXMob2JqPzogYW55LCB0eXBlPzogc3RyaW5nKTogSU9iamVjdCB7XG4gICAgICAgIGxldCBkZWZhdWx0b2JqID0gPElPYmplY3Q+e307XG5cbiAgICAgICAgaWYgKG9iaikge1xuICAgICAgICAgICAgbWVyZ2Uob2JqLCBkZWZhdWx0b2JqKTtcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgb2JqLnR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmoudHlwZSA9IFwic3RhdHVzXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSB0aGlzLnN5c3RlbTtcbiAgICAgICAgICAgIG1lcmdlKG9iaiwgZGVmYXVsdG9iaik7XG4gICAgICAgICAgICBvYmoudHlwZSA9IFwic3RhdHVzXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9iai5faWQpIHtcblxuICAgICAgICAgICAgb2JqLl9pZCA9IG9iai50eXBlICsgXCJfXCIgKyB0aGlzLnNlcmlhbDtcblxuICAgICAgICB9XG4gICAgICAgIG9iamVjdGVzc2VudGlhbHMob2JqLCB0aGlzLnNlcmlhbCk7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cblxuICAgIGRhdGEob2JqOiBhbnksIHVpZDogc3RyaW5nKTogSU9iamVjdCB7XG5cbiAgICAgICAgb2JqZWN0ZXNzZW50aWFscyhvYmosIHRoaXMuc2VyaWFsKTtcblxuICAgICAgICBpZiAoIW9iai5faWQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50c1tpXS51aWQgPT09IHVpZCkge1xuICAgICAgICAgICAgICAgICAgICBvYmouX2lkID0gdGhpcy5jb21wb25lbnRzW2ldLnR5cGUgKyBcIl9cIiArIHVpZCArIFwiX1wiICsgb2JqLnVwZGF0ZWRBdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

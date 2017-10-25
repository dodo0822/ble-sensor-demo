const ADXL345 = require('adxl345-sensor');
const util = require('util');
const bleno = require('bleno');

var SensorCharacteristic = function() {
    SensorCharacteristic.super_.call(this, {
        uuid: 'ec0e',
        properties: [ 'read' ],
        value: null
    });

    this._value = {x:0,y:0,z:0};
};
util.inherits(SensorCharacteristic, bleno.Characteristic);
SensorCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log(`onReadRequest: `);
    console.log(this._value);
    var b = Buffer(12);
    b.fill(0);
    b.writeFloatBE(this._value.x, 0);
    b.writeFloatBE(this._value.y, 4);
    b.writeFloatBE(this._value.z, 8);
    callback(this.RESULT_SUCCESS, b);
};

var ch = new SensorCharacteristic();

const sensor = new ADXL345();

const setupSensor = async () => {
    await sensor.init();
    console.log('ADXL345 initialization succeeded');
    setInterval(async () => {
        var result = await sensor.getAcceleration(false);
        ch._value = result;
    }, 1000);
    var result = await sensor.getAcceleration(false);
    console.log(result);
};

setupSensor();

bleno.on('stateChange', (state) => {
    console.log(`stateChange: ${state}`);
    if(state === 'poweredOn') {
        bleno.startAdvertising('sensor', ['ec00']);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', (error) => {
    if(!error) {
        console.log('advertisingStart success');
        bleno.setServices([
            new bleno.PrimaryService({
                uuid: 'ec00',
                characteristics: [
                    ch
                ]
            })
        ]);
    } else {
        console.log('advertisingStart failed');
        console.log(error);
    }
});

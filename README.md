# BLE sensor demo
This repository consists of two programs: one for the peripheral which reads the data from sensor and stores it, one for the central which reads data from the peripheral

## Installing
### Peripheral
Install latest Node.js from official repository. Then install the required libraries.
```
sudo apt-get install libudev-dev libbluetooth-dev
npm install
```

### Central
Install the required libraries.
```
sudo apt-get install libglib2.0-dev
sudo pip3 install bluepy
```

## Running
### Peripheral
Make sure the Bluetooth interface is up.
```
sudo hciconfig hci0 up
```
Run the program.
```
sudo node ble.js
```
### Central
Make sure the Bluetooth interface is up.
```
sudo hciconfig hci0 up
```
Edit `ble.py` and change the device address to the peripheral's.
Now run the program.
```
sudo python3 ble.py
```

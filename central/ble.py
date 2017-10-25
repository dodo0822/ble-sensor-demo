from bluepy import btle
from time import sleep
import struct

print('Connecting..')
dev = btle.Peripheral('B8:27:EB:62:AB:3A')

svc = dev.getServiceByUUID(btle.UUID('ec00'))

sensor = svc.getCharacteristics()[0]

try:
    while True:
        raw = sensor.read()
        (x, y, z) = struct.unpack('>fff', raw)
        print('\r{0:10.4f} {1:10.4f} {2:10.4f}'.format(x, y, z), end='')
        sleep(1)
except KeyboardInterrupt:
    print('\nInterrupt signal received')

print('Ending')

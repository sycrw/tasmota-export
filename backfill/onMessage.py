import json

from influxdb_client import Point

from influxConfig import write_api, bucket


def handle(input):
    message_str = input.payload.decode("utf-8")
    print(message_str)

    if message_str.startswith("b'") or message_str.startswith('b"'):
        message_str = message_str[2:-1]

    if not message_str.strip():
        print("Error: Decoded string is empty.")
        return

    try:
        data = json.loads(message_str)
        power = data["ENERGY"]["Power"]
        voltage = data["ENERGY"]["Voltage"]
        apparent_power = data["ENERGY"]["ApparentPower"]
        power_today = data["ENERGY"]["Today"]
        power_total = data["ENERGY"]["Total"]
        print(f'writing into influx:{power} {voltage} {apparent_power} {power_today} {power_total}')
        power_point = Point("tasmota") \
            .field("power", power)
        voltage_point = Point("tasmota") \
            .field("voltage", voltage)
        apparent_power_point = Point("tasmota") \
            .field("apparentPower", apparent_power)
        power_today_point = Point("tasmota") \
            .field("powerToday", power_today)
        power_total_point = Point("tasmota") \
            .field("powerTotal", power_total)
        write_api.write(bucket=bucket,
                        record=[power_point, voltage_point, apparent_power_point, power_today_point, power_total_point])

    except Exception as e:
        print(f"Failed: {e}")

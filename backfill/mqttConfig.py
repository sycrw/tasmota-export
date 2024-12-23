import os

import paho.mqtt.client as mqtt
from onMessage import handle


def on_connect(client, userdata, flags, reason_code, properties):
    print(f"[MQTT]Connected with result code {reason_code}")
    client.subscribe("#")


def on_message(client, userdata, msg):
    print(f"[MQTT][MESSAGE]{msg.topic}")
    if "SENSOR" in msg.topic:
        handle(msg)
    print("_---__---__---__---__---__---__---__---__---__---_")


def on_subscribe(mqttc, obj, mid, reason_code_list, properties):
    print("[MQTT] Subscribed: " + str(mid) + " " + str(reason_code_list))


def startup():
    print("[STARTUP] mqtt connection")
    mqttc.username_pw_set(os.getenv("MQTT_BROKER_USER"), os.getenv("MQTT_BROKER_PASS"))
    mqttc.connect(os.getenv("MQTT_BROKER_HOST"), int(os.getenv("MQTT_BROKER_PORT")), 60)
    print("[STARTUP] mqtt connected")
    mqttc.loop_forever()


mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe

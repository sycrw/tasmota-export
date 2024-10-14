import os

from mqttConfig import startup
print(f"[STARTUP][ENV]:{os.environ}")
print("[STARTUP] start sequence")
startup()
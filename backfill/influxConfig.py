import os

from influxdb_client import InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

# can also be configured to load data from env
url = os.getenv("INFLUX_DB_HOST")
token = os.getenv("INFLUX_DB_TOKEN")
org = os.getenv("INFLUX_DB_ORG")
bucket = os.getenv("INFLUX_DB_BUCKET")

client = InfluxDBClient(url=url, token=token, org=org)
write_api = client.write_api(write_options=SYNCHRONOUS)


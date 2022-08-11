import os, time, json, random, datetime
from google.cloud import pubsub_v1
from google.api_core.exceptions import AlreadyExists
from flask import Flask

project = "local-project"
topics = {}

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()

def create_topic(topic):
    try:
        publisher.create_topic(name=topic)
    except AlreadyExists:
        print(f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
              f" [WARNING] Topic \"{topic}\" already exists.")

def create_subscription(topic, subscription):
    try:
        subscriber.create_subscription(name=subscription, topic=topic)
    except AlreadyExists:
        print(f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
              f' [WARNING] Subscription \"{subscription}\" already exists')

def create_push_subscription(topic, subscription, endpoint):
    try:
        push_config = pubsub_v1.types.PushConfig(push_endpoint=endpoint)
        subscriber.create_subscription(
            request={
                "name": subscription,
                "topic": topic,
                "push_config": push_config,
            }
        )
    except AlreadyExists:
        print(f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
              f' [WARNING] Subscription \"{subscription}\" already exists')


# for topic in topics:
#     topic_name = f"projects/{project}/topics/{topic}"
#     subscriptions = topics[topic]
#     create_topic(topic_name)
#     for subscription in subscriptions:
#         if isinstance(subscription, list):
#             subscription_name = f"projects/{project}/subscriptions/{subscription[0]}"
#             create_push_subscription(topic_name, subscription_name, subscription[1])
#         else:
#             subscription_name = f"projects/{project}/subscriptions/{subscription}"
#             create_subscription(topic_name, subscription_name)


print("Flask app init")

app = Flask(__name__)

@app.route("/")
def hello_world():
    print("This service is now ready!")
    return "This service is not ready!"


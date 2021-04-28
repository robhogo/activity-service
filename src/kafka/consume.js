const Kafka = require("node-rdkafka"); // see: https://github.com/blizzard/node-rdkafka
const externalConfig = require('./kafka-config').config;

const CONSUMER_GROUP_ID = "node-consumer-one";
const io = require("../socket-server/server");

const kafkaConf = {
    "group.id": CONSUMER_GROUP_ID,
    "metadata.broker.list": externalConfig.KAFKA_BROKERS,
    "socket.keepalive.enable": true,
    "debug": "generic,broker,security"
};

const topic = externalConfig.KAFKA_TOPIC;

var stream = new Kafka.KafkaConsumer.createReadStream(kafkaConf, { "auto.offset.reset": "earliest" }, {
    topics: topic
});

console.log(`Stream consumer created to consume from topic ${topic}`);

stream.on('data', function (message) {
    console.log(`Consumed message on Stream: ${message.value.toString()}`);
    io.emit('chat message', message.value.toString());
});

stream.consumer.on("disconnected", function (arg) {
    console.log(`The stream consumer has been disconnected`)
    process.exit();
});
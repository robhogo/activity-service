const Kafka = require("node-rdkafka");
const externalConfig = require('./kafka-config').config;

// construct a Kafka Configuration object understood by the node-rdkafka library
const kafkaConf = {
    "metadata.broker.list": externalConfig.KAFKA_BROKERS,
    "socket.keepalive.enable": true,
    "debug": "generic,broker,security"
};
const topic = externalConfig.KAFKA_TOPIC;
// create a Kafka Producer - connected to the KAFKA_BROKERS defined in config.js
const producer = new Kafka.Producer(kafkaConf);
prepareProducer(producer)
// initialize the connection of the Producer to the Kafka Cluster
producer.connect();

function prepareProducer(producer) {
    // event handler attached to the Kafka Producer to handle the ready event that is emitted when the Producer has connected sucessfully to the Kafka Cluster
    producer.on("ready", function (arg) {
        console.log(`Producer connection to Kafka Cluster is ready; message production starts now`)
    });

    producer.on("disconnected", function (arg) {
        process.exit();
    });

    producer.on('event.error', function (err) {
        console.error(err);
        process.exit(1);
    });

    producer.on('chat message', function (msg) {
        producer.produce(topic, -1, generateMessage(msg));
    })
}

const generateMessage = msg => new Buffer.from(msg);

module.exports =  producer;
const {ServiceBroker} = require('moleculer')
const broker = new ServiceBroker()
broker.createService({
    name : 'math', 
    actions : {
        add(ctx) {
            return Number(ctx.params.a) + Number(ctx.params.b); 
        }
    }
})

broker.start().then(() => {
    process.stdin.resume()
    console.log("enter two numbers separated by space, press exit to quit")
    process.stdin.on('data', (data) => {
        const str = data.toString()
        if (str.trim() === "exit") {
            console.log("quitting")
            process.exit(0)
            return
        }
        const a = parseInt(str.split(" ")[0])
        const b = parseInt(str.split(" ")[1])
        broker.call("math.add", {a, b}).then((res) => {
            console.log(`additon of ${a} and ${b} is ${res}`)
        }).catch(console.error)
    })
}).catch((err) => {
        console.log(err)
})
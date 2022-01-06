const seedProjects = [
    {
        title: "Ohms Law",
        img: "https://imgur.com/s4W7i96.jpg",
        briefing: "Simple experiment to understand ohms law",
        goal: ["Understanding Voltage", "Understanding Resistance", "Understanding Current", "Explain the relationship with each other"],
        description: "Simple experiment which can be easily done at home as a practice. ",
        components: ["Breadboard", "a couple of Resistors", "Wires", "Digital Power Supply (+10V)", "Multi-meter"],
        posted_by: "61d1a384134bfa33ed6e5c22",
    },
    {
        title: "AC TO DC",
        img: "https://imgur.com/4a1OTwn.png",
        briefing: "Simple experiment to understand voltage conversion from AC to DC",
        goal: ["Understand AC and DC voltage", "Understanding Full wave rectifier"],
        description: "Simple experiment which can be easily done at home as a practice. To understand be be able to explain how AC are converted to DC, and the purpose of related components. Wire up circuit as shown in diagram, make sure the diodes, and capacitor's polarity are correct! Failure to check the polarity at the capacitor will result in damaged capacitor Subsequently, use a oscilloscope to read the incoming voltage, it should be AC, then, put the oscilloscope at the positive point of the capacitor, we should see a wave with ripple voltage. Lastly, put it at the positive point of the zener diode, we should observe a DC voltage.",
        components: ["Breadboard", "a couple of Diodes", "Zener Diode", "Capacitor", "Wires", "AC power supply", "Multi-meter"],
        posted_by: "61d1a384134bfa33ed6e5c22",
    },
]

module.exports = seedProjects;
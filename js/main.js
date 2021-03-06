/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
const MARGIN = {LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100}
const WIDTH = 400
const HEIGHT = 400

const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
 .attr("class", "x axis")
 .attr("x", WIDTH / 2)
 .attr("y", HEIGHT + 60)
 .attr("font-size", "16px")
 .attr("text-anchor", "middle")
 .text("The world latest person")

 // Y label
 g.append("text")
 .attr("class", "ys axis")
 .attr("x", - (HEIGHT / 2))
 .attr("y", -50)
 .attr("font-size", "16px")
 .attr("text-anchor", "middle")
 .attr("transform", "rotate(-90)")
 .text("Age (ms)")

d3.json("data/buildings.json").then(data => {
    // console.log(data);
    data.forEach(d => {
        d.age = Number(d.age)
    })

    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, WIDTH])
        .paddingInner(0.2)
        .paddingOuter(0.2)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.age)])
        .range([HEIGHT, 0])

    const xAxisCall = d3.axisBottom(x)
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", -5)
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")
    
    const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + "ms")

    g.append("g")
      .attr("class", "y axis")
      .attr("transforms", `translate(${HEIGHT}, 0)`)
      .call(yAxisCall)

    const rects = g.selectAll("rect")
        .data(data)

    rects.enter().append("rect")
        .attr("y", d => y(d.age))
        .attr("x", d => x(d.name))
        .attr("width", x.bandwidth())
        .attr("height", d => HEIGHT - y(d.age))  
        .attr("fill", "green")

})
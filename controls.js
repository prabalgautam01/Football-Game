document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let dimensions = document.querySelector("#container").getBoundingClientRect();
    let translateX = 0;
    // Case 1 :- Cursor is outside the playground
    if (x < dimensions.left || x > dimensions.right) {
        translateX = (x < dimensions.left ? -1 * (dimensions.width) / 2 + 50 : (dimensions.width / 2) - 50);
    }
    // Case 2 :- Cursor is inside the playground
    else {
        if( x - 50 < dimensions.left || x + 50 > dimensions.right ) {
            translateX = (x - 50 < dimensions.left ? -1 * (dimensions.width) / 2 + 50 : (dimensions.width / 2) - 50);
        }else {
            let c = dimensions.left + (dimensions.width / 2);
            translateX = (x < c ? -1 * (c - x) : (x - c));
        }

    }

    d3.select('#football > svg')
    .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .attr("transform",`translate(${translateX},0)`)
})

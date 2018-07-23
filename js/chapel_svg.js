const viewbox = {
    width: 200,
    height: 220
};

const y = {
    stand: 10,
    congregation: 60,
    overflow: 160
};

const row = {
    left: 10,
    center: 60,
    right: 160
};

function styleAttrs(num, num2){
    //Two colors - https://stackoverflow.com/questions/13069446/simple-fill-pattern-in-svg-diagonal-hatching
}


const ChapelSvg = {
    // view: vnode => m('svg', {}, [
    view: vnode => m('svg', {width:'200', height:'220', viewBox: `0 0 ${viewbox.width} ${viewbox.height}` }, [
        //Stand
        m('rect', {x: 10, y: y.stand, width: '30', height: '30',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),
        m('rect', {x: '60', y: y.stand, width: '80', height: '30',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),
        m('rect', {x: '160', y: y.stand, width: '30', height: '30',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),
        m('text', {x: 145, y: 40, fill: 'red'}, '1'),
        // <text x="20" y  class="small">My</text>


        //Middle
        m('rect', {x: '10', y: y.congregation, width: '30', height: '80',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),
        m('rect', {x: '60', y: y.congregation, width: '80', height: '80',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),
        m('rect', {x: '160', y: y.congregation, width: '30', height: '80',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),

        //Overflow
        m('rect', {x: '10', y: y.overflow, width: '80', height: '50',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        }),
        m('rect', {x: '110', y: y.overflow, width: '80', height: '50',
            style:"fill:red;stroke:black;stroke-width:5;opacity:0.5"
        })

    ])
};

export default ChapelSvg;
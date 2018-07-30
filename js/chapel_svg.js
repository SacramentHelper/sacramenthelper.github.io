const personSize = 20;
const aisle = personSize * 2;
const borderSpace = 10;

const w = {
    side: personSize * 4,
    center: personSize * 12,
    overflow: personSize * 9,
};

const h = {
    stand: personSize * 3,
    congregation: personSize * 10,
    overflow: personSize * 6,
    passers: personSize * 2
};

const x = {
    start: {
        left: borderSpace,
        center: borderSpace + aisle + w.side,
        right: borderSpace + aisle * 2 + w.side + w.center,
        overflow: {
            left: borderSpace + aisle,
            right: borderSpace + aisle * 2 + w.overflow,
        }
    }
};

const y = {
    start: {
        stand: borderSpace,
        congregation: borderSpace + h.stand + aisle,
        overflow: borderSpace + h.stand + h.congregation + aisle * 2,
    }
};

const viewbox = {
    x: borderSpace * 2 + aisle * 2 + w.side * 2 + w.center,
    y: borderSpace * 2 + aisle * 2 + h.stand + h.congregation + h.overflow,
};

function styleAttrs(num, num2){
    //Two colors - https://stackoverflow.com/questions/13069446/simple-fill-pattern-in-svg-diagonal-hatching
}

const colors = ['green', 'blue', 'red', 'purple', 'orange', 'cyan']


const passers = 6;

const ChapelSvg = {
    // view: vnode => m('svg', {}, [
    view: vnode => m('svg', {width: viewbox.x, height: viewbox.y, viewBox: `0 0 ${viewbox.x} ${viewbox.y}` }, [
        //Stand
        m('rect.border', {x: x.start.left, y: y.start.stand, width: w.side, height: h.stand,
            style:`fill:${colors[2]};`
        }),
        m('rect.border', {x: x.start.center, y: y.start.stand, width: w.center, height: h.stand,
            style:`fill:${colors[2]};`
        }),
        m('rect.border', {x: x.start.right, y: y.start.stand, width: w.side, height: h.stand,
            style:`fill:${colors[2]};`
        }),


        //Congregation
        m('rect.border', {x: x.start.left, y: y.start.congregation, width: w.side, height: h.congregation,
            style:`fill:${colors[2]};`
        }),

        m('pattern', { id:"diagonalHatch", patternUnits:"userSpaceOnUse", width:"4", height:"4"},
            m('path', { d:"M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2", style:"stroke:black; stroke-width:1"})),


        // <rect width="50" height="50" x="25" y="25" fill="child" stroke="grey">
        //     <pattern viewBox="0 0 100 100" width="20%" height="20%">
        //         <path d="M0,0 h40 L100,60 v40 z m 0,60 v40 h40 z" fill="red" />
        //     </pattern>
        //     <pattern viewBox="0 0 100 100" width="20%" height="20%">
        //         <path d="M0,0 h40 L100,60 v40 z m 0,60 v40 h40 z" fill="grey" />
        //     </pattern>
        // </rect>

        // m('rect.border', {x: x.start.center, y: y.start.congregation, width: w.center, height: h.congregation,
        //     style:"fill:url(#diagonalHatch);"
        // }),

        m('rect.border.stripe-1', {x: x.start.center, y: y.start.congregation, width: w.center, height: h.congregation,
            // style:"fill:url(#diagonalHatch);"
            style:"fill:none;"
        }),

        


        // Right side Boarder
        m('rect.border', {x: x.start.right, y: y.start.congregation, width: w.side, height: h.congregation,
            style: "fill:none;"
        }),
        // Right side fill
        m('rect', {x: x.start.right, y: y.start.congregation + h.passers, width: w.side, height: h.congregation - h.passers,
            style:`fill:${colors[3]};`
        }),

        //Overflow
        m('rect.border', {x: x.start.overflow.left, y: y.start.overflow, width: w.overflow, height: h.overflow,
            style:`fill:${colors[4]};`
        }),
        m('rect.border', {x: x.start.overflow.right, y: y.start.overflow, width: w.overflow, height: h.overflow,
            style:`fill:${colors[5]};`
        }),

        Array(passers).fill(0).map((_, i) =>
            m('text', {
                x: x.start.right + borderSpace + personSize * (i % (passers/2)),
                y: y.start.congregation + borderSpace * 2 + personSize * Math.floor(i / (passers/2)),
                fill: colors[i],
                opacity:0.5,
            }, i + 1)
        ),
    ])
};

export default ChapelSvg;
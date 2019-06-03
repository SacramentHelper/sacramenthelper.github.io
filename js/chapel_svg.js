// SVG Help https://www.sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/
// https://www.sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/
// Two colors - https://stackoverflow.com/questions/13069446/simple-fill-pattern-in-svg-diagonal-hatching

const personSize = 20;
const aisle = personSize * 2;


const viewbox = {
    x: 2000, y: 2000,

    // x: borderSpace * 2 + aisle * 2 + w.side * 2 + w.center,
    // y: borderSpace * 2 + aisle * 2 + h.stand + h.congregation + h.overflow,
};

const selectorSkew = 10;
const showSelectors = false;

/** rowThreeSections
 * top, rows, sections: {seats, passers}
*/
const rowSections = {
    view: vnode => [
        vnode.attrs.sections.map((section, i) => {
            let left = personSize;
            if (vnode.attrs.sections.length % 2 == 0) { left += personSize; }

            for (let j = i -1; j >= 0; j--){
                let prev = vnode.attrs.sections[j]
                left += aisle + prev.seats * personSize
            }

            return [
                m(`rect.border`,
                    {
                        y: vnode.attrs.top,
                        x: left,
                        height: vnode.attrs.rows * personSize,
                        width: section.seats * personSize,
                    }
                ),
                showSelectors && [
                    m('text.selector', {
                        y: vnode.attrs.top + personSize,
                        x: left - selectorSkew,
                    }, 'a'),
                    m('text.selector', {
                        y: vnode.attrs.top + personSize,
                        x: left + selectorSkew + section.seats * personSize,
                    }, 'b'),
                    m('text.selector', {
                        y: vnode.attrs.top + vnode.attrs.rows * personSize,
                        x: left - selectorSkew,
                    }, 'c'),
                    m('text.selector', {
                        y: vnode.attrs.top + vnode.attrs.rows * personSize,
                        x: left + selectorSkew + section.seats * personSize,
                    }, 'd'),
                ],
            ];
        }),
    ]
};


let temp =  [
    {
        rows: 2,
        sections: [
            {seats: 4},
            {seats: 10},
            {seats: 4},
        ],
    },
    {
        rows: 8,
        sections: [
            {seats: 4},
            {seats: 10},
            {seats: 4},
        ],
    },
    {
        rows: 4,
        sections: [
            {seats: 9},
            {seats: 9},
        ],
    },
];


const passers = 8;
// TODO figure this out
const passX = 364;
const passY = 120;


const ChapelSvg = {
    view: vnode => m('svg', {width: viewbox.x, height: viewbox.y, viewBox: `0 0 ${viewbox.x} ${viewbox.y}` },

       temp.map((row, i) => {
            console.log(i, row);

            let top = personSize
            for (let j = i -1; j >= 0; j--){
                let prev = temp[j]
                top += aisle + prev.rows * personSize
            }

            return m(rowSections, {
                top: top,
                rows: row.rows,
                sections: row.sections,
            })
        }),


        Array(passers).fill(0).map((_, i) =>
            m(`text.passer-${i}`, {
                x: passX + personSize + personSize * (i % (passers/2)),
                y: passY + personSize * Math.floor(i / (passers/2)),
                opacity:0.5,
            }, i + 1)
        ),
    )
};

export default ChapelSvg;
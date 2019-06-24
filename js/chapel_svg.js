// SVG Help https://www.sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/
// https://www.sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/
// Two colors - https://stackoverflow.com/questions/13069446/simple-fill-pattern-in-svg-diagonal-hatching

const personSize = 20;
const aisle = personSize * 2;


const viewbox = {
    x: 500, y: 400,
};

const selectorSkew = 10;
const showSelectors = false;

/** rowThreeSections
 * top, rows, seats: [#...]
*/
const rowSections = {
    view: vnode => [
        vnode.attrs.sections.map((section, i) => {
            let left = personSize;
            if (vnode.attrs.sections.length % 2 == 0) { left += personSize; }

            for (let j = i -1; j >= 0; j--){
                let prev = vnode.attrs.sections[j]
                left += aisle + prev * personSize
            }

            return [
                m(`rect.border`,
                    {
                        y: vnode.attrs.top,
                        x: left,
                        height: vnode.attrs.rows * personSize,
                        width: section * personSize,
                    }
                ),
                showSelectors && [
                    m('text.selector', {
                        y: vnode.attrs.top + personSize,
                        x: left - selectorSkew,
                    }, 'a'),
                    m('text.selector', {
                        y: vnode.attrs.top + personSize,
                        x: left + selectorSkew + section * personSize,
                    }, 'b'),
                    m('text.selector', {
                        y: vnode.attrs.top + vnode.attrs.rows * personSize,
                        x: left - selectorSkew,
                    }, 'c'),
                    m('text.selector', {
                        y: vnode.attrs.top + vnode.attrs.rows * personSize,
                        x: left + selectorSkew + section * personSize,
                    }, 'd'),
                ],
            ];
        }),
    ]
};

const sectionsKey = 'sections';
const passersKey = 'passers';
const rowsKey = 'rows';
const seatsKey = 'seats';
const displayedSectionsKey = 'displayedSections';

function initDisplayedSection(rows, seats) {
    const ds = {
        [rowsKey]: 2,
        [seatsKey]: [4, 10, 4],
    };
    if (rows) ds[rowsKey] = rows;
    if (seats) ds[seatsKey] = seats
    return ds;
}

const configValues = {
    [passersKey]: 8,
    [sectionsKey]: [
        initDisplayedSection(2, [4, 10, 4]),
        initDisplayedSection(8 , [4, 10 ,4]),
        initDisplayedSection(4, [9, 9]),
    ],
    [displayedSectionsKey]: [
        initDisplayedSection(2, [4, 10, 4]),
        initDisplayedSection(8 , [4, 10 ,4]),
        initDisplayedSection(4, [9, 9]),
    ],
};

const Configuration = {
    view: _ => m('',
        m('.input',
            m('label', {for: passersKey}, 'Passers: '),
            m('input', {id: passersKey, type: 'number', min: '1', max: '16',
                value: configValues[passersKey],
                onchange: e => configValues[passersKey] = e.target.value,
            }),
        ),
        m('.input',
            m('label', {for: sectionsKey}, 'Sections: '),
            m('input', {id: sectionsKey, type: 'number', min: '2', max: '3',
                value: configValues[displayedSectionsKey].length,
                onchange: e => {
                    const out = [];
                    for(var i=0; i < e.target.value; i++){
                        if (configValues[sectionsKey].length +1 < i){
                            configValues[sectionsKey].push(initDisplayedSection());
                        }
                        out.push(configValues[sectionsKey][i]);
                    }
                    configValues[displayedSectionsKey] = out;
                },
            }),
        ),
    )
};


// TODO figure this out
const passX = 364;
const passY = 120;


const ChapelSvg = {
    view: vnode => m('svg', {width: viewbox.x, height: viewbox.y, viewBox: `0 0 ${viewbox.x} ${viewbox.y}` },

    configValues[displayedSectionsKey].map((row, i) => {
            console.log(i, row);

            let top = personSize
            for (let j = i -1; j >= 0; j--){
                let prev = configValues[displayedSectionsKey][j]
                top += aisle + prev.rows * personSize
            }

            return m(rowSections, {
                top: top,
                rows: row[rowsKey],
                sections: row[seatsKey],
            })
        }),


        Array(configValues[passersKey]).fill(0).map((_, i) =>
            m(`text.passer-${i}`, {
                x: passX + personSize + personSize * (i % (configValues[passersKey]/2)),
                y: passY + personSize * Math.floor(i / (configValues[passersKey]/2)),
                opacity:0.5,
            }, i + 1)
        ),
    )
};

const Arrangment = {
    view: _ => m('.flex',
        m(Configuration),
        m(ChapelSvg),
    )
};

export default Arrangment;
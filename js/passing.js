import ChapelSvg from "/js/chapel_svg.js";

const Passing= {
    view: _ => m('', [
        m('section.hero.is-light',
            m('.hero-body', [
                m('p.title', 'Passing'),
                m('p.subtitle', 'Help for keeping it reverent when passing the sacrament')
            ])
        ),
        m('section', [
            m('.columns', [
                // m('.column', [
                //     'Options'
                // ]),
                m('.column', [
                    "Image",
                    m(ChapelSvg)
                ])
            ])
        ]),
        m('section', [
            "Notes"
        ])
    ])
}

export { Passing };
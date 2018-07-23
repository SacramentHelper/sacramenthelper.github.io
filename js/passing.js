const Passing= {
    view: _ => m('', [
        m('section.hero.is-primary',
            m('.hero-body', [
                m('p.title', 'Passing'),
                m('p.subtitle', 'Help for keeping it reverent when passing the sacrament')
            ])
        ),
        m('section', [
            m('.columns', [
                m('.column', 'Left'),
                m('.column', 'Right')
            ])


        ])


    ])
}

export { Passing };
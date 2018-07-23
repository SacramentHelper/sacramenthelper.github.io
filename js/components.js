const Frame = {
    view: vnode => m('', [
        m('nav.navbar.is-dark', { role:"navigation", ariaLabel:'main navigation'}, [
            m('.navbar-brand', [
                m('.navbar-item', 'Sacrament Helper'),
                // m('a.navbar-item[href=/passing]', {oncreate: m.route.link}, 'Passing'),
                // m('a.navbar-item[href=/blessing]', {oncreate: m.route.link}, 'Blessing'),
                // m('a.navbar-item[href=/prep]', {oncreate: m.route.link}, 'Preparation')
            ]),
        ]),
        vnode.children,
    ])
}

export { Frame };
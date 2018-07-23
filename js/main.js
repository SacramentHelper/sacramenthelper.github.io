import { Frame } from '/js/components.js';
import { Passing } from '/js/passing.js';


m.route(document.body, "/passing", {
    '/passing': {view: _ => m(Frame, m(Passing))},
    // '/blessing': {view: _ => m(Frame, "Blessing")},
    // '/prep': {view: _ => m(Frame, "Preparation and Take Down")},
});
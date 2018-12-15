/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { buildCustomElementConstructor } from 'lwc';
import Table from 'benchmark/tableComponent';
import Row from 'benchmark/tableComponentRow';

import { Store } from '../../tableStore';
import { insertTableComponent, destroyTableComponent } from '../../utils';

customElements.define('benchmark-table-component', buildCustomElementConstructor(Table));
// the row can be optionally defined, but this benchmark always do it so we know how costly it is.
customElements.define('benchmark-table-component-row', buildCustomElementConstructor(Row));

benchmark(`benchmark-table-wc/create/1k`, () => {
    let tableElement;

    before(() => {
        tableElement = document.createElement('benchmark-table-component');
        return insertTableComponent(tableElement);
    });

    run(() => {
        const store = new Store();
        store.run();
        tableElement.rows = store.data;
    });

    after(() => {
        destroyTableComponent(tableElement);
    });
});

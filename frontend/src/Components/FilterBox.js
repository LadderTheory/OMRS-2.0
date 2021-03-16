import React from 'react'

class FilterBox {
    constructor(filters) {

    }

    filters = [];
    style = {};

    apple() {
        return (<p>appel</p>)
    }

    static makeFilter(name, label, func = () => {}) {
        return {
            'name': name,
            'label': label,
            'function': func,
        }
    }

    render() {
        return (
            <div>
                {this.filters.map(x => {(<p>{x.label}</p>)})}
            </div>
        )
    }
}

export default FilterBox
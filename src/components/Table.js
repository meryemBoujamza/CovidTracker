import React from 'react'
import '../styles/Table.css'
import NumericLabel from 'react-pretty-numbers';
function Table({countries}) {

    return (
        <div className="table">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong><NumericLabel >{cases}</NumericLabel></strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table

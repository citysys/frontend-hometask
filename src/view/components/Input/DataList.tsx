import React, { useEffect, useState } from 'react'
import { Api } from '../../../DAL/Api'

export interface DataListProps { 
    id: string
    options: string[]
}

const DataList: React.FC<DataListProps> = ({id, options}) => {
    console.log(options);
    return (
        <datalist id={id}>
            {options.map(option => <option key={option} value={option}/>)}
        </datalist>
    )
}

export default DataList
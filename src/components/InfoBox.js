import { Card, CardContent,Typography } from '@material-ui/core'
import React from 'react'
import NumericLabel from 'react-pretty-numbers'
import "../styles//InfoBox.css";


var option = {
    'justification': 'L',
    'commafy':true,
    'shortFormat':true,
    'shortFormatMinValue': 100000,
    'shortFormatPrecision': 2,
        };
function InfoBox({title,cases,isRed,total,active, ...props}) {
    return (
        <Card 
        onClick = {props.onClick}
        className={`infoBox  ${active && 'infoBox--selected'} ${active && isRed && 'infoBox--red'}`}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${isRed && 'infoBox__case--red'}`}>+<NumericLabel params={option} >{cases}</NumericLabel></h2>
                <Typography className="infoBox__total" color="textSecondary"><NumericLabel>{total}</NumericLabel> Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'
import '../styles/LineGraph.css'
const options = {
    scales: {
        xAxes: [
        {
            type:"time",
            time: {
                format:"MM/DD/YY",
                tooltipFormat: "ll",
            
            },
        },
        ],
        yAxes: [
        {
            gridLines: {
                display: false,
            },
            ticks: {
                callback: function (value,index,values) {
                    return numeral(value).format("0a");
                }
            },
        },
        ],
    },
    legend: {
        display: false,
    },

    elements: {
        point: {
            radius:0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode:'index',
        intersect : false,
        callbacks: {
            label: function (tooltipItem,data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
};

    const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
        console.log(date)
        console.log(data[casesType][date]);
        console.log(lastDataPoint)
        if (lastDataPoint !== undefined) {
        const newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
    };

function LineGraph({ casesType }) {
    const [data,setData] = useState({});
    //ENDpoint https://disease.sh/v3/covid-19/historical/all?lastdays=30 

    

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=15")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                let chartData = buildChartData(data,casesType);
                console.log(chartData)
                setData(chartData);
            });
        }
        fetchData();


    },[casesType])

    
    return (
        <div class="graph__div">
            {data?.length >0 &&(
                <Line data= {{
                datasets: [
                    {
                    data: data,
                    backgroundColor: `${casesType=== "recovered" ? "rgba(125,215,29,0.5)":"rgba(204, 16, 52,0.5)"  }`,
                    fill: true,
                    borderColor: `${casesType=== "recovered" ? "rgba(125,215,29,1)":"rgba(204, 16, 52,1)"  }`,
                    },
                ]
            }} 
                options = {options}
            />
            )}
        </div>
    )
}

export default LineGraph

import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import {Card} from'react-bootstrap'
import { ResponsiveContainer,BarChart, Bar, XAxis, YAxis,Tooltip,Cell } from "recharts";
const DataGraph = ()=>{
    const country_population = useSelector((state) => state.allCountries.country_population)
    if(country_population && country_population.length === 0)
        return null;
    return (
        <Card className="mt-4 mb-4">
            <Card.Body>
                <Card.Title>Population Graph</Card.Title>
                <ResponsiveContainer  width="100%" height={400} >
                    <BarChart margin={{top: 5, right: 5, left: 40, bottom: 5}} data={country_population}>
                        <XAxis dataKey="name"/>
                        <YAxis dataKey="population"/>
                        <Tooltip />
                        <Bar dataKey="population" fill="#8884d8">
                            {
                                country_population.map((entry) => {
                                    return <Cell key={entry.name} fill={'#'+(Math.random()*0xFFFFFF<<0).toString(16)} />;
                                })
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </Card.Body>
        </Card>
    )
}
export default DataGraph;
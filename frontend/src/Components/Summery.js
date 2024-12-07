import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Utlis.js/UserContext';
import * as d3 from 'd3';

function Summery() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  useEffect(() => {
    if(user){
      const url = "/api/charts/bar-chart"

      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user
        }
      }).then(resp=>{
        if(resp.status === 200){
          resp.json().then(data=>{
            setData(data);
          })
        } else {
          logout();
        }
      })
    }
  }, [user, logout]);

  const margin = { top: 20, right: 30, bottom: 60, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3.select(svgRef.current)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Set up scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.industry))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.benefit)])
    .nice()
    .range([height, 0]);

  // Add bars
  svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.industry))
    .attr('y', d => y(d.benefit))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.benefit))
    .attr('fill', '#4caf50');

  // Add x-axis
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('font-size', '12px')
    .style('text-anchor', 'end') // Align text to the end of the label
    .attr('dx', '-0.5em') // Adjust horizontal position
    .attr('dy', '0.25em') // Adjust vertical position
    .attr('transform', 'rotate(-45)'); // Rotate labels 45 degrees

  // Add y-axis
  svg.append('g')
    .call(d3.axisLeft(y))
    .selectAll('text')
    .style('font-size', '12px');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Generative AI in Industries</h1>
      
      {/* Chart container */}
      <div className="flex justify-center mb-12">
        <svg ref={svgRef}></svg>
      </div>

      {/* Description section */}
      <div className="text-lg text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Chart Explanation</h2>
        <p className="mb-4">This chart illustrates the benefits of Generative AI adoption across various industries. The industries with the highest adoption rates include Education and Scientific Research, while fields like Development and Extended Reality have shown relatively lower benefits.</p>
        
        <p className="mb-4">The chart compares industries like Healthcare, Design, Personalized Assistance, and more, showcasing their respective benefit scores, which range from 6 to 10.</p>

        <p><strong>Source:</strong> Qualcomm (or other relevant data source)</p>
      </div>
    </div>
  );
}

export default Summery;
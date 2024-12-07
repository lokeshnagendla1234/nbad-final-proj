import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Utlis.js/UserContext';
import * as d3 from 'd3';

function Report() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const svgRef = useRef();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
   
    if(user){
      const url = "/api/charts/pie-chart"

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
          logout()
        }
      })
    }
  }, [user, logout]);

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select(svgRef.current)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.category))
    .range(d3.schemeSet3);

  const pie = d3.pie()
    .value(d => d.value);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const arcs = svg.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.category));

  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .text(d => d.data.category);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Generative AI Report</h1>
      
      {/* Chart container */}
      <div className="flex justify-center mb-12">
        <svg ref={svgRef}></svg>
      </div>

      {/* Description */}
      <div className="text-lg text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Potential Benefits of Generative AI</h2>
        <p className="mb-4">
          Generative AI shows potential for wide use in diverse industries. Educators and healthcare professionals 
          could use it to develop learning plans or patient rehabilitation training. Graphic and fashion designers 
          could generate new ideas for visual assets, logos, styles, and patterns. Personalized digital assistants 
          can develop individual diet and exercise plans, make travel reservations, and pay bills. Developers can 
          accelerate coding. Users will more easily engage in chat-like conversations with their devices. 
          Generative AI also shows near-limitless potential for scientific research and analysis.
        </p>
        <p className="mb-4">
          The potential benefits of Generative AI for on-device applications alone can further improve the user 
          experience through enhanced data privacy and security, reduced latency, increased performance, and 
          contextual personalization while lowering the required costs and energy consumption of cloud-based AI.
        </p>
        <p>
          Generative AI will continue to play a crucial role in shaping the future of technology by pushing the 
          boundaries of what machines can achieve. New advancements in Generative AI may spur laptop replacements 
          and a general move from the cloud to on-device processing. Personal AI assistants will make smartphones 
          even more indispensable. Creatives and marketers will see an increase in productivity levels, time-to-market, 
          and efficiency. Consumers will increasingly demand that their devices work together across open ecosystems, 
          and extended reality experiences will redefine our world.
        </p>
      </div>
    </div>
  );
}

export default Report;
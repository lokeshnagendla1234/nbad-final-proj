import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Utlis.js/UserContext';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center text-white" 
         style={{ backgroundImage: "url('https://path-to-your-background-image.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div> 

      {user ? (
        <div className="z-10 max-w-4xl text-center p-4 sm:p-6 bg-black bg-opacity-80 rounded-lg shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed mb-4">
            Generative AI: Unlocking New Possibilities
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-loose">
            Generative AI is revolutionizing industries by automating tasks, enhancing creativity, and improving productivity. From personalized recommendations to advanced simulations, the potential applications are limitless.
          </p>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
            Benefits Across Sectors
          </h2>
          <ul className="list-disc list-inside text-left text-gray-300 mb-6 space-y-2 text-sm sm:text-base md:text-lg">
            <li><span className="font-semibold">Healthcare:</span> Personalized treatment plans and advanced diagnostics.</li>
            <li><span className="font-semibold">Education:</span> Adaptive learning systems tailored to individual needs.</li>
            <li><span className="font-semibold">Entertainment:</span> AI-generated music, scripts, and immersive experiences.</li>
            <li><span className="font-semibold">Retail:</span> Enhanced customer experiences through AI-driven insights.</li>
          </ul>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
            What’s Next?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-loose">
            The future of generative AI will see greater integration into our daily lives. Expect smarter devices, seamless workflows, and innovations that blur the lines between the physical and digital worlds.
          </p>

          <div>
            <a 
              href="https://www.qualcomm.com/news/onq/2024/02/the-rise-of-generative-ai-timeline-of-breakthrough-innovations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-base rounded shadow-lg transition-transform transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-300 z-10">Redirecting...</p>
      )}
    </div>
  );
}

export default Dashboard;
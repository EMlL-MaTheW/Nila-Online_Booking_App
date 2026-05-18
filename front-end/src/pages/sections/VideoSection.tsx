//Video section of the home page
import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section id="section-hero" className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-[#247336] via-emerald-600 to-teal-600 rounded-3xl overflow-hidden shadow-2xl relative">
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"
        />
        
        <div className="relative flex items-center justify-center py-32 px-8">
          <div className="text-center">
            {/* <svg 
              className="w-32 h-32 text-white mb-6 opacity-80 mx-auto" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg> */}
             <i className="fa-solid fa-play-circle text-white text-7xl mb- opacity-80"></i>
            <p className="text-white text-2xl font-semibold tracking-wide">
              Hero Video
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
